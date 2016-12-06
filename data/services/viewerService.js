import BaseService from './BaseService.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains service calls 
 * to a sandbox json server.
 */
export default class extends BaseService {

	constructor(authToken) {
		super(authToken);
	}

	getViewer(viewerId) {
		var route = '/users/' + viewerId;
		return super.httpToJsonPlaceholderApi(HttpMethodEnum.GET.name, route);
	}

}
