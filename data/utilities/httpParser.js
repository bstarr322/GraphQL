/**
 * Parses/extracts auth information from 
 * the http requests.
 * 
 * @param {dictionary[string]} request - http request object
 */

import config from '../../config.js';
import authHeader from '../utilities/authHeader.js'

export default function(request) {
	var headers = request.headers;
	if (config.IS_AUTH_ENABLED) {
		var token = headers["x-auth-token"];
		var business = headers["x-auth-business"];
		return new authHeader(token, business);
	}
	return null;
}
