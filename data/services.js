import {httpGet, httpPost} from './util.js';
import config from '../config.js';

export const goalServices = function() {};
export const viewerServices = function() {};
export const goalTypeServices = function() {};
export const taskTypeServices = function() {};

viewerServices.prototype.getViewer = function(viewerId) {
  return httpGet(config.JSON_HOST, config.JSON_PORT, '/users/'+viewerId, function(result) { return result; });
}

//Goals
goalServices.prototype.getGoals = function(business) { 
  return httpGet(config.GOALS_HOST, config.GOALS_PORT, '/goals/' + business, function(result) { return result.map(function(elem) {return elem; }) });
}

goalServices.prototype.getGoal = function(goalId) {
  return httpGet(config.GOALS_HOST, config.GOALS_PORT, '/goal/' + goalId, function(result) { return result; });
}

// Goals.prototype.createGoal = function(goal) {
  // console.log(goal);
  // return util.httpPost(config.GOALS_HOST, config.GOALS_PORT, '/goal', function(result) { result.name = result.title; return result; }, {userId: 1, id: 2, title: goal.name, body: goal.name});
// }

//GoalTypes
goalTypeServices.prototype.getGoalTypes = function() {
  return httpGet(config.GOALS_HOST, config.GOALS_PORT, '/reference/goalTypes',function(result) { return result.map(function(elem) { return elem; }) });
}

goalTypeServices.prototype.getGoalType = function(goalTypeId) {
  return httpGet(config.GOALS_HOST, config.GOALS_PORT, '/reference/goalType/' + goalTypeId, function(result) { return result; });
}

//TaskTypes
taskTypeServices.prototype.getTaskTypes = function() {
  return httpGet(config.GOALS_HOST, config.GOALS_PORT, '/reference/taskTypes', function(result) { return result.map(function(elem) { return elem; }) });
}

taskTypeServices.prototype.getTaskType = function(taskTypeId) {
  return httpGet(config.GOALS_HOST, config.GOALS_PORT, '/reference/taskType/' + taskTypeId, function(result) { return result; });
}

