import { httpToGoalsApi } from '../utilities/serviceHelper.js'

export default new function() {

	this.getGoals = function(business) { 
		var route = '/goals/' + business;
		return httpToGoalsApi('GET', route);
	}

	this.getGoal = function(goalId) {
		var route = '/goal/' + goalId;
		return httpToGoalsApi('GET', route);
	}

	this.createGoal = function(goal) {
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

	this.updateGoal = function(goal) {
	  return null; //httpPost(config.LOCALHOST, config.GOALS_PORT, '/goal', function(result) { result.name = result.title; return result; }, {userId: 1, id: 2, title: goal.name, body: goal.name});
	}

	this.deleteGoal = function(goalId) {
	  return null; //httpPost(config.LOCALHOST, config.GOALS_PORT, '/goal', function(result) { result.name = result.title; return result; }, {userId: 1, id: 2, title: goal.name, body: goal.name});
	}
};