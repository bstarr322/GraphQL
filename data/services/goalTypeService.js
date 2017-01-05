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

	getGoalTypes() {
		var route = this.reference + 'goalTypes';
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getGoalType(goalTypeId) {
		var route = this.reference + 'goalType/' + goalTypeId;
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getGoalTypeByTag(tag) {
	  	var route = this.reference + 'goalTypeByTag/' + tag;
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}
};
