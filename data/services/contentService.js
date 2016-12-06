import BaseService from './baseService.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains content related service
 * calls in the cpdone web service api.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

  constructor(authToken) {
    super(authToken);
    this.routePrefix = '/api/v1/contents/';
  }

  /**
   * Gets all content visible to a business
   */
  getContentsByBusiness(businessId) {
    var route = this.routePrefix + 'businesses/' + businessId;
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }

  /**
   * Gets all the content ids in a collection by id and by business id
   */
  getContentByCollectionIdAndBusinessId(collectionId, businessId) {
    var route = this.routePrefix + 'collections/' + collectionId + '/businesses/' + businessId;
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }

}