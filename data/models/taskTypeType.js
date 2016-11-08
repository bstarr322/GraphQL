
/**
 * Model for getting tasktypes
 * from goals service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLList
} from 'graphql';

export default new GraphQLObjectType({
	name: 'TaskType',
	fields: function() { return {
		id: { 
			type: new GraphQLNonNull(GraphQLID)
		},
		name: { 
			type: GraphQLString 
		},
		tag: { 
			type: GraphQLString 
		},
	}},
});