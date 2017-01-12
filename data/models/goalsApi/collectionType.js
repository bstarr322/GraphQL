/**
 * Model for getting collection in tree from 
 * from goals service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLList,
	GraphQLInt
} from 'graphql';

import contentType from './contentType'

export default new GraphQLObjectType({
	name: 'GoalServiceCollection',
	fields: function() { return {
		collectionId: { 
			type: GraphQLID, 
			resolve: collection => collection.id 
		},
		contents: { type: new GraphQLList(contentType) },
	}},
})
