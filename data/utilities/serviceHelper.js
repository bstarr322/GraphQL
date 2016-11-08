
/**
 * This module is for creating http request to different api of the platform
 */

import http from 'http';
import config from '../../config.js';
import jsonUtility from './jsonUtility.js'

/**
 * Calls an http request to 'http://jsonplaceholder.typicode.com'
 * @param {string}   httpMethod - The http method.
 * @param {string}   route - The request url route.
 * @param {function} [transformFunc] - An optional function that transforms the http response body.
 * @param {object}   [requestBody] - An optional object where url response is shaped into.
 */
export function httpToJsonPlaceholderApi(httpMethod, route, transformFunc, requestBody) {
	var options = new httpRequestOptions(httpMethod, config.JSON_HOST, config.JSON_PORT, route);
  	return callHttp(options, transformFunc, requestBody);
}

/**
 * Calls an http request for cpdone web service api.
 * @param {string}   httpMethod - The http method.
 * @param {string}   route - The request url route.
 * @param {function} [transformFunc] - An optional function that transforms the http response body.
 * @param {object}   [requestBody] - An optional object where url response is shaped into.
 */
export function httpToLegacyApi(httpMethod, route, transformFunc, requestBody) {
	var options = new httpRequestOptions(httpMethod, config.HOST, config.CPDONE_PORT, route);
  	return callHttp(options, transformFunc, requestBody);
}

/**
 * Calls an http request to goals microservice api.
 * @param {string}   httpMethod - The http method.
 * @param {string}   route - The request url route.
 * @param {function} [transformFunc] - An optional function that transforms the http response body.
 * @param {object}   [requestBody] - An optional object where url response is shaped into.
 */
export function httpToGoalsApi(httpMethod, route, transformFunc, requestBody) {
	var options = new httpRequestOptions(httpMethod, config.HOST, config.CPDONE_PORT, route);
  	return callHttp(options, transformFunc, requestBody);
}

/**
 * An object used by http request options patterned from http.request's option param.
 * @param  {string}   method - The http method.
 * @param  {string}   host - The url host part.
 * @param  {string}   port - The url port part.
 * @param  {string}   path - The url path part.
 * @param  {string[]} [headers] - The optional request headers.
 */
function httpRequestOptions(method, host, port, path, headers) {
	this.method = method;
	this.host = host;
	this.port = port;
	this.path = path;
	this.headers = headers || {
		'Content-Type':'application/json'
	};
}

/**
 * Fetches a data from the request options parameter asynchronously.
 * @param  {object}   options - A httpRequestOptions object i.e. url, httpmethod, headers.
 * @param  {function} [transformFunc] - An optional function that transforms the http response body.
 * @param  {object}   [requestBody] - An optional object where url response is shaped into.
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
					console.log("Data received -> " + data);
					var jsonData = jsonUtility.tryParse(data);
					if (transformFunc)  {
						console.log('passed through here trandnfpaoijf.')
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
