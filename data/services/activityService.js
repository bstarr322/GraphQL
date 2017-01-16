
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

	}

	completeActivities(activites) {
		var route = '/activity/complete';
		var requestBody = activites;
		var transformFunc = result => {
			return result;
		}
		return super.httpToGoalsApi(HttpMethodEnum.POST.name,route,transformFunc,requestBody);
	}

	updateActivityContent(activityContent) {
		var route = '/activity/content';
		var requestBody = activityContent;
		var transformFunc = result => {
			return result;
		}
		return super.httpToGoalsApi(HttpMethodEnum.POST.name,route,transformFunc,requestBody);
	}

}

