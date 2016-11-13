
import { httpToGoalsApi } from '../utilities/serviceHelper.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains service calls 
 * to goals microservice for task type object.
 * @param  {object} authToken A jwt token object
 */
export default class {

	constructor(authToken) {
		this.authToken = authToken;
	}

	getTaskTypes() {
		var route = '/reference/taskTypes';
		return httpToGoalsApi(HttpMethodEnum.GET.name, route, this.authToken);
	}

	getTaskType(taskTypeId) {
		var route = '/reference/taskType/' + taskTypeId;
		return httpToGoalsApi(HttpMethodEnum.GET.name, route, this.authToken);
	}

	getTaskTypeByTag(tag) {
		var route = '/reference/taskTypeByTag/' + tag;
		return httpToGoalsApi(HttpMethodEnum.GET.name, route, this.authToken);
	}

};