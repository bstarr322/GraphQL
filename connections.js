//import { connectionDefinitions } from 'graphql-relay';
var graphqlrelay = require('graphql-relay');
var model = require('./models');

const goalConnection = graphqlrelay.connectionDefinitions({ name: 'Goal', nodeType: model.goalType });

const goalTypeConnection = graphqlrelay.connectionDefinitions({ name: 'GoalType', nodeType: model.goalType_Type });
	
const taskTypeConnection = graphqlrelay.connectionDefinitions({ name: 'TaskType', nodeType: model.taskType_Type });

exports.goalConnection = goalConnection.connectionType;
exports.taskTypeConnection = taskTypeConnection.connectionType;
exports.goalTypeConnection = goalTypeConnection.connectionType;