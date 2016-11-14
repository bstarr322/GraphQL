
import BaseService from './BaseService.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains service calls 
 * to goals microservice for task type object.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

	constructor(authToken) {
		super(authToken);
	}

	getTaskTypes() {
		var route = '/reference/taskTypes';
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getTaskType(taskTypeId) {
		var route = '/reference/taskType/' + taskTypeId;
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getTaskTypeByTag(tag) {
		var route = '/reference/taskTypeByTag/' + tag;
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

};