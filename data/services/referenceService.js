import BaseService from './baseService.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains references related service
 * calls in the cpdone web service api.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

  constructor(authHeader) {
    super(authHeader);
    this.req = authHeader;
    this.reference = '/api/v1/reference/';
  }

  //refactor mediator
  referenceServiceWithBusinessId(method,route,businessId,transformFunc,requestBody) {
    var headers = this.req;
    if(businessId) headers.businessId = businessId 
    return super.httpToLegacyApi(method,route,headers,transformFunc,requestBody);
  }


  /**
   * Get membership details for ui
   */
  getMembership(membershipId) {
    var route = this.reference + 'memberships/' + membershipId;
    return this.referenceServiceWithBusinessId(HttpMethodEnum.GET.name, route);
  }

  /**
   * Get business details for ui
   */
  getBusiness(businessId) {
    var route = this.reference + 'businesses/' + businessId;
    return this.referenceServiceWithBusinessId(HttpMethodEnum.GET.name, route, businessId);
  }

};
