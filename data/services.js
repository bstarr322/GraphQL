import {httpGet, httpPost} from './util.js';
import config from '../config.js';
//export const businessService from './services/businessService.js'

export const viewerServices = function() {};

viewerServices.prototype.getViewer = function(viewerId) {
  return httpGet(config.JSON_HOST, config.JSON_PORT, '/users/'+viewerId, function(result) { return result; });
}

