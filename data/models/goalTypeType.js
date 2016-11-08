/**
 * Model for getting goal type 
 * from goals service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
  name: 'GoalType',
  fields: function() { return {
	id: { 
		type: new GraphQLNonNull(GraphQLID)
	},
	name: { 
		type: GraphQLString 
	},
	iconReference: { 
		type: GraphQLString 
	},
	tag: { 
		type: GraphQLString 
	},
  }},
});