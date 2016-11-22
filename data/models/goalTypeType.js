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
	goalTypeId: { 
		type: new GraphQLNonNull(GraphQLID),
		resolve: goalType => goalType.id
	},
	name: { 
		type: GraphQLString 
	},
	tag: { 
		type: GraphQLString 
	},
  }},
});