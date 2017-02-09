import http from 'http';
import config from '../../config.js';
import jsonUtility from '../utilities/jsonUtility.js';
import createHttpRequestOption from '../utilities/httpRequestOption.js'
import {CpdoneApiEnum} from '../enums/enums.js';
import authHeader from '../utilities/authHeader.js'

/**
 * HTTP-friendly error objects
 * https://www.npmjs.com/package/boom
 */
import Boom from 'boom';

export default class {

	constructor(authHeader) {
		this.authHeader = authHeader;
	}

	/**
	 * Calls an http request to 'http://jsonplaceholder.typicode.com'
 	 * @param {string}   	[httpMethod] 	- The http method.
	 * @param {string}   	[route] 		- The request url route.
	 * @param {function} 	[transformFunc] - An optional function that transforms the http response body.
	 * @param {object}   	[requestBody] 	- An optional object where url response is shaped into.
	 */
	httpToJsonPlaceholderApi(httpMethod, route, transformFunc, requestBody) {
	    var options = createHttpRequestOption(CpdoneApiEnum.VIEWER, httpMethod, route, this.authHeader);
	  	return this._callHttp(options, transformFunc, requestBody);
	}

	/**
	 * Calls an http request for cpdone web service api.
	 * @param {string}   	[httpMethod] 	- The http method.
	 * @param {string}   	[route] 		- The request url route.
	 * @param {string}   	[headers] 		- The request headers.
	 * @param {function} 	[transformFunc] - An optional function that transforms the http response body.
	 * @param {object}   	[requestBody] 	- An optional object where url response is shaped into.
	 */
	httpToLegacyApi(httpMethod, route, headers, transformFunc, requestBody) {
	    var options = createHttpRequestOption(CpdoneApiEnum.LEGACY, httpMethod, route, headers);
	  	return this._callHttp(options, transformFunc, requestBody, true);
	}

	/**
	 * Calls an http request to cpdone goals service 
	 * @param {string}   	[httpMethod] 	- The http method.
	 * @param {string}   	[route] 		- The request url route.
	 * @param {string}   	[params] 		- The request params.
	 * @param {string}   	[headers] 		- The request headers.
	 * @param {function} 	[transformFunc] - An optional function that transforms the http response body.
	 * @param {object}   	[requestBody] 	- An optional object where url response is shaped into.
	 */
	httpToGoalsApi(httpMethod, route, params, headers, transformFunc, requestBody) {
	    var options = createHttpRequestOption(CpdoneApiEnum.GOAL, httpMethod, route, headers, params);
	  	return this._callHttp(options, transformFunc, requestBody, true);
	}

	/**
	 * Call file service for upload or download of attachments
	 * @param {string}   	[httpMethod]	- The http method.
	 * @param {string}   	[route] 		- The request url route.
	 * @param {string}   	[params] 		- The request params.
	 * @param {string}   	[headers] 		- The request headers.
	 * @param {function} 	[transformFunc] - An optional function that transforms the http response body.
	 * @param {object}   	[requestBody] 	- An optional object where url response is shaped into.
	 */
	httpToFilesApi(httpMethod, route, transformFunc, requestBody) {
	    var options = createHttpRequestOption(CpdoneApiEnum.FILES, httpMethod, route, this.authHeader);
	  	return this._callHttp(options, transformFunc, requestBody, true);
	}

	/**
	 * Fetches a data from the request options parameter asynchronously.
	 * @param  {object}   [options] 		- A httpRequestOptions object i.e. url, httpmethod, headers.
	 * @param  {function} [transformFunc] 	- An optional function that transforms the http response body.
	 * @param  {object}   [requestBody] 	- An optional object where url response is shaped into.
	 * @param  {bool}     [logError] 		- An optional boolean which sets whether the promise will create an error record on output response.
	 * @return {object}   A json object as response from a performed http request.
	 */
	 _callHttp(options, transformFunc, requestBody, logError = false) {
	 	var that = this;
	 	//console.log(options);
		return new Promise((resolve, reject) => {	 		
			var request = http.request(options, that._createCallback(resolve, reject, transformFunc, logError));
			if (requestBody) request.write(JSON.stringify(requestBody));
			request.end();
	 	}).catch(error => {
	        return error;
     	})
	}

	/**
	 * Creates a callback function that processes the http response.
	 * @param  {[type]} [resolve]       - A promise resolve delagate.
	 * @param  {[type]} [reject]        - A promise reject delagate.
	 * @param  {[type]} [transformFunc] - An optional function that transforms the http response body.
	 * @param  {[type]} [logError]      - An optional boolean which sets whether the promise will create an error record on output response.
	 */
	_createCallback(resolve, reject, transformFunc, logError) {
		var that = this;
		return function(response) {
			var data = '';
			response
				.on('data', function (chunk) {
					var str = "" + chunk;
					data += str.replace("\\", "\\\\");
				})
				.on('end', function () {
					//console.log("data -> " + data);
					if (response.statusCode >= 400) {
						var error = that._createErrorMessage(response.statusCode,data);
						reject(Promise.reject(error));
					} else {
						var jsonData = that._formatData(response, data, transformFunc);
						resolve(Promise.resolve(jsonData));
					}
				});
		}
	}

	/**
	 * Formats data by trying to convert it to a json object
	 * @param  {object}   [response]      - A http response object
	 * @param  {boolean}  [data]     	  - A formatted data
	 * @param  {function} [transformFunc] - An optional function that transforms the http response body.
	 */
	_formatData(response, data, transformFunc) {
		// GraphQLList types throws errors when it returns no data 
		if (response.statusCode >= 400) {
			return [];
		} 
		var jsonData = jsonUtility.tryParse(data);
		if (transformFunc) {
			jsonData = transformFunc(jsonData);
		}
		return jsonData;
	}

	/**
	 * Creates an error message using Boom library 
	 * @param  {int} statusCode 	- The http status code
	 * @param  {string} message  	- The http status code
	 * @return {object}             - A string of boom object
	 */
	_createErrorMessage(statusCode, message) {
		return JSON.stringify(Boom.create(statusCode,message,message));
	}

}