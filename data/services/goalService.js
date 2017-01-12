import BaseService from './baseService.js'
import teamService from './teamService.js'
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
		this.cpd = 'cpd/';
		this.user = '/user/';
		this.users = '/users';
	}

	getGoals(businessId, page, size) { 
		var route;
		//testing purposes (to be fixed and automated)
		// page = 1;
		// size = 10;

		if (page == null || size == null) {
			route = this.goals + businessId;
		} else {
			route = this.goals + businessId + '?page=' + page + '&size=' + size;
		}
		var transformFunc = (result) => {
			var req = super.authHeader;
			return Promise.all(promisesForGetGoals(result,businessId,req)).then(data => {
				var goals = [];
				result.forEach((goal,goalIdx) => {
					goal.teams.forEach((team,teamIdx) => {
						for (var teamDetails of data) {
							if (team.id == teamDetails.Id) { 
								team.title = teamDetails.Title;
								break;
							};
						}
					});
					goals.push(goal);
				});
				return goals;
			});
		}
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route, transformFunc);
	}


	getMyGoals(businessId, userId, page, size) {
		var route;
		if (page == null || size == null) {
			route = this.goals + businessId + this.user + userId;
		} else {
			route = this.goals + businessId +  this.user + userId + '?page=' + page + '&size=' + size;
		}
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getGoal(goalId) {
		var route = this.goal + goalId;
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getGoalUsers(goalId) {
		var route = this.goal + goalId +  this.users;
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
			result.membership = {Id: result.membershipId, Name: null, CpdPoints: null};
			delete result.membershipId; 
			return result;
		};
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route, transformFunc);
	}

	getCpdGoalUsers(goalId,page,size,month) {
		var route;
		if (page == null || size == null || month == null) {
			route = this.goal + this.cpd + goalId + this.users;
		} else {
			route = this.goal + this.cpd + goalId + this.users + '?page=' + page + '&size=' + size + '&month=' + month;
		}	
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getCpdGoalUser(goalId,userId,year) {
		var route = this.goal + this.cpd + goalId +  this.user + userId + '/' + year;
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}
	//

	createGoal(input) {
		var requestBody = {
		    name: input.goal.name, 
		    businessId: input.goal.businessId,
		    goalType: input.goal.goalType,
			teams: input.goal.teams,
			startDate: input.goal.startDate
	  	}
	  	var nonCpdOrgAdminReqBody = {
			description: input.goal.description,
		    isBusinessCritical: input.goal.isBusinessCritical,
		    isSequential: input.goal.isSequential,
			tasks: input.goal.tasks
	  	}
	  	var cpdOrgAdminReqBody = {
			industryId: input.goal.industryId,
			membershipId: input.goal.membershipId
	  	}
	  	var cpdReqBody = {
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
	
	deleteGoal(input) {
	  	var route = this.goal + input.goalId
	  	return super.httpToGoalsApi(HttpMethodEnum.DELETE.name,route);
	}
};

function promisesForGetGoals(result,businessId, req) {
	var promiseArr = [];
	result.forEach( goal => {
		goal.teams.forEach( (team,idx) => {
			var promiseTeamName = new teamService(req).getTeamInformationByTeamIdAndBusinessId(team.id,businessId);
			promiseArr.push(promiseTeamName);
		})
	});
	return promiseArr;
}
