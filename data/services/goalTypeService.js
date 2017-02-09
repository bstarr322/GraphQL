import BaseService from './baseService.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains service calls 
 * to goals microservice for goal type object.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

	constructor(authHeader) {
	    super(authHeader);
		this.reference = '/reference/'
	}

	//refactor mediator
	goalTypeServiceWithHeaders(method,route,businessId,transformFunc,requestBody) {
		var headers = this.req;
		return super.httpToGoalsApi(method,route,headers,transformFunc,requestBody);
	}

	getGoalTypes() {
		var route = this.reference + 'goalTypes';
		return this.goalTypeServiceWithBusinessId(HttpMethodEnum.GET.name, route);
	}

	getGoalType(goalTypeId) {
		var route = this.reference + 'goalType/' + goalTypeId;
		return this.goalTypeServiceWithBusinessId(HttpMethodEnum.GET.name, route);
	}

	getGoalTypeByTag(tag) {
	  	var route = this.reference + 'goalTypeByTag/' + tag;
		return this.goalTypeServiceWithBusinessId(HttpMethodEnum.GET.name, route);
	}
};
