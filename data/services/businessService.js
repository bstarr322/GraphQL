
import BaseService from './BaseService.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains diffrent http service
 * calls for business in the cpdone web service api.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

  constructor(authToken) {
    super(authToken);
  }

  /**
   * Get businesses visible to the user ( based on user id encrypted in header).
   */
  getGoalAssignableBusinesses() {
    var route = '/api/v1/businesses/goalassignable';
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }

  /**
   * Get all registered industries in a business.
   */
  getIndustriesByBusiness(businessId) {
    var route = '/api/v1/businesses/' + businessId + '/industries';
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }

  /**
   * Get all registered memberships from an industry in a business.
   */
  getMembershipsByBusinessAndIndustry(businessId, industryId) {
    var route = '/api/v1/businesses/' + businessId + '/industries/' + industryId + '/memberships';
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }

  /**
   * Gets all registered userIds from a team in a business.
   * @return {string[]} A list of user ids.
   */
  getUserIdsByBusinessAndTeam(businessId, teamId) {
    var route = '/api/v1/businesses/' + businessId + '/teams/' + teamId + '/users';
    var transformFunc = function(result) { 
          var root = {};
          root["data"] = result;
          return root;
      }; 
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }

  /**
   * Gets all teams in a business in tree structure
   */
  getTeamsInTreeFormByBusiness(businessId, reqs) {
    var route = '/api/v1/businesses/' + businessId + '/teams/tree';
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }

  /**
   * Gets all collections visible to a business in tree structure
   */
  getCollectionsInTreeFormByBusiness(businessId) {
    var route = '/api/v1/businesses/' + businessId + '/collections/tree';
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }

  /**
   * Gets all content visible to a busin
   */
  getContentsByBusiness(businessId) {
    var route = '/api/v1/businesses/' + businessId + '/contents';
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }

};
