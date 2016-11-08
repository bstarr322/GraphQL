/**
 * Model of incoming task http request 
 */

import {
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLInt
} from 'graphql';

import taskTypeInputType from './taskTypeInputType.js';
import contentInputType from './contentInputType.js';

export default new GraphQLInputObjectType ({
	name: 'TaskInput',
	fields: function() { return {
		taskType: {
			type: taskTypeInputType 
		},
		instruction: { 
			type: GraphQLString 
		},
		order: { 
			type: GraphQLInt 
		},
		daysToComplete: { 
			type: GraphQLInt 
		},
		content: { 
			type: contentInputType 
		}
	}},
});