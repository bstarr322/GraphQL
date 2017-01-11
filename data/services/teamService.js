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
    this.teams = '/api/v1/teams/';
    this.businesses = '/businesses/';
  }

  getTeamInformationByTeamIdAndBusinessId(teamId, businessId) {
    var route = this.teams + teamId + this.businesses + businessId
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }
};
