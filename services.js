const http = require('http');
const querystring = require('querystring');

const config = require('./config.js');

// Multiple services are defined in this file. This might be refactored into separate files in the future.
const Goals = function() {};

Goals.prototype.getGoals = function() {
  return httpGet(config.GOALS_HOST, '/posts', function(result) { return result.map(function(elem) { elem.name = elem.title; return elem; }) });
}

Goals.prototype.getGoal = function(id) {
  return httpGet(config.GOALS_HOST, '/posts/' + id, function(result) { result.name = result.title; return result; });
}

Goals.prototype.createGoal = function(goal) {
  console.log(goal);
  return httpPost(config.GOALS_HOST, '/posts/', function(result) { result.name = result.title; return result; }, {userId: 1, id: 2, title: goal.name, body: goal.name});
}


// Internal helper methods.
function httpGet(host, path, transformFunc) {
  return callHttp('GET', host, path, transformFunc);
}

function httpPost(host, path, transformFunc) {
  return callHttp('POST', host, path, transformFunc);
}

function callHttp(method, host, path, transformFunc, reqBody) {
  return new Promise(function(resolve, reject) {
    var options = {
      host: host,
      path: path
    };

    callback = function(response) {
      var data = '';
      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function (chunk) {
        var str = "" + chunk;
        data += str.replace("\\", "\\\\");
      });

      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        console.log("Data received -> " + data);
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

exports.Goals = Goals;
