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


function httpGetToLegacyApi = function(route) {
  httpGet(config.LOCALHOST, config.CPDONE_PORT, route, function(result) { 
    return result;
  });
}

function httpGetToGoalsApi = function(route) {
  httpGet(config.LOCALHOST, config.GOALS_PORT, route, function(result) { 
    return result;
  });
}

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

/*
  business service -> refactor to another file
*/
businessServices.prototype.getGoalAssignableBusinesses = function() {
  var route = '/api/v1/businesses/goalassignable';
  return httpGetToLegacyApi(route);
}

businessServices.prototype.getScopedBusinessIndustrySummariesByBusiness = function(businessId) {
  var route = '/api/v1/businesses/' + businessId + '/industries';
  return httpGetToLegacyApi(route);
}

businessServices.prototype.getIndustryMembershipsByBusiness = function(businessId, industryId) {
  var route = '/api/v1/businesses/' + businessId + '/industries/' + industryId;
  return httpGetToLegacyApi(route);
}

businessServices.prototype.getUserIdsByBusinessAndTeam = function(businessId, teamId) {
  var route = '/api/v1/businesses/' + businessId + '/teams/' + teamId + '/users';
  return httpGetToLegacyApi(route);
}

businessServices.prototype.getTeamsInTreeFormByBusiness = function(businessId) {
  var route = '/api/v1/businesses/' + businessId + '/teams/tree';
  return httpGetToLegacyApi(route);
}

businessServices.prototype.getCollectionsInTreeFormByBusiness = function(businessId) {
  var route = '/api/v1/businesses/' + businessId + '/collections/tree';
  return httpGetToLegacyApi(route);
}

businessServices.prototype.getContentsByBusiness = function(businessId) {
  var route = '/api/v1/businesses/' + businessId + '/contents';
  return httpGetToLegacyApi(route);
}