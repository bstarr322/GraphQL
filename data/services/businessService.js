import { httpToLegacyApi } from '../utilities/serviceHelper.js'

export const businessService = function() {};

businessService.prototype.getGoalAssignableBusinesses = function() {
  var route = '/api/v1/businesses/goalassignable';
  return httpToLegacyApi("GET", route);
}

businessService.prototype.getIndustriesByBusiness = function(businessId) {
  var route = '/api/v1/businesses/' + businessId + '/industries';
  return httpToLegacyApi("GET", route);
}

businessService.prototype.getMembershipsByBusinessAndIndustry = function(businessId, industryId) {
  var route = '/api/v1/businesses/' + businessId + '/industries/' + industryId;
  return httpToLegacyApi("GET", route);
}

businessService.prototype.getUserIdsByBusinessAndTeam = function(businessId, teamId) {
  var route = '/api/v1/businesses/' + businessId + '/teams/' + teamId + '/users';
  return httpToLegacyApi("GET", route);
}

businessService.prototype.getTeamsInTreeFormByBusiness = function(businessId) {
  var route = '/api/v1/businesses/' + businessId + '/teams/tree';
  return httpToLegacyApi("GET", route);
}

businessService.prototype.getCollectionsInTreeFormByBusiness = function(businessId) {
  var route =  '/api/v1/businesses/' + businessId + '/collections/tree';
  return httpToLegacyApi("GET", route);
}

businessService.prototype.getContentsByBusiness = function(businessId) {
  var route = '/api/v1/businesses/' + businessId + '/contents';
  return httpToLegacyApi("GET", route);
}