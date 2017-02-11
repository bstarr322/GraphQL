/**
 * Model for getting content
 * from cpdone web service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
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
		purchased: {
			type: GraphQLString, 
			resolve: content => content.Purchased 
		},
		duration: {
			type: GraphQLString, 
			resolve: content => content.Duration 
		},
		presenter: {
			type: GraphQLString, 
			resolve: content => content.Presenter 
		},
		datePublished: {
			type: GraphQLString, 
			resolve: content => content.DatePublished 
		},
		contentRating: {
			type: GraphQLString, 
			resolve: content => content.ContentRating 
		},
	}},
});