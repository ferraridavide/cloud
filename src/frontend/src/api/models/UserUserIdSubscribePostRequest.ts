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
 * @interface UserUserIdSubscribePostRequest
 */
export interface UserUserIdSubscribePostRequest {
    /**
     * 
     * @type {boolean}
     * @memberof UserUserIdSubscribePostRequest
     */
    isUserSubscribed: boolean;
}

/**
 * Check if a given object implements the UserUserIdSubscribePostRequest interface.
 */
export function instanceOfUserUserIdSubscribePostRequest(value: object): value is UserUserIdSubscribePostRequest {
    if (!('isUserSubscribed' in value) || value['isUserSubscribed'] === undefined) return false;
    return true;
}

export function UserUserIdSubscribePostRequestFromJSON(json: any): UserUserIdSubscribePostRequest {
    return UserUserIdSubscribePostRequestFromJSONTyped(json, false);
}

export function UserUserIdSubscribePostRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserUserIdSubscribePostRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'isUserSubscribed': json['isUserSubscribed'],
    };
}

export function UserUserIdSubscribePostRequestToJSON(json: any): UserUserIdSubscribePostRequest {
    return UserUserIdSubscribePostRequestToJSONTyped(json, false);
}

export function UserUserIdSubscribePostRequestToJSONTyped(value?: UserUserIdSubscribePostRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'isUserSubscribed': value['isUserSubscribed'],
    };
}

