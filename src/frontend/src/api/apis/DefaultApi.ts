/* tslint:disable */
/* eslint-disable */
/**
 * Test swagger
 * Testing the Fastify swagger API
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';

export interface AuthApiVideosCommentVideoIdPostRequest {
    videoId: string;
}

export interface AuthApiVideosLikeVideoIdPostRequest {
    videoId: string;
}

export interface AuthApiVideosTitleTitleGetRequest {
    title: string;
}

export interface AuthApiVideosVideoIdGetRequest {
    videoId: string;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     */
    async authApiVideosCommentVideoIdPostRaw(requestParameters: AuthApiVideosCommentVideoIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['videoId'] == null) {
            throw new runtime.RequiredError(
                'videoId',
                'Required parameter "videoId" was null or undefined when calling authApiVideosCommentVideoIdPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/auth/api/videos/comment/{videoId}`.replace(`{${"videoId"}}`, encodeURIComponent(String(requestParameters['videoId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async authApiVideosCommentVideoIdPost(requestParameters: AuthApiVideosCommentVideoIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.authApiVideosCommentVideoIdPostRaw(requestParameters, initOverrides);
    }

    /**
     */
    async authApiVideosGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/auth/api/videos`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async authApiVideosGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.authApiVideosGetRaw(initOverrides);
    }

    /**
     */
    async authApiVideosLikeVideoIdPostRaw(requestParameters: AuthApiVideosLikeVideoIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['videoId'] == null) {
            throw new runtime.RequiredError(
                'videoId',
                'Required parameter "videoId" was null or undefined when calling authApiVideosLikeVideoIdPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/auth/api/videos/like/{videoId}`.replace(`{${"videoId"}}`, encodeURIComponent(String(requestParameters['videoId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async authApiVideosLikeVideoIdPost(requestParameters: AuthApiVideosLikeVideoIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.authApiVideosLikeVideoIdPostRaw(requestParameters, initOverrides);
    }

    /**
     */
    async authApiVideosTitleTitleGetRaw(requestParameters: AuthApiVideosTitleTitleGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['title'] == null) {
            throw new runtime.RequiredError(
                'title',
                'Required parameter "title" was null or undefined when calling authApiVideosTitleTitleGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/auth/api/videos/title/{title}`.replace(`{${"title"}}`, encodeURIComponent(String(requestParameters['title']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async authApiVideosTitleTitleGet(requestParameters: AuthApiVideosTitleTitleGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.authApiVideosTitleTitleGetRaw(requestParameters, initOverrides);
    }

    /**
     */
    async authApiVideosVideoIdGetRaw(requestParameters: AuthApiVideosVideoIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['videoId'] == null) {
            throw new runtime.RequiredError(
                'videoId',
                'Required parameter "videoId" was null or undefined when calling authApiVideosVideoIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/auth/api/videos/{videoId}`.replace(`{${"videoId"}}`, encodeURIComponent(String(requestParameters['videoId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async authApiVideosVideoIdGet(requestParameters: AuthApiVideosVideoIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.authApiVideosVideoIdGetRaw(requestParameters, initOverrides);
    }

}
