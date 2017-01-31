import BaseService from './baseService.js'
import teamService from './teamService.js'
import businessService from './businessService.js'
import referenceService from './referenceService.js'
import { HttpMethodEnum } from '../enums/enums.js'
import mapKeysDeep from "deep-rename-keys";

/**
 * @description This module contains service calls 
 * to goals microservice for goal object.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

	  constructor(authHeader) {
	    super(authHeader);
		this.goals = '/goals/';
		this.mygoals = '/mygoals';
		this.mygoal = '/mygoal/';
		this.goal = '/goal/';
		this.cpd = 'cpd/';
		this.user = '/user/';
		this.users = '/users';
	}

	getGoals(businessId, page, size, sortField, sortDirection, prioritizeBusinessCritical, goalType) { 
		var route = this.goals + businessId + '?page=' + page + '&size=' + size;

		// name || progress || goalType || deadline
		route = route + ((sortField) ? '&sortField=' + sortField : "");
		// ascending || descending
		route = route + ((sortDirection) ? '&sortDirection=' + sortDirection : "");
		// boolean
		route = route + ((prioritizeBusinessCritical) ? '&prioritizeBusinessCritical=' + prioritizeBusinessCritical : "");
		// goalType specific id 
		route = route + ((goalType) ? '&goalType=' + goalType : "");

		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getMyGoals(businessId, page, size, sortField, sortDirection, prioritizeBusinessCritical, goalType) {
		var route = this.mygoals + '?page=' + page + '&size=' + size;

		// name || progress || goalType || deadline
		route = route + ((sortField) ? '&sortField=' + sortField : "");
		// ascending || descending
		route = route + ((sortDirection) ? '&sortDirection=' + sortDirection : "");
		// boolean
		route = route + ((prioritizeBusinessCritical) ? '&prioritizeBusinessCritical=' + prioritizeBusinessCritical : "");
		// goalType specific id 
		route = route + ((goalType) ? '&goalType=' + goalType : "");

		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}
	getMyGoal(goalId) {
		var route = this.mygoal + goalId;
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}
	getGoal(goalId) {
		var route = this.goal + goalId;
		var transformFunc = result => {
			return new referenceService(super.authHeader).getBusiness(result.businessId).then(business => {
				result.business = business;
				delete result.businessId;
				return result;
			}).catch(error => {
		      console.log(error);
		      console.log("getGoal error -> " + error.message);
		      return error;
		    });
		};
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route, transformFunc);
	}

	getGoalUsers(goalId, page, size, sortField, sortDirection) {
		var route = route = this.goal + goalId + this.users + '?page=' + page + '&size=' + size;

		// username || anniversary || timeRemaining || pointsCompleted
		route = route + ((sortField) ? '&sortField=' + sortField : "");
		// ascending || descending
		route = route + ((sortDirection) ? '&sortDirection=' + sortDirection : "");


		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getGoalUser(goalId,userId) {
		var route = this.goal + goalId +  this.user + userId;
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	//Cpd Goal related 
	getCpdAvailableYears(goalId,userId) {
		var route = '/yearRange' + this.goal + goalId + this.user + userId;
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getCpdGoalSummary(goalId) {
		var route = this.goals + this.cpd + goalId;
		var transformFunc = (result) => {
			return new referenceService(super.authHeader).getMembership(result.membershipId).then(membership => {
				result.membership = membership;
				delete result.membershipId; 
				return result;
			}).catch(error => {
		      console.log(error);
		      console.log("getCpdGoalSummary error -> " + error.message);
		      return error;
		    });
		}
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route, transformFunc);
	}

	getCpdGoalUsers(goalId,page,size,month, sortField, sortDirection) {
		var route = route = this.goal + this.cpd + goalId + this.users + '?page=' + page + '&size=' + size + '&month=' + month;

		// username || anniversary || timeRemaining || pointsCompleted
		route = route + ((sortField) ? '&sortField=' + sortField : "");
		// ascending || descending
		route = route + ((sortDirection) ? '&sortDirection=' + sortDirection : "");

		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getCpdGoalUser(goalId,userId,year) {
		var route = this.goal + this.cpd + goalId +  this.user + userId + '/' + year;
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getGoalPercentages(teamIds, goalId, businessId){
		var promiseTeamsInReducedTreeForm = new businessService(super.authHeader).getTeamsInReducedTreeForm({teamIds: teamIds}, businessId);
		return promiseTeamsInReducedTreeForm.then(teamTree => {
			var requestBody = mapKeysDeep(teamTree, (key)=>{
				if (key === "Id") return "id";
				if (key === "ChildrenNodes") return "children";
				return key;
			});
			var route = "/goalPercentages/" + goalId;
			var transformFunc = result => result
			return super.httpToGoalsApi(HttpMethodEnum.POST.name, route, transformFunc, requestBody);
		});
	}

	createGoal(input) {
		var requestBody = {
		    name: input.body.name, 
		    businessId: input.body.businessId,
		    goalType: input.body.goalType,
			teams: input.body.teams,
			startDate: input.body.startDate,
			endDate: input.body.endDate
	  	}
	  	var nonCpdOrgAdminReqBody = {
			description: input.body.description,
		    isBusinessCritical: input.body.isBusinessCritical,
		    isSequential: input.body.isSequential,
			tasks: input.body.tasks
	  	}
	  	var cpdOrgAdminReqBody = {
			industryId: input.body.industryId,
			membershipId: input.body.membershipId
	  	}
	  	var cpdReqBody = {
			industryId: input.body.industryId,
			membershipId: input.body.membershipId,
			pointsToComplete: input.body.pointsToComplete
	  	}
	  	var routeGoalType;
  		switch(input.body.goalType.id) {
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
  				routeGoalType = "Training"; 
				Object.assign(requestBody,nonCpdOrgAdminReqBody);
  				break;
  			case 7:
  				routeGoalType = "Cpd"; 
				Object.assign(requestBody,cpdReqBody);
  				break;
  		}
  		var route = this.goal + routeGoalType;
		var transformFunc = function(result) { 
		    var root = {};
			if (typeof result === 'string' || result instanceof String){
				root["errorMessage"] = result;
			} else {
				root["goal"] = result;
			}
		    return root;
  		}; 
	  	return super.httpToGoalsApi(HttpMethodEnum.POST.name,route,transformFunc,requestBody);
	}
	
	deleteGoal(goalId) {
		console.log(goalId);
	  	var route = this.goal + goalId
	  	var transformFunc = result => {
	  		var deleted = (result == 1) ? true : false;
	  		return { deleted : deleted };
	  	}
	  	return super.httpToGoalsApi(HttpMethodEnum.DELETE.name, route, transformFunc);
	}
};