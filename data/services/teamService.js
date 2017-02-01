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
    this.teams = '/api/v1/teams/';
    this.businesses = '/businesses/';
  }

  //refactor mediator
  teamServiceWithBusinessId(method,route,businessId,transformFunc,requestBody) {
    var headers = this.req;
    if(businessId) headers.businessId = businessId 
    return super.httpToLegacyApi(method,route,headers,transformFunc,requestBody);
  }

  getTeamInformationByTeamIdAndBusinessId(teamId, businessId) {
    var route = this.teams + teamId + this.businesses + businessId
    return this.teamServiceWithBusinessId(HttpMethodEnum.GET.name,route,businessId);
  }
};
