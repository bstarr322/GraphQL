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
		this.collections = '/api/v1/collections/';
	}

	/**
	* Gets all collections visible to a business in tree structure
	*/
	getCollectionsInTreeFormByBusiness(businessId) {
		var route = this.collections + 'tree/businesses/' + businessId;
		return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  	}

}