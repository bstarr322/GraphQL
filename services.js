const util = require('./util.js');
const config = require('./config.js');

// Multiple services are defined in this file. This might be refactored into separate files in the future.
const Goals = function() {};

Goals.prototype.getGoals = function() {
  return util.httpGet(config.GOALS_HOST, '/posts', function(result) { return result.map(function(elem) { elem.name = elem.title; return elem; }) });
}

Goals.prototype.getGoal = function(id) {
  return util.httpGet(config.GOALS_HOST, '/posts/' + id, function(result) { result.name = result.title; return result; });
}

Goals.prototype.createGoal = function(goal) {
  console.log(goal);
  return util.httpPost(config.GOALS_HOST, '/posts/', function(result) { result.name = result.title; return result; }, {userId: 1, id: 2, title: goal.name, body: goal.name});
}

exports.Goals = Goals;
