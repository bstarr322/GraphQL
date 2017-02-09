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
	    this.req = authHeader;
		this.reference = '/reference/'
	}

	//refactor mediator
	goalTypeServiceWithHeaders(method,route) {
		var headers = this.req;
		return super.httpToGoalsApi(method,route,null,headers);
	}

	getGoalTypes() {
		var route = this.reference + 'goalTypes';
		return this.goalTypeServiceWithHeaders(HttpMethodEnum.GET.name, route);
	}

	getGoalType(goalTypeId) {
		var route = this.reference + 'goalType/' + goalTypeId;
		return this.goalTypeServiceWithHeaders(HttpMethodEnum.GET.name, route);
	}

	getGoalTypeByTag(tag) {
	  	var route = this.reference + 'goalTypeByTag/' + tag;
		return this.goalTypeServiceWithHeaders(HttpMethodEnum.GET.name, route);
	}
};
