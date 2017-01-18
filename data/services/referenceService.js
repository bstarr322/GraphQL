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
    this.reference = '/api/v1/reference/';
  }

  /**
   * Get membership details for ui
   */
  getMembership(membershipId) {
    var route = this.reference + 'memberships/' + membershipId;
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }

  /**
   * Get business details for ui
   */
  getBusiness(businessId) {
    var route = this.reference + 'businesses/' + businessId;
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }

};
