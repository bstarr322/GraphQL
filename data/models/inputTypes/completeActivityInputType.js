/**
 * Model of incoming Activity http request  
 */

import {
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLBoolean
} from 'graphql';

import userInputType from './userInputType';
import taskTypeInputType from './taskTypeInputType';

export default new GraphQLInputObjectType ({
	name: 'CompleteActivityInput',
	fields: function() { return { 
		taskId: { type: GraphQLString },
		user: { type: userInputType },
		taskType: { type: taskTypeInputType },
		datePerformed: { type: GraphQLString },
		data: { type: GraphQLString }
	}},
});