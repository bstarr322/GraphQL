
import { httpToJsonPlaceholderApi } from '../utilities/serviceHelper.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains service calls 
 * to a sandbox json server.
 */
export default class {

	getViewer(viewerId) {
		var route = '/users/' + viewerId;
		return httpToJsonPlaceholderApi(HttpMethodEnum.GET.name, route);
	}

}
