import BaseService from './baseService.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains business related service
 * calls in the cpdone web service api.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

  constructor(authHeader) {
    super(authHeader);
    this.req = authHeader;
    this.businesses = '/api/v1/businesses/';
  }

  //refactor mediator
  businessServiceWithBusinessId(method,route,businessId,transformFunc,requestBody) {
    var headers = this.req;
    if(businessId) headers.businessId = businessId 
    return super.httpToLegacyApi(method,route,headers,transformFunc,requestBody);
  }

  /**
   * Get businesses visible to the user ( based on user id encrypted in header).
   */
  getManagedGoalBusinesses() {
    var route = this.businesses + 'getManagedGoalBusinesses';
    return this.businessServiceWithBusinessId(HttpMethodEnum.GET.name, route);
  }

  /**
   * Get businesses visible to the user ( based on user id encrypted in header).
   */
  getMyGoalBusinesses() {
    var route = this.businesses + 'getMyGoalBusinesses';
    return this.businessServiceWithBusinessId(HttpMethodEnum.GET.name, route);
  }

  /**
   * Get all registered industries in a business.
   */
  getIndustriesByBusiness(businessId) {
    var route = this.businesses + businessId + '/industries';
    return this.businessServiceWithBusinessId(HttpMethodEnum.GET.name, route, businessId);
  }

  /**
   * Get all registered memberships from an industry in a business.
   */
  getMembershipsByBusinessAndIndustry(businessId, industryId) {
    var route = this.businesses + businessId + '/industries/' + industryId + '/memberships';
    return this.businessServiceWithBusinessId(HttpMethodEnum.GET.name, route, businessId);
  }

  /**
   * Gets all teams in a business in tree structure
   */
  getTeamsInTreeFormByBusiness(businessId) {
    var route = this.businesses + businessId + '/teams/tree';
    return this.businessServiceWithBusinessId(HttpMethodEnum.GET.name, route, businessId);
  }

  getTeamsInReducedTreeForm(teamIds, businessId){
    var route = this.businesses + businessId + '/teams/reducedtree';
    var requestBody = teamIds;
    var transformFunc = results => results
    return this.businessServiceWithBusinessId(HttpMethodEnum.POST.name, route, businessId, transformFunc, requestBody);
  }
};
