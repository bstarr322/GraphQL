import BaseService from './BaseService.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains business related service
 * calls in the cpdone web service api.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

  constructor(authToken) {
    super(authToken);
    this.routePrefix = '/api/v1/businesses/';
  }

  /**
   * Get businesses visible to the user ( based on user id encrypted in header).
   */
  getGoalAssignableBusinesses() {
    var route = this.routePrefix + 'goalassignable';
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }

  /**
   * Get all registered industries in a business.
   */
  getIndustriesByBusiness(businessId) {
    var route = this.routePrefix + businessId + '/industries';
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }

  /**
   * Get all registered memberships from an industry in a business.
   */
  getMembershipsByBusinessAndIndustry(businessId, industryId) {
    var route = this.routePrefix + businessId + '/industries/' + industryId + '/memberships';
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }

  /**
   * Gets all teams in a business in tree structure
   */
  getTeamsInTreeFormByBusiness(businessId, reqs) {
    var route = this.routePrefix + businessId + '/teams/tree';
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }

};
