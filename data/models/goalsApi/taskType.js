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
import contentType from '../legacyApi/contentType.js';
import collectionTreeType from '../legacyApi/collectionTreeType.js';

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
		endDate: { type: GraphQLString },
		data: {type: GraphQLString }, 
		content: { type: contentType },
		collection: { type: collectionTreeType },
		isCompleted: { type: GraphQLBoolean }
	}},
});