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
    this.req = authHeader;
    this.contents = '/api/v1/contents/';
    this.business = '/businesses/';
  }

  //refactor mediator
  contentServiceWithBusinessId(method,route,businessId,transformFunc,requestBody) {
    var headers = this.req;
    if(businessId) headers.businessId = businessId 
    return super.httpToLegacyApi(method,route,headers,transformFunc,requestBody);
  }

  /**
   * Gets all content visible to a business
   */
  getContentsByBusiness(businessId) {
    var route = this.contents + 'businesses/' + businessId;
    return this.contentServiceWithBusinessId(HttpMethodEnum.GET.name,route,businessId);
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

    return this.contentServiceWithBusinessId(HttpMethodEnum.GET.name,route,businessId,transformFunc);
  }

  /**
   * Gets complete content details by contentid and businessid
   */
  getContentSummaryByBusinessAndContentId(contentId, businessId) {
    var route = this.contents + contentId + this.business + businessId;
    return this.contentServiceWithBusinessId(HttpMethodEnum.GET.name,route,businessId);
  }
}