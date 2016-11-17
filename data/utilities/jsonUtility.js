/**
 * A library for json related shaping/manipulation.
 */
export default new function() {
	// Tries to convert string to json.
	var tryParse = function(str) {
	    try {
	      return JSON.parse(str);
	    } catch (e) {
	      return str;
	    }
	}
	return {
		tryParse: tryParse
	}
}
