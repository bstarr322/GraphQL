
import { HttpMethodEnum } from '../enums/enums.js'
import { httpToLegacyApi } from '../utilities/serviceHelper.js'

/**
 * @description This module contains diffrent http service
 * calls for business in the cpdone web service api.
 * @param  {object} authToken A jwt token object
 */
export default class {

  constructor(authToken) {
    this.authToken = authToken;
  }

  /**
   * Get businesses visible to the user ( based on user id encrypted in header).
   */
  getGoalAssignableBusinesses() {
    var route = '/api/v1/businesses/goalassignable';
    return httpToLegacyApi(HttpMethodEnum.GET.name, route, this.authToken);
  }

  /**
   * Get all registered industries in a business.
   */
  getIndustriesByBusiness(businessId) {
    var route = '/api/v1/businesses/' + businessId + '/industries';
    return httpToLegacyApi(HttpMethodEnum.GET.name, route, this.authToken);
  }

  /**
   * Get all registered memberships from an industry in a business.
   */
  getMembershipsByBusinessAndIndustry(businessId, industryId) {
    var route = '/api/v1/businesses/' + businessId + '/industries/' + industryId + '/memberships';
    return httpToLegacyApi(HttpMethodEnum.GET.name, route, this.authToken);
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
    return httpToLegacyApi(HttpMethodEnum.GET.name, route, this.authToken);
  }

  /**
   * Gets all teams in a business in tree structure
   */
  getTeamsInTreeFormByBusiness(businessId, reqs) {
    var route = '/api/v1/businesses/' + businessId + '/teams/tree';
    console.log('a');
    return httpToLegacyApi(HttpMethodEnum.GET.name, route, this.authToken);
  }

  /**
   * Gets all collections visible to a business in tree structure
   */
  getCollectionsInTreeFormByBusiness(businessId) {
    var route =  '/api/v1/businesses/' + businessId + '/collections/tree';
    return httpToLegacyApi(HttpMethodEnum.GET.name, route, this.authToken);
  }

  /**
   * Gets all content visible to a busin
   */
  getContentsByBusiness(businessId) {
    var route = '/api/v1/businesses/' + businessId + '/contents';
    return httpToLegacyApi(HttpMethodEnum.GET.name, route, this.authToken);
  }

};
