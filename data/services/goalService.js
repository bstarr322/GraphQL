
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

	getGoals(businessId, page, size) { 
		var route
		if (page == null || size == null) {
			route = '/goals/' + businessId;
		} else {
			route = '/goals/' + businessId + '?page=' + page + '&size=' + size;
		}
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getGoal(goalId) {
		var route = '/goal/' + goalId;
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	createGoal(input,goalType) {
		console.log(goal);
		var route = '/goal/' + goalType;
		var transformFunc = function(result) { 
		    var root = {};
			root["data"] = result;
		    return root;
  		}; 
	  	var requestBody = {
		    name: input.name, 
		    description: input.description,
		    goalType: input.goalType,
			businessId: input.businessId,
		    isBusinessCritical: input.isBusinessCritical,
		    isSequential: input.isSequential,
		    startDate: input.startDate,
			tasks: input.tasks,
			teams: input.teams
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