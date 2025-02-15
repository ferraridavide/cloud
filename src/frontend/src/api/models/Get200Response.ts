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
 * @interface Get200Response
 */
export interface Get200Response {
    /**
     * 
     * @type {string}
     * @memberof Get200Response
     */
    message: string;
}

/**
 * Check if a given object implements the Get200Response interface.
 */
export function instanceOfGet200Response(value: object): value is Get200Response {
    if (!('message' in value) || value['message'] === undefined) return false;
    return true;
}

export function Get200ResponseFromJSON(json: any): Get200Response {
    return Get200ResponseFromJSONTyped(json, false);
}

export function Get200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): Get200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'message': json['message'],
    };
}

export function Get200ResponseToJSON(json: any): Get200Response {
    return Get200ResponseToJSONTyped(json, false);
}

export function Get200ResponseToJSONTyped(value?: Get200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'message': value['message'],
    };
}

