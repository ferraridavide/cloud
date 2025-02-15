import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { UserService } from "../services/userService";
import { GitHubService } from "../services/githubService";
import { JWTPayload } from "../plugins/auth";
import { getPrisma } from "../data/prisma";

// Schema for login request
const LoginRequestSchema = Type.Object({
  userId: Type.String(),
  password: Type.String(),
});

// Schema for login response
const LoginResponseSchema = Type.Object({
  token: Type.String(),
  user: Type.Object({
    userId: Type.String(),
    name: Type.String(),
    profilePictureUrl: Type.Union([Type.String(), Type.Null()]),
  }),
});

// Schema for error response
const ErrorResponseSchema = Type.Object({
  error: Type.String(),
});

// Schema for sign-up request
const SignUpRequestSchema = Type.Object({
  userId: Type.String(),
  password: Type.String(),
  name: Type.String(),
});

// Schema for GitHub callback request
const GitHubCallbackRequestSchema = Type.Object({
  code: Type.String(),
});

// Type definitions for request and response schemas
type LoginRequest = Static<typeof LoginRequestSchema>;
type LoginResponse = Static<typeof LoginResponseSchema>;
type ErrorResponse = Static<typeof ErrorResponseSchema>;
type SignUpRequest = Static<typeof SignUpRequestSchema>;
type GitHubCallbackRequest = Static<typeof GitHubCallbackRequestSchema>;

export default async function authRoutes(app: FastifyInstance) {
  // Login endpoint
  app.post<{ Body: LoginRequest; Reply: LoginResponse | ErrorResponse }>(
    "/login",
    {
      schema: {
        description: "User login",
        tags: ["Auth"],
        summary: "Login endpoint",
        body: LoginRequestSchema,
        response: {
          200: LoginResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { userId, password } = request.body;
      try {
        const { jwt, user } = await UserService.login(userId, password, app);
        return {
          token: jwt,
          user: {
            userId: user.userId,
            name: user.name,
            profilePictureUrl: user.profilePictureUrl,
          },
        };
      } catch {
        reply.status(500).send({ error: "Error logging in (username or password wrong)" });
      }
    },
  );

  // Sign-up endpoint
  app.post<{ Body: SignUpRequest; Reply: ErrorResponse }>(
    "/signup",
    {
      schema: {
        description: "User sign up",
        tags: ["Auth"],
        summary: "Sign up endpoint",
        body: SignUpRequestSchema,
        response: {
          200: {},
          500: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { userId, password, name } = request.body;
      try {
        await UserService.signUp(name, userId, password);
        reply.status(200).send();
      } catch (error) {
        reply.status(500).send({ error: JSON.stringify(error) });
      }
    },
  );

  // Protected endpoint requiring JWT
  app.get(
    "/protected",
    {
      onRequest: [app.authenticate],
      schema: {
        description: "Protected endpoint",
        tags: ["Auth"],
        summary: "Protected endpoint requiring JWT",
        response: {
          200: Type.Object({
            message: Type.String(),
          }),
          401: ErrorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
    },
    async (request) => {
      // The user is authenticated at this point
      const user = request.user; // Contains the decoded JWT payload
      return { message: `Hello ${JSON.stringify(user)}!` };
    },
  );

  // GitHub authentication initiation endpoint
  app.get(
    "/github",
    {
      schema: {
        description: "Initiate authentication with GitHub",
        tags: ["Auth"],
        summary: "GitHub authentication",
        response: {
          302: Type.Object({}), // Redirect response
          500: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        reply.redirect(GitHubService.authenticateWithGitHub());
      } catch (error) {
        reply.status(500).send({ error: "Failed to initiate GitHub authentication" });
      }
    },
  );

  // GitHub OAuth callback endpoint
  app.get<{ Querystring: GitHubCallbackRequest; Reply: LoginResponse | any }>(
    "/github/callback",
    {
      schema: {
        description: "GitHub OAuth callback endpoint",
        tags: ["Auth"],
        summary: "Process GitHub authentication callback",
        querystring: GitHubCallbackRequestSchema,
        response: {
          302: LoginResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const { code } = request.query;
        const userToken = await GitHubService.loginWithGitHubCode(code, app);
        reply
          .setCookie("githubJwtToken", userToken, {
            httpOnly: false,
            secure: false, // TODO: set true if HTTPS is enabled
            sameSite: "strict",
            path: "/",
            maxAge: 3600,
          })
          .redirect("https://sunomi.eu/login?useCookie=1");
      } catch (error) {
        reply.status(500).send(error);
      }
    },
  );

  // Login check endpoint
  app.get<{ Reply: LoginResponse | ErrorResponse }>(
    "/check",
    {
      schema: {
        description: "Login check",
        tags: ["Auth"],
        summary: "Login check",
        response: {
          200: LoginResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      var userId: string;

      if (request.headers.authorization) {
        const jwt = await request.jwtVerify<JWTPayload>();
        userId = jwt.id;
      } else if (request.cookies.githubJwtToken) {
        const jwt = app.jwt.decode<{ id: string }>(request.cookies.githubJwtToken);
        userId = jwt!.id;
        reply.clearCookie("githubJwtToken");
      } else {
        return reply.status(500).send({ error: "Unauthorized" });
      }

      const user = await getPrisma().users.findUnique({
        where: { userId: userId },
      });

      if (!user) {
        return reply.status(500).send({ error: "Unauthorized" });
      }

      reply.status(200).send({
        token: app.jwt.sign({ id: user.userId }),
        user: {
          userId: user.userId,
          name: user.name,
          profilePictureUrl: user.profilePictureUrl,
        },
      });
    },
  );
}