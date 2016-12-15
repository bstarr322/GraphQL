import BaseService from './baseService.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains service calls 
 * to goals microservice for goal object.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

	constructor(authToken) {
		super(authToken);
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

	getGoalsByUserId(businessId, userId, page, size) {
		var route;
		if (page == null || size == null) {
			route = this.goals + businessId + '/user/' + userId;
		} else {
			route = this.goals + businessId + '/user/' + userId + '?page=' + page + '&size=' + size;
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
		var requestBody = {
		    name: input.goal.name, 
		    goalType: input.goal.goalType,
		    startDate: input.goal.startDate,
			teams: input.goal.teams,
	  	}
	  	var nonCpdOrgAdminReqBody = {
			description: input.goal.description,
			businessId: input.goal.businessId,
		    isBusinessCritical: input.goal.isBusinessCritical,
		    isSequential: input.goal.isSequential,
			tasks: input.goal.tasks
	  	}
	  	var cpdOrgAdminReqBody = {
			industryId: input.goal.industryId,
			membershipId: input.goal.membershipId,
			pointsToComplete: input.goal.pointsToComplete
	  	}
	  	var routeGoalType;
  		switch(input.goal.goalType.id) {
  			case 1: 
  				routeGoalType = "Induction"; 
				Object.assign(requestBody,nonCpdOrgAdminReqBody);
  				break;
  			case 2:
  				routeGoalType = "CpdOrgAdmin"; 
  				Object.assign(requestBody, cpdOrgAdminReqBody);
  				break;
  			case 3:
  				routeGoalType = "PoliciesandProcedures"; 
				Object.assign(requestBody,nonCpdOrgAdminReqBody);
  				break;
  			case 4:
  				routeGoalType = "ProductUpdates"; 
				Object.assign(requestBody,nonCpdOrgAdminReqBody);
  				break;
  			case 5:
  				routeGoalType = "Regulatory"; 
				Object.assign(requestBody,nonCpdOrgAdminReqBody);
  				break;
  			case 6:
  				routeGoalType = "GeneralAdvisories"; 
				Object.assign(requestBody,nonCpdOrgAdminReqBody);
  				break;

  		}
  		var route = this.goal + routeGoalType;
		var transformFunc = function(result) { 
		    var root = {};
			root["data"] = result;
		    return root;
  		}; 
	  	return super.httpToGoalsApi(HttpMethodEnum.POST.name,route,transformFunc,requestBody);
	}
	
	deleteGoal(input) {
	  	var route = this.goal + input.goalId
	  	return super.httpToGoalsApi(HttpMethodEnum.DELETE.name,route);
	}
};