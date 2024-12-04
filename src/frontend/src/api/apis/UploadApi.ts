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
import type {
  AuthLoginPost500Response,
  UploadTranscodeVideoPost200Response,
  UploadTranscodeVideoPostRequest,
  UploadUploadUrlGet200Response,
} from '../models/index';
import {
    AuthLoginPost500ResponseFromJSON,
    AuthLoginPost500ResponseToJSON,
    UploadTranscodeVideoPost200ResponseFromJSON,
    UploadTranscodeVideoPost200ResponseToJSON,
    UploadTranscodeVideoPostRequestFromJSON,
    UploadTranscodeVideoPostRequestToJSON,
    UploadUploadUrlGet200ResponseFromJSON,
    UploadUploadUrlGet200ResponseToJSON,
} from '../models/index';

export interface UploadSseVideoIDGetRequest {
    videoID: string;
}

export interface UploadTranscodeVideoPostOperationRequest {
    uploadTranscodeVideoPostRequest: UploadTranscodeVideoPostRequest;
}

/**
 * 
 */
export class UploadApi extends runtime.BaseAPI {

    /**
     * Get transcoding percentage
     * Get transcoding percentage
     */
    async uploadSseVideoIDGetRaw(requestParameters: UploadSseVideoIDGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['videoID'] == null) {
            throw new runtime.RequiredError(
                'videoID',
                'Required parameter "videoID" was null or undefined when calling uploadSseVideoIDGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/upload/sse/{videoID}`.replace(`{${"videoID"}}`, encodeURIComponent(String(requestParameters['videoID']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Get transcoding percentage
     * Get transcoding percentage
     */
    async uploadSseVideoIDGet(requestParameters: UploadSseVideoIDGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.uploadSseVideoIDGetRaw(requestParameters, initOverrides);
    }

    /**
     * Transcode a video
     * Transcode video
     */
    async uploadTranscodeVideoPostRaw(requestParameters: UploadTranscodeVideoPostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UploadTranscodeVideoPost200Response>> {
        if (requestParameters['uploadTranscodeVideoPostRequest'] == null) {
            throw new runtime.RequiredError(
                'uploadTranscodeVideoPostRequest',
                'Required parameter "uploadTranscodeVideoPostRequest" was null or undefined when calling uploadTranscodeVideoPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/upload/transcode-video`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UploadTranscodeVideoPostRequestToJSON(requestParameters['uploadTranscodeVideoPostRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UploadTranscodeVideoPost200ResponseFromJSON(jsonValue));
    }

    /**
     * Transcode a video
     * Transcode video
     */
    async uploadTranscodeVideoPost(requestParameters: UploadTranscodeVideoPostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UploadTranscodeVideoPost200Response> {
        const response = await this.uploadTranscodeVideoPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get a pre-signed URL for video uploads
     * Get pre-signed URL
     */
    async uploadUploadUrlGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UploadUploadUrlGet200Response>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/upload/upload-url`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UploadUploadUrlGet200ResponseFromJSON(jsonValue));
    }

    /**
     * Get a pre-signed URL for video uploads
     * Get pre-signed URL
     */
    async uploadUploadUrlGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UploadUploadUrlGet200Response> {
        const response = await this.uploadUploadUrlGetRaw(initOverrides);
        return await response.value();
    }

}
