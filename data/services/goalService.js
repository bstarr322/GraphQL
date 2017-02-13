import BaseService from './baseService.js';
import businessService from './businessService.js';
import referenceService from './referenceService.js';
import { HttpMethodEnum } from '../enums/enums.js';
import mapKeysDeep from 'deep-rename-keys';

import userService from './userService.js'

/**
 * @description This module contains service calls 
 * to goals microservice for goal object.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

	constructor(authHeader) {
		super(authHeader);
		this.req = authHeader;
		this.goals = '/goals';
		this.mygoals = '/mygoals';
		this.mygoal = '/mygoal/';
		this.goal = '/goal/';
		this.goalsCpd = '/goal/cpd/';
		this.user = '/user/';
		this.users = '/users';
		this.business = '/business';
	}

	//refactor mediators
	goalServiceToQueryBusinessId(method,route,params,goalId,transformFunc,requestBody){
		var headers = this.req;
		return this.getBusinessByGoalId(goalId).then( business => {
			headers.businessId = business.id;
			return super.httpToGoalsApi(method,route,params,headers,transformFunc,requestBody);
		})
	}

	getBusinessByGoalId(goalId){
		var route = this.goal + goalId + this.business; 
		return super.httpToGoalsApi(HttpMethodEnum.GET.name,route,null,this.req);
	}

	goalServiceWithBusinessId(method,route,params,businessId,transformFunc,requestBody){
		var headers = this.req;
		headers.businessId = businessId;
		return super.httpToGoalsApi(method,route,params,headers,transformFunc,requestBody);
	}

	//actual queries
	getGoals(businessId, page, size, sortField, sortDirection, prioritizeBusinessCritical, goalType) { 
		var route = this.goals;
		var params = { page:page, size:size, sortField:sortField, sortDirection:sortDirection, prioritizeBusinessCritical:prioritizeBusinessCritical, goalType:goalType };
		return this.goalServiceWithBusinessId(HttpMethodEnum.GET.name,route,params,businessId);
	}

	getMyGoals(businessId, page, size, sortField, sortDirection, prioritizeBusinessCritical, goalType) {
		var route = this.mygoals;
		var params = { page:page, size:size, sortField:sortField, sortDirection:sortDirection, prioritizeBusinessCritical:prioritizeBusinessCritical, goalType:goalType };
		return this.goalServiceWithBusinessId(HttpMethodEnum.GET.name,route,params,businessId);
	}

	getGoalPercentages(goalId, businessId){
		var promiseTeamsInTreeFormByBusiness= new businessService(this.req).getTeamsInTreeFormByBusiness(businessId);
		return promiseTeamsInTreeFormByBusiness.then(teamTree => {
			var requestBody = mapKeysDeep(teamTree, (key)=>{
				if (key === "Id") return "id";
				if (key === "ChildrenNodes") return "children";
				return key;
			});
			var route = "/goalPercentages/" + goalId;
			var transformFunc = result => result
			return this.goalServiceWithBusinessId(HttpMethodEnum.POST.name,route,null,businessId,transformFunc,requestBody);
		});
	}

	getGoal(goalId) {
		return this.getBusinessByGoalId(goalId)
			.then(business => new referenceService(this.req).getBusiness(business.id))
			.then(business => {
				var route = this.goal + goalId;
				var transformFunc = result => {
					result.business = business;
					delete result.businessId;
					return result;
				};
				return this.goalServiceWithBusinessId(HttpMethodEnum.GET.name,route,null,business.Id,transformFunc);
			});
	}

	getMyGoal(goalId) {
		var route = this.mygoal + goalId;
		var transformFunc = result => {
			return new referenceService(this.req).getBusiness(result.goalInfo.businessId).then(business => {
				result.goalInfo.business = business;
				delete result.goalInfo.businessId;
				return result;
			})
		};
		return this.goalServiceToQueryBusinessId(HttpMethodEnum.GET.name, route,null,goalId, transformFunc);
	}

	getGoalUsers(goalId, page, size, sortField, sortDirection) {
		var route = this.goal + goalId + this.users;
		var params = { page:page, size:size, sortField:sortField, sortDirection:sortDirection };
		var businessId;
		return this.getBusinessByGoalId(goalId)
			.then(business => { 
				businessId = business.id;
				return this.goalServiceWithBusinessId(HttpMethodEnum.GET.name,route,params,business.id)
			})
			.then(goalUsers => {
				return Promise.all(this.promiseTeamManagers(goalUsers,businessId)).then(managerTeams => {
					//#4 map to managers to goalUsers using teamId
			 		goalUsers.forEach(goalUser => {
						goalUser.teams.forEach(team => {
							managerTeams.forEach(managerTeam => {
								if (team.id == managerTeam.id) {
									team.managers = managerTeam.managers;
								}
							})
						})
					})
					return goalUsers;
			})	
		})
	}

	promiseTeamManagers(goalUsers,businessId){
		var promiseArr = [];
		var teamIdsArr = [];
		//#1 get teamIds from goalUsers
 		goalUsers.forEach(goalUser => {
			goalUser.teams.forEach(team => {
				teamIdsArr.push(team.id);
			})
		});
		//#2 filter to same teamIds only
		teamIdsArr = [ ...new Set(teamIdsArr) ];
		//#3 query filtered teamIds only
		teamIdsArr.forEach(teamId => {
			var promise = new userService(this.req).getTeamManagers(teamId,businessId);
			promiseArr.push(promise);
		});
		return promiseArr;
	}

	getGoalUser(goalId,userId) {
		var route = this.goal + goalId + this.user + userId;
		return this.goalServiceToQueryBusinessId(HttpMethodEnum.GET.name,route,null,goalId);
	}

	//Cpd Goal related 
	getCpdAvailableYears(goalId,userId) {
		var route = '/yearRange' + this.goal + goalId;
		return this.goalServiceToQueryBusinessId(HttpMethodEnum.GET.name,route,null,goalId);
	}

	getCpdGoalSummary(goalId) {
		var route = this.goalsCpd + goalId;
		var transformFunc = (result) => {
			return new referenceService(this.req).getMembership(result.membershipId).then(membership => {
				result.membership = membership;
				delete result.membershipId; 
				return result;
			})
		}
		return this.goalServiceToQueryBusinessId(HttpMethodEnum.GET.name,route,null,goalId,transformFunc);
	}

	getCpdGoalUsers(goalId,page,size,month, sortField, sortDirection) {
		var route  = this.goalsCpd + goalId + this.users;
		var params = { page:page, size:size,month:month,sortField:sortField, sortDirection:sortDirection };
		var transformFunc = (result) => {
			if(result.length > 0){
				return new referenceService(this.req).getMembership(result[0].membershipId).then(membership => {
					return {cpdUsers: result, membership:membership };
				})
			}
		}
		return this.goalServiceToQueryBusinessId(HttpMethodEnum.GET.name,route,params,goalId,transformFunc);
	}

	getCpdGoalUser(goalId,userId,year) {
		var route =  this.goalsCpd  + goalId +  this.user + userId + '/' + year;
		var params = {goalId:goalId};
		return this.goalServiceToQueryBusinessId(HttpMethodEnum.GET.name,route,params,goalId);
	}

	createGoal(input) {
		var body = input.body;
		var requestBody = { name: body.name, businessId: body.businessId, goalType: body.goalType, teams: body.teams, startDate: body.startDate, endDate: body.endDate }
		var nonCpdOrgAdminReqBody = { description: body.description, isBusinessCritical: body.isBusinessCritical, isSequential: body.isSequential, tasks: body.tasks } 
		var cpdOrgAdminReqBody = { industryId: body.industryId, membershipId: body.membershipId }
		var cpdReqBody = { industryId: body.industryId, membershipId: body.membershipId, pointsToComplete: body.pointsToComplete }
		var routeGoalType; 
		switch(input.body.goalType.id) {
			case 1: routeGoalType = "Induction"; Object.assign(requestBody,nonCpdOrgAdminReqBody); break;
			case 2: routeGoalType = "CpdOrgAdmin"; Object.assign(requestBody, cpdOrgAdminReqBody); break;
			case 3: routeGoalType = "PoliciesandProcedures"; Object.assign(requestBody,nonCpdOrgAdminReqBody); break;
			case 4: routeGoalType = "ProductUpdates"; Object.assign(requestBody,nonCpdOrgAdminReqBody); break;
			case 5: routeGoalType = "Regulatory"; Object.assign(requestBody,nonCpdOrgAdminReqBody); break;
			case 6: routeGoalType = "Training"; Object.assign(requestBody,nonCpdOrgAdminReqBody); break;
			case 7: routeGoalType = "Cpd"; Object.assign(requestBody,cpdReqBody); break;
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
		return this.goalServiceWithBusinessId(HttpMethodEnum.POST.name,route,null,body.businessId,transformFunc,requestBody);
	}
	
	deleteGoal(goalId) {
		var route = this.goal + goalId;
		var transformFunc = result => {
			var deleted = (result == 1) ? true : false;
			return { deleted : deleted };
		}
		return this.goalServiceToQueryBusinessId(HttpMethodEnum.DELETE.name,route,null,goalId,transformFunc);
	}
}