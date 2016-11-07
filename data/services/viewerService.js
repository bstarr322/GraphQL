import { httpToJsonPlaceholderApi } from '../utilities/serviceHelper.js'

export const viewerServices = function() {};

viewerService.prototype.getViewer = function(viewerId) {
	var route = '/users/' + viewerId;
	return httpToJsonPlaceholderApi('GET', route);
}
