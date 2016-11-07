import { httpToGoalsApi } from '../utilities/serviceHelper.js'

export const goalService = function() {};

goalService.prototype.getGoals = function(business) { 
	var route = '/goals/' + business;
	var transformFunc = function(result) { 
		return result.map( function(elem) {
			return elem; 
		})
	};
	return httpToGoalsApi('GET', route, transformFunc);
}

goalService.prototype.getGoal = function(goalId) {
	var route = '/goal/' + goalId;
	return httpToGoalsApi('GET', route);
}

goalService.prototype.createGoal = function(goal) {
	var transformFunc =  
		function(result) { 
		    var root = {};
			root["data"] = result;
		    return root;
  		}; 
  	var goalBody = goal["input"];
  	var requestBody = 
  	{
	    name: goalBody.name, 
	    description: goalBody.description,
	    goalType: goalBody.goalType,
		businessId: goalBody.businessId,
	    isBusinessCritical: goalBody.isBusinessCritical,
	    isSequential: goalBody.isSequential,
	    startDate: goalBody.startDate,
		tasks: goalBody.tasks,
		teams: goalBody.teams
  	}
  	return httpToGoalsApi('POST', route, transformFunc, requestBody);
}

goalService.prototype.updateGoal = function(goal) {
  return null; //httpPost(config.LOCALHOST, config.GOALS_PORT, '/goal', function(result) { result.name = result.title; return result; }, {userId: 1, id: 2, title: goal.name, body: goal.name});
}

goalService.prototype.deleteGoal = function(goalId) {
  return null; //httpPost(config.LOCALHOST, config.GOALS_PORT, '/goal', function(result) { result.name = result.title; return result; }, {userId: 1, id: 2, title: goal.name, body: goal.name});
}