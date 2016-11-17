
import BaseService from './BaseService.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains service calls 
 * to goals microservice for goal type object.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

	constructor(authToken) {
		super(authToken);
	}

	getGoalTypes() {
		var route = '/reference/goalTypes';
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getGoalTypeById(goalTypeId) {
		var route = '/reference/goalType/' + goalTypeId;
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getGoalTypeByTag(tag) {
	  	var route = '/reference/goalTypeByTag/' + tag;
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

};
