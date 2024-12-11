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
 * @interface UploadUploadUrlPostRequest
 */
export interface UploadUploadUrlPostRequest {
    /**
     * 
     * @type {string}
     * @memberof UploadUploadUrlPostRequest
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof UploadUploadUrlPostRequest
     */
    description: string;
}

/**
 * Check if a given object implements the UploadUploadUrlPostRequest interface.
 */
export function instanceOfUploadUploadUrlPostRequest(value: object): value is UploadUploadUrlPostRequest {
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('description' in value) || value['description'] === undefined) return false;
    return true;
}

export function UploadUploadUrlPostRequestFromJSON(json: any): UploadUploadUrlPostRequest {
    return UploadUploadUrlPostRequestFromJSONTyped(json, false);
}

export function UploadUploadUrlPostRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UploadUploadUrlPostRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'title': json['title'],
        'description': json['description'],
    };
}

export function UploadUploadUrlPostRequestToJSON(json: any): UploadUploadUrlPostRequest {
    return UploadUploadUrlPostRequestToJSONTyped(json, false);
}

export function UploadUploadUrlPostRequestToJSONTyped(value?: UploadUploadUrlPostRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'title': value['title'],
        'description': value['description'],
    };
}

