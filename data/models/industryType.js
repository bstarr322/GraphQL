
/**
 * Model for getting industries
 * from cdpone web service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
	name: 'Industry',
	fields: function() { return {
		industryId: { 
			type: new GraphQLNonNull(GraphQLID), 
			resolve: industry => industry.Id 
		},
		name: { 
			type: GraphQLString, 
			resolve: industry => industry.Name 
		},
		requireCpdPoints: { 
			type: GraphQLInt, 
			resolve: industry => industry.RequiredCpdPoints 
		},
	}},
});