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
	}

	uploadFile(file) {
		var route = '/upload';
		var requestBody = file;
		var transformFunc = result => {
			// transformFunc to be modified
			return result;
		}
		return super.httpToFilesApi(HttpMethodEnum.POST.name, route, transformFunc, requestBody);
	}

	downloadFile(fileId, businessId) {
		var route = '/url/' + fileId;
		return super.httpToFilesApi(HttpMethodEnum.GET.name, route);
	}
};
