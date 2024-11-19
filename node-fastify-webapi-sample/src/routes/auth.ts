import { FastifyInstance } from "fastify";

import { Static, Type } from "@sinclair/typebox";
import { UserService } from "../services/userService";
import { UploadService } from "../services/uploadService";

const LoginRequestSchema = Type.Object({
  username: Type.String(),
  password: Type.String(),
});

const LoginResponseSchema = Type.Object({
  token: Type.String(),
});

const ErrorResponseSchema = Type.Object({
  error: Type.String(),
});

const SignUpRequestSchema = Type.Object({
  username: Type.String(),
  password: Type.String(),
  name: Type.String(),
});

const SignUpResponseSchema = Type.Object({
  id: Type.String(),
  username: Type.String(),
  password: Type.String(),
});

const UpdateUserParamsSchema = Type.Object({
  userId: Type.String(),
});

const UpdateUserBodySchema = Type.Object({
  name: Type.Optional(Type.String()),
  password: Type.Optional(Type.String()),
});

const UpdateUserResponseSchema = Type.Object({
  id: Type.String(),
  username: Type.String(),
  password: Type.String(),
});

type LoginRequest = Static<typeof LoginRequestSchema>;
type LoginResponse = Static<typeof LoginResponseSchema>;
type ErrorResponse = Static<typeof ErrorResponseSchema>;
type SignUpRequest = Static<typeof SignUpRequestSchema>;
type SignUpResponse = Static<typeof SignUpResponseSchema>;
type UpdateUserParams = Static<typeof UpdateUserParamsSchema>;
type UpdateUserBody = Static<typeof UpdateUserBodySchema>;
type UpdateUserResponse = Static<typeof UpdateUserResponseSchema>;

export default async function authRoutes(app: FastifyInstance) {



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
      const { username, password } = request.body;
      try {
        const { token } = await UserService.login(username, password, app);
        return { token };
      } catch (error) {
        reply.status(500).send({ error: JSON.stringify(error) });
      }
    },
  );

  app.put<{ Body: UpdateUserBody; Params: UpdateUserParams; Reply: UpdateUserResponse | Static<typeof ErrorResponseSchema>;
  }>(
    "/user/:userId",
    {
      onRequest: [app.authenticate],
      schema: {
        description: "Update user profile",
        tags: ["User"],
        summary: "Update user profile endpoint",
        body: UpdateUserBodySchema,
        params: UpdateUserParamsSchema,
        response: {
          200: UpdateUserResponseSchema,
          401: ErrorResponseSchema,
          404: ErrorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
    },
    async (request, reply) => {
      const { userId } = request.params;
      const { name, password } = request.body;
  
      try {
        const user = await UserService.updateUserProfile(userId, { name, password }, app);
        return { id: user.userId, username: user.name, password: user.password };
      } catch (error) {
        if (error instanceof Error && error.message === "User not found") {
          reply.status(404).send({ error: error.message });
        } else if (error instanceof Error && error.message === "Unauthorized") {
          reply.status(401).send({ error: error.message });
        } else {
          reply.status(500).send({ error: "Error updating user profile" });
        }
      }
    }
  );
  

  app.post<{ Body: SignUpRequest; Reply: SignUpResponse | ErrorResponse }>(
    "/signup",
    {
      schema: {
        description: "User sign up",
        tags: ["Auth"],
        summary: "Sign up endpoint",
        body: SignUpRequestSchema,
        response: {
          200: SignUpResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { username, password, name } = request.body;
      try {
        const user = await UserService.signUp(name, username, password, app);
        return { id: user.userId, username: user.userId, password: user.userId };
      } catch (error) {
        reply.status(500).send({ error: "Error creating user" });
      }
    },
  );

  app.get<{ Params: { userId: string }; Reply: SignUpResponse | ErrorResponse }>(
    "/user/:userId",
    {
      onRequest: [app.authenticate],
      schema: {
        description: "Get user by ID",
        tags: ["User"],
        summary: "Get user by ID endpoint",
        params: Type.Object({
          userId: Type.String(),
        }),
        response: {
          200: SignUpResponseSchema,
          404: ErrorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
    },
    async (request, reply) => {
      const { userId } = request.params;
      try {
        const user = await UserService.getUserById(userId);
        if (!user) {
          reply.status(404).send({ error: "User not found" });
        } else {
          return { id: user.userId, username: user.name, password: user.password };
        }
      } catch (error) {
        reply.status(500).send({ error: "Error retrieving user" });
      }
    }
  );


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
    async (request, reply) => {
      // The user is authenticated at this point
      const user = request.user; // Contains the decoded JWT payload
      return { message: `Hello ${JSON.stringify(user)}!` };
    },
  );

  app.delete<{ Params: { userId: string }; Reply: { success: boolean } | ErrorResponse }>(
    "/user/:userId",
    {
      onRequest: [app.authenticate],
      schema: {
        description: "Delete user by ID",
        tags: ["User"],
        summary: "Delete user endpoint",
        params: Type.Object({
          userId: Type.String(),
        }),
        response: {
          200: Type.Object({
            success: Type.Boolean(),
          }),
          401: ErrorResponseSchema,
          404: ErrorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
    },
    async (request, reply) => {
      const { userId } = request.params;
      try {
        await UserService.deleteUser(userId);
        return { success: true };
      } catch (error) {
        if (error instanceof Error && error.message === "User not found") {
          reply.status(404).send({ error: error.message });
        } else if (error instanceof Error && error.message === "Unauthorized") {
          reply.status(401).send({ error: error.message });
        } else {
          reply.status(500).send({ error: "Error deleting user" });
        }
      }
    }
  );


  const SSEDemoResponseSchema = Type.Object({
    message: Type.String(),
    timestamp: Type.Optional(Type.Number()),
  });
  type SSEDemoResponse = Static<typeof SSEDemoResponseSchema>;

  app.get("/sse", async (request, reply) => {
    // Set the headers to keep the connection open and indicate SSE
    reply.raw.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    });

    // Function to send data to the client
    const sendSSE = (data: SSEDemoResponse) => {
      reply.raw.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    // Send an initial message
    sendSSE({ message: "Connected to SSE!" });

    let messageCount = 0; // Initialize message counter
    const maxMessages = 3; // Close connection after 3 messages

    // Send messages at intervals
    const interval = setInterval(() => {
      messageCount += 1;
      sendSSE({
        message: `Message ${messageCount} from the server!`,
        timestamp: Date.now(),
      });

      // Check if we've sent the maximum number of messages
      if (messageCount >= maxMessages) {
        clearInterval(interval);
        reply.raw.end();
      }
    }, 2000);

    // Cleanup when the client disconnects
    request.raw.on("close", () => {
      clearInterval(interval);
      reply.raw.end();
    });

    return reply;
  });
}
