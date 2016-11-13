
/**
 * This module is for creating http request to different api of the platform
 */

import http from 'http';
import config from '../../config.js';
import jsonUtility from './jsonUtility.js';
import createHttpRequestOption from './httpRequestOption.js'
import {CpdoneApiEnum} from '../enums/enums.js';

/**
 * Calls an http request to 'http://jsonplaceholder.typicode.com'
 * @param {string}   httpMethod 		- The http method.
 * @param {string}   route 				- The request url route.
 * @param {list[object]}[headers] 		- Service request header to add.
 * @param {function} [transformFunc] 	- An optional function that transforms the http response body.
 * @param {object}   [requestBody] 		- An optional object where url response is shaped into.
 */
export function httpToJsonPlaceholderApi(httpMethod, route, headers, transformFunc, requestBody) {
    var options = createHttpRequestOption(CpdoneApiEnum.VIEWER, httpMethod, route, headers);
  	return callHttp(options, transformFunc, requestBody);
}

/**
 * Calls an http request for cpdone web service api.
 * @param {string}   	httpMethod 		- The http method.
 * @param {string}   	route 			- The request url route.
 * @param {function} 	[transformFunc] - An optional function that transforms the http response body.
 * @param {list[object]}[headers] 		- Service request header to add.
 * @param {object}   	[requestBody] 	- An optional object where url response is shaped into.
 */
export function httpToLegacyApi(httpMethod, route, headers, transformFunc, requestBody) {
    var options = createHttpRequestOption(CpdoneApiEnum.LEGACY, httpMethod, route, headers);
  	return callHttp(options, transformFunc, requestBody);
}

/**
 * Calls an http request to goals microservice api.
 * @param {string}   	httpMethod 		- The http method.
 * @param {string}   	route 			- The request url route.
 * @param {function} 	[transformFunc] - An optional function that transforms the http response body.
 * @param {list[object]}[headers] 		- Service request header to add.
 * @param {object}   	[requestBody] 	- An optional object where url response is shaped into.
 */
export function httpToGoalsApi(httpMethod, route, headers, transformFunc, requestBody) {
    var options = createHttpRequestOption(CpdoneApiEnum.GOALS, httpMethod, route, headers);
  	return callHttp(options, transformFunc, requestBody);
}

/**
 * Fetches a data from the request options parameter asynchronously.
 * @param  {object}   options 			- A httpRequestOptions object i.e. url, httpmethod, headers.
 * @param  {function} [transformFunc] 	- An optional function that transforms the http response body.
 * @param  {object}   [requestBody] 	- An optional object where url response is shaped into.
 * @return {object}   A json object as response from a performed http request.
 */
function callHttp(options, transformFunc, requestBody) {
	return new Promise(function(resolve, reject) {
		var callback = function(response) {
			var data = '';
			response
				.on('data', function (chunk) {
					var str = "" + chunk;
					data += str.replace("\\", "\\\\");
				})
				.on('end', function () {
					var jsonData = jsonUtility.tryParse(data);
					if (transformFunc)  {
						jsonData = transformFunc(jsonData);
					} 
					resolve(jsonData);
				});
		}
		var request = http.request(options, callback);
		if (requestBody) {
		  	request.write(JSON.stringify(requestBody));
		}
		request.end();
	});
}
