import BaseService from './baseService.js'
import { HttpMethodEnum } from '../enums/enums.js'
import mapKeysDeep from 'deep-rename-keys';

/**
 * @description This module contains user related service
 * calls in the cpdone web service api.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

  constructor(authHeader) {
    super(authHeader);
    this.req = authHeader;
    this.users = '/api/v1/users/'
    this.business = '/businesses/';
    this.manager = '/managers/teams/'
  }

  //refactor mediator
  userServiceWithBusinessId(method,route,businessId,transformFunc,requestBody) {
    var headers = this.req;
    if(businessId) headers.businessId = businessId 
    return super.httpToLegacyApi(method,route,headers,transformFunc,requestBody);
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
    return this.userServiceWithBusinessId(HttpMethodEnum.GET.name, route, businessId, transfromFunc);
  }

  /**
   * Gets details of the user by businessId and userId.
   */
  getUserSummaryByBusiness(userId,businessId) {
    var route = this.users + userId + this.business + businessId;
    return this.userServiceWithBusinessId(HttpMethodEnum.GET.name, route, businessId);
  }

  getTeamManagers(teamId,businessId){
    var route = this.users + this.manager + teamId + this.business + businessId;
    var transformFunc = results => {
      results = mapKeysDeep(results, (key)=>{
        if (key === "Id") return "id";
        if (key === "FullName") return "name";
        return key;
      });
      return  { id: teamId, managers: results }
    }
    return this.userServiceWithBusinessId(HttpMethodEnum.GET.name, route, businessId, transformFunc);
  }

}