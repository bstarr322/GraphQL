import { httpToGoalsApi } from '../utilities/serviceHelper.js'

export default new function() {

	this.getTaskTypes = function() {
		var route = '/reference/taskTypes';
		return httpToGoalsApi('GET', route);
	}

	this.getTaskType = function(taskTypeId) {
		var route = '/reference/taskType/' + taskTypeId;
		return httpToGoalsApi('GET', route);
	}

	this.getTaskTypeByTag = function(tag) {
		var route = '/reference/taskTypeByTag/' + tag;
		return httpToGoalsApi('GET', route);
	}

};