import { httpToGoalsApi } from '../utilities/serviceHelper.js'

export default new function() {
	this.getGoalTypes = function() {
		var route = '/reference/goalTypes';
		return httpToGoalsApi('GET', route);
	}

	this.getGoalType = function(goalTypeId) {
		var route = '/reference/goalType/' + goalTypeId;
		return httpToGoalsApi('GET', route);
	}

	this.getGoalTypeByTag = function(tag) {
	  	var route = '/reference/goalTypeByTag/' + tag;
		return httpToGoalsApi('GET', route);
	}
};
