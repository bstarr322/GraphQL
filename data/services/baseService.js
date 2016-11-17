
import http from 'http';
import config from '../../config.js';
import jsonUtility from '../utilities/jsonUtility.js';
import createHttpRequestOption from '../utilities/httpRequestOption.js'
import {CpdoneApiEnum} from '../enums/enums.js';

export default class {

	constructor(authToken) {
		this.authToken = authToken;
	}

	/**
	 * Calls an http request to 'http://jsonplaceholder.typicode.com'
 	 * @param {string}   	httpMethod 		- The http method.
	 * @param {string}   	route 			- The request url route.
	 * @param {function} 	[transformFunc] - An optional function that transforms the http response body.
	 * @param {object}   	[requestBody] 	- An optional object where url response is shaped into.
	 */
	httpToJsonPlaceholderApi(httpMethod, route, transformFunc, requestBody) {
	    var options = createHttpRequestOption(CpdoneApiEnum.VIEWER, httpMethod, route, this.authToken);
	  	return this._callHttp(options, transformFunc, requestBody);
	}

	/**
	 * Calls an http request for cpdone web service api.
	 * @param {string}   	httpMethod 		- The http method.
	 * @param {string}   	route 			- The request url route.
	 * @param {function} 	[transformFunc] - An optional function that transforms the http response body.
	 * @param {object}   	[requestBody] 	- An optional object where url response is shaped into.
	 */
	httpToLegacyApi(httpMethod, route, headers, transformFunc, requestBody) {
	    var options = createHttpRequestOption(CpdoneApiEnum.LEGACY, httpMethod, route, this.authToken);
	  	return this._callHttp(options, transformFunc, requestBody);
	}


	/**
	 * Calls an http request to 'http://jsonplaceholder.typicode.com'
	 * @param {string}   	httpMethod 		- The http method.
	 * @param {string}   	route 			- The request url route.
	 * @param {function} 	[transformFunc] - An optional function that transforms the http response body.
	 * @param {object}   	[requestBody] 	- An optional object where url response is shaped into.
	 */
	httpToGoalsApi(httpMethod, route, transformFunc, requestBody) {
	    var options = createHttpRequestOption(CpdoneApiEnum.GOALS, httpMethod, route, this.authToken);
	  	return this._callHttp(options, transformFunc, requestBody);
	}

	/**
	 * Fetches a data from the request options parameter asynchronously.
	 * @param  {object}   options 			- A httpRequestOptions object i.e. url, httpmethod, headers.
	 * @param  {function} [transformFunc] 	- An optional function that transforms the http response body.
	 * @param  {object}   [requestBody] 	- An optional object where url response is shaped into.
	 * @return {object}   A json object as response from a performed http request.
	 */
	 _callHttp(options, transformFunc, requestBody) {
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

}