/**
 * A library for converting dictionary to object
 */
export default new function() {

	var convert = function(arr) {
		var obj = {};
		for (var key in arr) {
			var value = arr[key];
			obj[key] = value
		}
		return obj
	}
	return {
		convert: convert
	}
}
