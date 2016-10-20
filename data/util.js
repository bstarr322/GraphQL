import http from 'http';
import querystring from 'querystring';

export function httpGet(host, port, path, transformFunc) {
  return callHttp('GET', host, port, path, transformFunc);
}

export function httpPost(host, port, path, transformFunc) {
  return callHttp('POST', host, port, path, transformFunc);
}

function callHttp(method, host, port, path, transformFunc, reqBody) {
  return new Promise(function(resolve, reject) {
    var options = {
      host: host,
	  port: port,
      path: path
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
        var result = transformFunc(JSON.parse(data));
		resolve(result);
      });
    }
    const req = http.request(options, callback);
    if(reqBody) {
      req.write(querystring.stringify(reqBody));
    }
    req.end();
  });
}