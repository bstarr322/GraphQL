import BaseService from './baseService.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains user related service
 * calls in the cpdone web service api.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

  constructor(authHeader) {
    super(authHeader);
    this.users = '/api/v1/users/'
    this.business = '/businesses/';
  }

  /**
   * Gets all registered userIds from a team in a business.
   * @return {string[]} A list of user ids.
   */
  getUserByBusinessAndTeam(teamId,businessId) {
    var route = this.users + 'teams/' + teamId + this.business + businessId;
    var transfromFunc = results => {
      var users = [];
      results.forEach(result => {
        var user = { id: result.Id, name: result.FullName };
        users.push(user);
      });
      return users;
    }
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route,transfromFunc);
  }

  /**
   * Gets all registered userIds from a team in a business.
   * @return {string[]} A list of user ids.
   */
  getUserSummaryByBusiness(userId,businessId) {
    var route = this.users + userId + this.business + businessId;
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }

}