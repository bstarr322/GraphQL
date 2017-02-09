
/**
 * Utility for creating httpRequestOptions object 
 * patterned from http.request's option param.
 */

import config from '../../config.js';
import {CpdoneApiEnum} from '../enums/enums.js';
import ObjectUtility from './objectUtility.js';
import extend from 'extend';
import { HttpMethodEnum } from '../enums/enums.js';
import querystring from 'querystring';

/**
 * Create httpRequestOption based on cpdoneapiEnum configuration
 * @param  {object} serviceType - An enum of type cpdoneApiEnum
 * @param  {string} method 		- Http method action
 * @param  {string} route       - Url route
 * @param  {string} params      - Url params
 * @param  {authHeader} headers	- The optional request headers object.
 * @return {object}  			- An instance of httpRequestOptions based on serviceType enum
 */
export default function(serviceType, method, route, headers, params) {
	headers = buildHeaders(serviceType, method, route, headers, params);
	route = (params != null) ? buildRouteWithParams(route, params) : route;
	switch (serviceType) {
		case CpdoneApiEnum.GOAL: 
			return new httpRequestOptions(method, config.GOALS_HOST, config.GOALS_PORT, route, headers);
			break;
		case CpdoneApiEnum.LEGACY:
			return new httpRequestOptions(method, config.LEGACY_HOST, config.LEGACY_PORT, route, headers);
			break;
		case CpdoneApiEnum.VIEWER:
			return new httpRequestOptions(method, config.JSON_HOST, config.JSON_PORT, route, headers);
			break;
		case CpdoneApiEnum.FILES: 
			return new httpRequestOptions(method, config.FILES_HOST, config.FILES_PORT, route, headers);
			break;
		default:
			return new httpRequestOptions(method, config.LEGACY_HOST, config.LEGACY_PORT, route, headers);
	}
}

/**
 * Create headers 
 * @param  {object} serviceType - An enum of type cpdoneApiEnum
 * @param  {string} method 		- Http method action
 * @param  {string} route       - Url route
 * @param  {string} params      - Url params
 * @param  {authHeader} headers	- The optional request headers object.
 * @return {object}  			- headers
 */
function buildHeaders(serviceType, method, route, headers, params) {
	var defaultHeaders = HttpMethodEnum.POST.name == method ? {'Content-Type':'application/json'} : null;
	if (headers != null) headers = headers.toArrayObject(config.HEADER_AUTH_KEY_NAME, config.HEADER_BUSINESS_KEY_NAME);
	headers = extend(headers, defaultHeaders)
	return headers;
}

/**	
 * Create Route with params 
 * @param  {string}   route 	- Url route
 * @param  {object}   param 	- Url params
 * @return {string} 			- route with params
 */
function buildRouteWithParams(route, params) {
	// remove undefined fields props in params
	params = JSON.parse(JSON.stringify(params));
	// url query params
	params = querystring.stringify(params);	
	route = route + '?' + params;
	return route;
}

/**
 * An object used by http request options patterned from http.request's option param.
 * @param {string}   method 	- The http method name.
 * @param {string}   host 		- The url host part.
 * @param {string}   port 		- The url port part.
 * @param {string}   path 		- The url path part.
 * @param {authHeader} authHeader - The optional request headers object.
 */
function httpRequestOptions(method, host, port, path, authHeader) {
	this.method = method;
	this.host = host;
	this.port = port;
	this.path = path;
	this.headers = ObjectUtility.convert(authHeader);
}
