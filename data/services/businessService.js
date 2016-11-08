/**
 * This module contains diffrent http service calls for business in 
 * the cpdone web service api.
 */

import { httpToLegacyApi } from '../utilities/serviceHelper.js'

export default new function() {

  /**
   * Get businesses visible to the user ( based on user id encrypted in header).
   */
  this.getGoalAssignableBusinesses = function() {
    var route = '/api/v1/businesses/goalassignable';
    return httpToLegacyApi("GET", route);
  }

  /**
   * Get all registered industries in a business.
   */
  this.getIndustriesByBusiness = function(businessId) {
    var route = '/api/v1/businesses/' + businessId + '/industries';
    return httpToLegacyApi("GET", route);
  }

  /**
   * Get all registered memberships from an industry in a business.
   */
  this.getMembershipsByBusinessAndIndustry = function(businessId, industryId) {
    var route = '/api/v1/businesses/' + businessId + '/industries/' + industryId + '/memberships';
    return httpToLegacyApi("GET", route);
  }

  /**
   * Gets all registered userIds from a team in a business.
   * @return {string[]} A list of user ids.
   */
  this.getUserIdsByBusinessAndTeam = function(businessId, teamId) {
    var route = '/api/v1/businesses/' + businessId + '/teams/' + teamId + '/users';
    var transformFunc = function(result) { 
          var root = {};
          root["data"] = result;
          return root;
      }; 
    return httpToLegacyApi("GET", route);
  }

  /**
   * Gets all teams in a business in tree structure
   */
  this.getTeamsInTreeFormByBusiness = function(businessId) {
    var route = '/api/v1/businesses/' + businessId + '/teams/tree';
    return httpToLegacyApi("GET", route);
  }

  /**
   * Gets all collections visible to a business in tree structure
   */
  this.getCollectionsInTreeFormByBusiness = function(businessId) {
    var route =  '/api/v1/businesses/' + businessId + '/collections/tree';
    return httpToLegacyApi("GET", route);
  }

  /**
   * Gets all content visible to a business.
   */
  this.getContentsByBusiness = function(businessId) {
    var route = '/api/v1/businesses/' + businessId + '/contents';
    return httpToLegacyApi("GET", route);
  }

};
