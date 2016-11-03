import http from 'http';
import querystring from 'querystring';

export function httpGet(host, port, path, transformFunc) {
  return callHttp('GET', host, port, path, transformFunc);
}

export function httpPost(host, port, path, transformFunc, reqBody) {
  return callHttp('POST', host, port, path, transformFunc, reqBody);
}

/*
 *	to optimize code for all methods
 */
function callHttp(method, host, port, path, transformFunc, reqBody) {
  return new Promise(function(resolve, reject) {
    var options = {
	  method: method,
      host: host,
	  port: port,
      path: path,
	  headers: {
		'Content-Type':'application/json'  
	  }
    };
    var callback = function(response) {
      var data = '';
      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function (chunk) {
        var str = "" + chunk;
        data += str.replace("\\", "\\\\");
      });

      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        console.log("Data Retrived-> " + data);
		var result = transformFunc(tryParse(data));
		resolve(result);
      });
    }
    const req = http.request(options, callback);
    if(reqBody) {
      req.write(JSON.stringify(reqBody));
    }
    req.end();
  });
}

function tryParse(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return str;
    }
}