
/**
 * Utility for creating httpRequestOptions object 
 * patterned from http.request's option param.
 */

import config from '../../config.js';
import {CpdoneApiEnum} from '../enums/enums.js';
import extend from 'extend';

/**
 * Create httpRequestOption based on cpdoneapiEnum configuration
 * @param  {object} serviceType - An enum of type cpdoneApiEnum
 * @param  {string} method 		- Http method action
 * @param  {string} route       - Url route
 * @param  {object} headers     - Http request object
 * @return {object}  			- An instance of httpRequestOptions based on serviceType enum
 */
export default function(serviceType, method, route, headers) {
	switch (serviceType) {
		case CpdoneApiEnum.GOAL: 
			return new httpRequestOptions(method, config.HOST, config.GOAL_PORT, route, headers);
			break;
		case CpdoneApiEnum.LEGACY:
			return new httpRequestOptions(method, config.HOST, config.CPDONE_PORT, route, headers);
			break;
		case CpdoneApiEnum.VIEWER:
			return new httpRequestOptions(method, config.JSON_HOST, config.JSON_PORT, route, headers);
			break;
		default:
			return new httpRequestOptions(method, config.HOST, config.GOALS_PORT, route, headers);
	}
}

/**
 * An object used by http request options patterned from http.request's option param.
 * @param {string}   method 	- The http method name.
 * @param {string}   host 		- The url host part.
 * @param {string}   port 		- The url port part.
 * @param {string}   path 		- The url path part.
 * @param {string[]} [headers] 	- The optional request headers.
 */
function httpRequestOptions(method, host, port, path, headers) {
	this.method = method;
	this.host = host;
	this.port = port;
	this.path = path;
	this.headers = extend(headers, {'Content-Type':'application/json'});
}
