import BaseService from './baseService.js'
import { HttpMethodEnum } from '../enums/enums.js'

/**
 * @description This module contains content related service
 * calls in the cpdone web service api.
 * @param  {object} authToken A jwt token object
 */
export default class extends BaseService {

  constructor(authHeader) {
    super(authHeader);
    this.contents = '/api/v1/contents/';
    this.business = '/businesses/';
  }

  /**
   * Gets all content visible to a business
   */
  getContentsByBusiness(businessId) {
    var route = this.contents + 'businesses/' + businessId;
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }

  /**
   * Gets all the content ids in a collection by id and by business id
   */
  getContentByCollectionIdAndBusinessId(collectionId, businessId) {
    var route = this.contents + 'collections/' + collectionId + this.business + businessId;

    var transformFunc = function(result) { 
      var list = [];
      result.forEach(function(contentId) {
        list.push({ 'contentId':contentId })
      });
      return list;
    }; 

    return super.httpToLegacyApi(HttpMethodEnum.GET.name,route,transformFunc);
  }

  /**
   * Gets complete content details by contentid and businessid
   */
  getContentSummaryByBusiness(contentId, businessId) {
    var route = this.contents + contentId + this.business + businessId;
    return super.httpToLegacyApi(HttpMethodEnum.GET.name, route);
  }
}