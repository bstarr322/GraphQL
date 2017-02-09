import BaseService from './baseService.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains service calls 
 * to goals microservice for task type object.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

	constructor(authHeader) {
	    super(authHeader);
	    this.req = authHeader;
		this.reference = '/reference/'
	}

	//refactor mediator
	taskTypeServiceWithHeaders(method,route) {
		var headers = this.req;
		return super.httpToGoalsApi(method,route,null,headers);
	}

	getTaskTypes() {
		var route = this.reference + 'taskTypes';
		return this.taskTypeServiceWithHeaders(HttpMethodEnum.GET.name, route);
	}

	getTaskType(taskTypeId) {
		var route = this.reference + 'taskType/' + taskTypeId;
		return this.taskTypeServiceWithHeaders(HttpMethodEnum.GET.name, route);
	}

	getTaskTypeByTag(tag) {
		var route = this.reference + 'taskTypeByTag/' + tag;
		return this.taskTypeServiceWithHeaders(HttpMethodEnum.GET.name, route);
	}

};