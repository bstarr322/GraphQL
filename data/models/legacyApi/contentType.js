/**
 * Model for getting content
 * from cpdone web service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLInt
} from 'graphql';

export default new GraphQLObjectType({
	name: 'LegacyContent',
	fields: function () { return {
		contentId: {
			type: GraphQLID, 
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
		},
		image: {
			type: GraphQLString, 
			resolve: content => content.Image 
		},
		progress: { type: GraphQLString },
	}},
});