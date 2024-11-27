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
  Get200Response,
} from '../models/index';
import {
    Get200ResponseFromJSON,
    Get200ResponseToJSON,
} from '../models/index';

/**
 * 
 */
export class RootApi extends runtime.BaseAPI {

    /**
     * Returns a welcome message
     * Welcome endpoint
     */
    async rootGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Get200Response>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => Get200ResponseFromJSON(jsonValue));
    }

    /**
     * Returns a welcome message
     * Welcome endpoint
     */
    async rootGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Get200Response> {
        const response = await this.rootGetRaw(initOverrides);
        return await response.value();
    }

}
