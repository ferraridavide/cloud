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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface UploadUploadUrlPost200Response
 */
export interface UploadUploadUrlPost200Response {
    /**
     * 
     * @type {string}
     * @memberof UploadUploadUrlPost200Response
     */
    url: string;
    /**
     * 
     * @type {string}
     * @memberof UploadUploadUrlPost200Response
     */
    videoId: string;
}

/**
 * Check if a given object implements the UploadUploadUrlPost200Response interface.
 */
export function instanceOfUploadUploadUrlPost200Response(value: object): value is UploadUploadUrlPost200Response {
    if (!('url' in value) || value['url'] === undefined) return false;
    if (!('videoId' in value) || value['videoId'] === undefined) return false;
    return true;
}

export function UploadUploadUrlPost200ResponseFromJSON(json: any): UploadUploadUrlPost200Response {
    return UploadUploadUrlPost200ResponseFromJSONTyped(json, false);
}

export function UploadUploadUrlPost200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UploadUploadUrlPost200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'url': json['url'],
        'videoId': json['videoId'],
    };
}

export function UploadUploadUrlPost200ResponseToJSON(json: any): UploadUploadUrlPost200Response {
    return UploadUploadUrlPost200ResponseToJSONTyped(json, false);
}

export function UploadUploadUrlPost200ResponseToJSONTyped(value?: UploadUploadUrlPost200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'url': value['url'],
        'videoId': value['videoId'],
    };
}

