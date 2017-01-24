/**
 * Model of incoming goal http request 
 */

import {
	GraphQLInputObjectType,
	GraphQLString,
} from 'graphql';

export default new GraphQLInputObjectType ({
	name:'deleteGoalInput',
	fields: function() { return {
		goalId: { type: GraphQLString },
  	}},
});