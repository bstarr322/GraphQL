import {httpGet, httpPost} from './util.js';
import config from '../config.js';

/*
	this must be refactored if service pulls from multiple sources
*/

export const goalServices = function() {};
export const viewerServices = function() {};
export const goalTypeServices = function() {};
export const taskTypeServices = function() {};
export const teamServices = function() {};
export const contentServices = function() {};
export const collectionServices = function() {};
export const businessServices = function() {};


viewerServices.prototype.getViewer = function(viewerId) {
  return httpGet(config.JSON_HOST, config.JSON_PORT, '/users/'+viewerId, function(result) { return result; });
}

//Goals (from goals-service)
goalServices.prototype.getGoals = function(business) { 
  return httpGet(config.LOCALHOST, config.GOALS_PORT, '/goals/' + business, function(result) { return result.map(function(elem) {return elem; }) });
}

goalServices.prototype.getGoal = function(goalId) {
  return httpGet(config.LOCALHOST, config.GOALS_PORT, '/goal/' + goalId, function(result) { return result; });
}

goalServices.prototype.createGoal = function(goal) {
  var goalBody = goal["input"];
  return httpPost(config.LOCALHOST, config.GOALS_PORT, '/goal/' + goal.goalType, function(result) { 
    var root = {};
	root["data"] = result
    return root;
  } , {
    name: goalBody.name, 
    description: goalBody.description,
    goalType: goalBody.goalType,
	businessId: goalBody.businessId,
    isBusinessCritical: goalBody.isBusinessCritical,
    isSequential: goalBody.isSequential,
    startDate: goalBody.startDate,
	tasks: goalBody.tasks,
	teams: goalBody.teams
  });
}

goalServices.prototype.updateGoal = function(goal) {
  return null; //httpPost(config.LOCALHOST, config.GOALS_PORT, '/goal', function(result) { result.name = result.title; return result; }, {userId: 1, id: 2, title: goal.name, body: goal.name});
}

goalServices.prototype.deleteGoal = function(goalId) {
  return null; //httpPost(config.LOCALHOST, config.GOALS_PORT, '/goal', function(result) { result.name = result.title; return result; }, {userId: 1, id: 2, title: goal.name, body: goal.name});
}

//GoalTypes (from goals-service)
goalTypeServices.prototype.getGoalTypes = function() {
  return httpGet(config.LOCALHOST, config.GOALS_PORT, '/reference/goalTypes', function(result) { return result.map(function(elem) { return elem; }) });
}

goalTypeServices.prototype.getGoalType = function(goalTypeId) {
  return httpGet(config.LOCALHOST, config.GOALS_PORT, '/reference/goalType/' + goalTypeId, function(result) { return result; });
}

goalTypeServices.prototype.getGoalTypeByTag = function(tag) {
  return httpGet(config.LOCALHOST, config.GOALS_PORT, '/reference/goalTypeByTag/' + tag, function(result) { return result; });
}

//TaskTypes (from goals-service)
taskTypeServices.prototype.getTaskTypes = function() {
  return httpGet(config.LOCALHOST, config.GOALS_PORT, '/reference/taskTypes', function(result) { return result.map(function(elem) { return elem; }) });
}

taskTypeServices.prototype.getTaskType = function(taskTypeId) {
  return httpGet(config.LOCALHOST, config.GOALS_PORT, '/reference/taskType/' + taskTypeId, function(result) { return result; });
}

taskTypeServices.prototype.getTaskTypeByTag = function(tag) {
  return httpGet(config.LOCALHOST, config.GOALS_PORT, '/reference/taskTypeByTag/' + tag, function(result) { return result; });
}

//Teams (from cpdone.net)
teamServices.prototype.getTeams = function(businessId) {
  return httpGet(config.LOCALHOST, config.CPDONE_PORT, '/api/team/tree?businessId=' + businessId, function(result) { 
    var listResult = []; 
	listResult.push(result);
	return listResult;
  });
}

//Contents (from cpdone.net)
contentServices.prototype.getContents = function(businessId) {
  return httpGet(config.LOCALHOST, config.CPDONE_PORT, '/api/content/get?businessId=' + businessId, function(result) { return result;});
}

//Collection (from cpdone.net)
collectionServices.prototype.getCollections = function(businessId) {
  return httpGet(config.LOCALHOST, config.CPDONE_PORT, '/api/collection/get?businessId=' + businessId, function(result) { return result;});
}

//Business (from cpdone.net)
businessServices.prototype.getBusinesses = function() {
  return httpGet(config.LOCALHOST, config.CPDONE_PORT, '/api/user/GetGoalAssignableBusinesses', function(result) { 
	return result;
  });
}
