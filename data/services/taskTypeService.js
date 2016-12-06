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
		this.routePrefix = '/reference/'
	}

	getTaskTypes() {
		var route = this.routePrefix + 'taskTypes';
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getTaskType(taskTypeId) {
		var route = this.routePrefix + 'taskType/' + taskTypeId;
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

	getTaskTypeByTag(tag) {
		var route = this.routePrefix + 'taskTypeByTag/' + tag;
		return super.httpToGoalsApi(HttpMethodEnum.GET.name, route);
	}

};