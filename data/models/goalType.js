/**
 * Model for getting goals
 * from goals service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLList,
	GraphQLBoolean
} from 'graphql';


export default new GraphQLObjectType({
  	name: 'Goal',
	fields: function() { return {
		goalId: { 
			type: new GraphQLNonNull(GraphQLID)
		},
		name: {
			type: GraphQLString
		},
		description: {
			type: GraphQLString
		},
		businessId: {
			type: GraphQLString
		},
		isBusinessCritical: {
			type: GraphQLBoolean
		},
		isSequential: {
			type: GraphQLBoolean
		},
		startDate: {
			type: GraphQLString
		},
	}},
});
