import BaseService from './baseService.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains collections related service
 * calls in the cpdone web service api.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

	constructor(authHeader) {
		super(authHeader);
		this.req = authHeader;
		this.collections = '/api/v1/collections/';
	}

	//refactor mediator
	collectionServiceWithBusinessId(method,route,businessId,transformFunc,requestBody) {
	    var headers = this.req;
	    if(businessId) headers.businessId = businessId 
	    return super.httpToLegacyApi(method,route,headers,transformFunc,requestBody);
	}

	/**
	* Gets all collections visible to a business in tree structure
	*/
	getCollectionsInTreeFormByBusiness(businessId) {
		var route = this.collections + 'tree/businesses/' + businessId;
		return this.collectionServiceWithBusinessId(HttpMethodEnum.GET.name, route, businesId);
	}

}