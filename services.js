const util = require('./util.js');
const config = require('./config.js');

// Multiple services are defined in this file. This might be refactored into separate files in the future.
const Goals = function() {};

Goals.prototype.getViewer = function(viewerId) {
  return util.httpGet(config.JSON_HOST, config.JSON_PORT, '/users/'+viewerId, function(result) { return result; });
}

//Goals
Goals.prototype.getGoals = function() {
  return util.httpGet(config.GOALS_HOST, config.GOALS_PORT, '/goals', function(result) { return result.map(function(elem) {return elem; }) });
}

Goals.prototype.getGoal = function(goalId) {
  return util.httpGet(config.GOALS_HOST, config.GOALS_PORT, '/goal/' + goalId, function(result) { return result; });
}

// Goals.prototype.createGoal = function(goal) {
  // console.log(goal);
  // return util.httpPost(config.GOALS_HOST, config.GOALS_PORT, '/goal', function(result) { result.name = result.title; return result; }, {userId: 1, id: 2, title: goal.name, body: goal.name});
// }

//GoalTypes
Goals.prototype.getGoalTypes = function() {
  return util.httpGet(config.GOALS_HOST, config.GOALS_PORT, '/reference/goalTypes',function(result) { return result.map(function(elem) { return elem; }) });
}

Goals.prototype.getGoalType = function(goalTypeId) {
  return util.httpGet(config.GOALS_HOST, config.GOALS_PORT, '/reference/goalType/' + goalTypeId, function(result) { return result; });
}

//TaskTypes
Goals.prototype.getTaskTypes = function() {
  return util.httpGet(config.GOALS_HOST, config.GOALS_PORT, '/reference/taskTypes', function(result) { return result.map(function(elem) { return elem; }) });
}

Goals.prototype.getTaskType = function(taskTypeId) {
  return util.httpGet(config.GOALS_HOST, config.GOALS_PORT, '/reference/taskType/' + taskTypeId, function(result) { return result; });
}


exports.Goals = Goals;
