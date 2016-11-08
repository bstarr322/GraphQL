/**
 * Model for getting content
 * from cpdone web service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
	name: 'Content',
	fields: function () { return {
		id: {
			type: new GraphQLNonNull(GraphQLID), 
			resolve: content => content.Id 
		},
		name: { 
			type: GraphQLString, 
			resolve: content => content.Name 
		},
		type: { 
			type: GraphQLString, 
			resolve: content => content.Type 
		},
		typeId: { 
			type: GraphQLString, 
			resolve: content => content.TypeId 
		}
	}},
});