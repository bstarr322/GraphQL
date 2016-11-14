
import BaseService from './BaseService.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains service calls 
 * to goals microservice for goal object.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

	constructor(authToken) {
		super(authToken);
	}

	getGoals(business) { 
		var route = '/goals/' + business;
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getGoal(goalId) {
		var route = '/goal/' + goalId;
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	createGoal(goal) {
		var route = '/goal/' + goal.goalType;
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
	  	return super.httpToGoalsApi(HttpMethodEnum.POST.name, route,transformFunc, requestBody);
	}

	updateGoal(goal) {
	  	return null; //httpPost(config.LOCALHOST, config.GOALS_PORT, '/goal', function(result) { result.name = result.title; return result; }, {userId: 1, id: 2, title: goal.name, body: goal.name});
	}

	deleteGoal(goalId) {
	  	return null; //httpPost(config.LOCALHOST, config.GOALS_PORT, '/goal', function(result) { result.name = result.title; return result; }, {userId: 1, id: 2, title: goal.name, body: goal.name});
	}

};