
import BaseService from './baseService.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains service calls 
 * to goals microservice for activity.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

	constructor(authHeader) {
		super(authHeader);
		this.req = authHeader;

	}

	//refactor mediator
	activityServiceWithBusinessId(method,route,businessId,transformFunc,requestBody) {
		var headers = this.req;
		if(businessId) headers.businessId = businessId 
		return super.httpToGoalsApi(method,route,null,headers,transformFunc,requestBody);
	}

	completeActivities(activites,businessId) {
		var route = '/activity/complete';
		var requestBody = activites;
		var transformFunc = result => {
			return result;
		}
		return this.activityServiceWithBusinessId(HttpMethodEnum.POST.name,route,businessId,transformFunc,requestBody);
	}

	updateActivityContent(activityContent) {
		var route = '/activity/content';
		var requestBody = activityContent;
		var transformFunc = result => {
			return result;
		}
		return this.activityServiceWithBusinessId(HttpMethodEnum.POST.name,route,transformFunc,requestBody);
	}

}

