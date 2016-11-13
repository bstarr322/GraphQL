
import { httpToGoalsApi } from '../utilities/serviceHelper.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains service calls 
 * to goals microservice for goal type object.
 * @param  {object} authToken A jwt token object
 */
export default class {

	constructor(authToken) {
		this.authToken = authToken;
	}

	getGoalTypes() {
		var route = '/reference/goalTypes';
		return httpToGoalsApi(HttpMethodEnum.GET.name, route, this.authToken);
	}

	getGoalTypeById(goalTypeId) {
		var route = '/reference/goalType/' + goalTypeId;
		return httpToGoalsApi(HttpMethodEnum.GET.name, route, this.authToken);
	}

	getGoalTypeByTag(tag) {
	  	var route = '/reference/goalTypeByTag/' + tag;
		return httpToGoalsApi(HttpMethodEnum.GET.name, route, this.authToken);
	}

};
