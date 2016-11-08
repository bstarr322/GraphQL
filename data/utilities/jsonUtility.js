/**
 * A library for json related shaping/manipulation.
 */
function JsonUtility() {
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

export default JsonUtility();