import BaseService from './baseService.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains user related service
 * calls in the cpdone web service api.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

  constructor(authToken) {
    super(authToken);
    this.users = '/api/v1/users/'
  }

  /**
   * Gets all registered userIds from a team in a business.
   * @return {string[]} A list of user ids.
   */
  getUserIdsByBusinessAndTeam(teamId,businessId) {
    var route = this.users + 'teams/' + teamId + '/businesses/' + businessId;
    var transformFunc = function(result) { 
      var list = [];
      result.forEach(function(userId) {
        list.push({ 'id':userId })
      });
      return list;
    }; 
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route,transformFunc);
  }

}