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
import type { AuthLoginPost200ResponseUser } from './AuthLoginPost200ResponseUser';
import {
    AuthLoginPost200ResponseUserFromJSON,
    AuthLoginPost200ResponseUserFromJSONTyped,
    AuthLoginPost200ResponseUserToJSON,
    AuthLoginPost200ResponseUserToJSONTyped,
} from './AuthLoginPost200ResponseUser';

/**
 * 
 * @export
 * @interface AuthLoginPost200Response
 */
export interface AuthLoginPost200Response {
    /**
     * 
     * @type {string}
     * @memberof AuthLoginPost200Response
     */
    token: string;
    /**
     * 
     * @type {AuthLoginPost200ResponseUser}
     * @memberof AuthLoginPost200Response
     */
    user: AuthLoginPost200ResponseUser;
}

/**
 * Check if a given object implements the AuthLoginPost200Response interface.
 */
export function instanceOfAuthLoginPost200Response(value: object): value is AuthLoginPost200Response {
    if (!('token' in value) || value['token'] === undefined) return false;
    if (!('user' in value) || value['user'] === undefined) return false;
    return true;
}

export function AuthLoginPost200ResponseFromJSON(json: any): AuthLoginPost200Response {
    return AuthLoginPost200ResponseFromJSONTyped(json, false);
}

export function AuthLoginPost200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthLoginPost200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'token': json['token'],
        'user': AuthLoginPost200ResponseUserFromJSON(json['user']),
    };
}

export function AuthLoginPost200ResponseToJSON(json: any): AuthLoginPost200Response {
    return AuthLoginPost200ResponseToJSONTyped(json, false);
}

export function AuthLoginPost200ResponseToJSONTyped(value?: AuthLoginPost200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'token': value['token'],
        'user': AuthLoginPost200ResponseUserToJSON(value['user']),
    };
}

