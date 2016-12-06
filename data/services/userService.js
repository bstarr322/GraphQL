import BaseService from './BaseService.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains user related service
 * calls in the cpdone web service api.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

  constructor(authToken) {
    super(authToken);
    this.routePrefix = '/api/v1/users/'
  }

  /**
   * Gets all registered userIds from a team in a business.
   * @return {string[]} A list of user ids.
   */
  getUserIdsByBusinessAndTeam(businessId, teamId) {
    var route = this.routePrefix + 'teams/' + teamId + 'businesses' + businessId;
    var transformFunc = function(result) { 
          var root = {};
          root["data"] = result;
          return root;
      }; 
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }

}