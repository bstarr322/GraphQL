import BaseService from './baseService.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains service calls 
 * to goals microservice for goal object.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

	  constructor(authHeader) {
	    super(authHeader);
		this.goals = '/goals/';
		this.goal = '/goal/';
	}

	getGoals(businessId, page, size) { 
		var route;
		if (page == null || size == null) {
			route = this.goals + businessId;
		} else {
			route = this.goals + businessId + '?page=' + page + '&size=' + size;
		}
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getGoal(goalId) {
		var route = this.goal + goalId;
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getGoalUsers(goalId) {
		var route = this.goal + goalId + "/users";
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getGoalUser(goalId,userId) {
		var route = this.goal + goalId + "/user/" + userId;
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	createGoal(input) {
		var route = this.goal + input.goalType;
		var transformFunc = function(result) { 
		    var root = {};
			root["data"] = result;
		    return root;
  		}; 
		var requestBody = {
		    name: input.goal.name, 
		    goalType: input.goal.goalType,
		    startDate: input.goal.startDate,
			teams: input.goal.teams,
	  	}
  		switch(input.goalType) {
  			case "Induction": 
  				Object.assign(requestBody, {
  					description: input.goal.description,
					businessId: input.goal.businessId,
				    isBusinessCritical: input.goal.isBusinessCritical,
				    isSequential: input.goal.isSequential,
					tasks: input.goal.tasks
  				});
  				break;
  			case "CpdOrgAdmin":
  				Object.assign(requestBody, {
					businessId: input.goal.businessId,
					industryId: input.goal.industryId,
					membershipId: input.goal.membershipId
  				});
  				break;
  			case "Cpd":
  				Object.assign(requestBody, {
					industryId: input.goal.industryId,
					membershipId: input.goal.membershipId,
					pointsToComplete: input.goal.pointsToComplete
  				});
  				break;
  		}
	  	return super.httpToGoalsApi(HttpMethodEnum.POST.name,route,transformFunc,requestBody);
	}
	
	deleteGoal(input) {
	  	var route = this.goal + input.goalId
	  	return super.httpToGoalsApi(HttpMethodEnum.DELETE.name,route);
	}
};