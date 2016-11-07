import { httpToGoalsApi } from '../utilities/serviceHelper.js'

export const taskTypeService = function() {};

taskTypeService.prototype.getTaskTypes = function() {
	var route = '/reference/taskTypes';
	return httpToGoalsApi('GET', route);
}

taskTypeService.prototype.getTaskType = function(taskTypeId) {
	var route = '/reference/taskType/' + taskTypeId;
	return httpToGoalsApi('GET', route);
}

taskTypeService.prototype.getTaskTypeByTag = function(tag) {
	var route = '/reference/taskTypeByTag/' + tag;
	return httpToGoalsApi('GET', route);
}
