import { httpToGoalsApi } from '../utilities/serviceHelper.js'

export const goalTypeService = function() {};

goalTypeService.prototype.getGoalTypes = function() {
	var route = '/reference/goalTypes';
	return httpToGoalsApi('GET', route);
}

goalTypeService.prototype.getGoalType = function(goalTypeId) {
	var route = '/reference/goalType/' + goalTypeId;
	return httpToGoalsApi('GET', route);
}

goalTypeService.prototype.getGoalTypeByTag = function(tag) {
  	var route = '/reference/goalTypeByTag/' + tag;
	return httpToGoalsApi('GET', route);
}
