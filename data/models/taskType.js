/**
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLID 
} from 'graphql';

import taskTypeType from './taskTypeType.js';
import contentType from './contentType.js';
import collectionTreeType from './collectionTreeType.js';

export default new GraphQLObjectType ({
	name: 'Task',
	fields: function() { return {
		taskId: { type: GraphQLID },
		userTaskId: { type: GraphQLString },
		userId: { type: GraphQLString },
		taskType: {type: taskTypeType },
		instruction: {  type: GraphQLString },
		order: { type: GraphQLInt },
		daysToComplete: { type: GraphQLInt },
		data: {type: GraphQLString }, 
		content: { type: contentType },
		collection: { type: collectionTreeType },
		isCompleted: { type: GraphQLBoolean }
	}},
});