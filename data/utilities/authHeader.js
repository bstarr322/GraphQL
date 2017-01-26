/**
 * Model for authenticating http requests to 
 * cpdone apis i.e. goals and cpdone legacy.
 *
 * @param {string} token - jwt header field
 * @param {string} businessId  - the active business id header field
 */
export default class {
	
	constructor(token, businessId) {
		this.token = token;
		this.businessId = businessId;
	}

	toArrayObject(tokenKeyName, businessKeyName) {
		var arr = new Array();
		arr[tokenKeyName] = this.token;
		arr[businessKeyName] = this.businessId;
		return arr;
	}

}