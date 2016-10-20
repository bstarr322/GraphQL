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

viewerServices.prototype.getViewer = function(viewerId) {
  return httpGet(config.JSON_HOST, config.JSON_PORT, '/users/'+viewerId,
	function(result) {
	  // console.log(typeof(result));
	  return result;
	}
  );
}

//Goals (from goals-service)
goalServices.prototype.getGoals = function(business) { 
  return httpGet(config.LOCALHOST, config.GOALS_PORT, '/goals/' + business, function(result) { return result.map(function(elem) {return elem; }) });
}

goalServices.prototype.getGoal = function(goalId) {
  return httpGet(config.LOCALHOST, config.GOALS_PORT, '/goal/' + goalId, function(result) { return result; });
}

goalServices.prototype.createGoal = function(goal) {
  return null; //httpPost(config.LOCALHOST, config.GOALS_PORT, '/goal', function(result) { result.name = result.title; return result; }, {userId: 1, id: 2, title: goal.name, body: goal.name});
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
  var g = httpGet(config.LOCALHOST, config.GOALS_PORT, '/reference/goalType/' + goalTypeId, function(result) { return result; });
  console.log(g);
  return g;
}

//TaskTypes (from goals-service)
taskTypeServices.prototype.getTaskTypes = function() {
  return httpGet(config.LOCALHOST, config.GOALS_PORT, '/reference/taskTypes', function(result) { return result.map(function(elem) { return elem; }) });
}

taskTypeServices.prototype.getTaskType = function(taskTypeId) {
  return httpGet(config.LOCALHOST, config.GOALS_PORT, '/reference/taskType/' + taskTypeId, function(result) { return result; });
}

//Teams (from cpdone.net)
teamServices.prototype.getTeams = function(businessId) {
  return httpGet(config.LOCALHOST, config.CPDONE_PORT, '/orgchart/GetOrgTreeDataByBusinessId?businessId=' + businessId, 
	function(result) {
	  // console.log(typeof(result));
	  return result;
	}
  );
}
teamServices.prototype.getTeamsTestData = function() {
  return httpGet(config.LOCALHOST, config.CPDONE_PORT, '/orgchart/TestData', 
	function(result) {
	  // console.log(typeof(result));
	  return result;
	}
  );
}


