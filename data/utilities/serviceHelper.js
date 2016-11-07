import config from '../config.js';

export function httpToJsonPlaceholderApi(httpMethod, route, transformFunc, reqBody) {
  	return callHttp(httpMethod, config.JSON_HOST, config.JSON_PORT, route, transformFunc, reqBody);
}

export function httpToLegacyApi(httpMethod, route, transformFunc, reqBody) {
  	return callHttp(httpMethod, config.HOST, config.CPDONE_PORT, route, transformFunc, reqBody);
}

export function httpToGoalsApi(httpMethod, route, transformFunc, reqBody) {
  	return callHttp(httpMethod, config.HOST, config.GOALS_PORT, route, transformFunc, reqBody);
}

function callHttp(method, host, port, path, transformFunc, reqBody) {

	if (!transformFunc) {
		transformFunc = function(result) { return result; }
	} 

    var options = {
		method: method,
		host: host,
		port: port,
		path: path,
		headers: {
		  'Content-Type':'application/json'  
		}
    };

	return new Promise(function(resolve, reject) {
		var callback = function(response) {
			var data = '';
			//another chunk of data has been recieved, so append it to `str`
			response
				.on('data', function (chunk) {
					var str = "" + chunk;
					data += str.replace("\\", "\\\\");
				})
				.on('end', function () {
					console.log("Data received -> " + data);
					var result = transformFunc(tryParse(data));
					resolve(result);
				});
		}
		var request = http.request(options, callback);
		if (requestBody) {
		  	request.write(JSON.stringify(requestBody));
		}
		request.end();
	});
}

function tryParse(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return str;
    }
}