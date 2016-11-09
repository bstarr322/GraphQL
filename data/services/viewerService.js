import { httpToJsonPlaceholderApi } from '../utilities/serviceHelper.js'

export default new function () {
	this.getViewer = function(viewerId) {
		var route = '/users/' + viewerId;
		return httpToJsonPlaceholderApi('GET', route);
	}
}
