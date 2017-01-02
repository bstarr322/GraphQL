
/**
 * Model for getting industries
 * from cdpone web service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
	name: 'Industry',
	fields: function() { return {
		industryId: { 
			type: GraphQLID, 
			resolve: industry => industry.Id 
		},
		name: { 
			type: GraphQLString, 
			resolve: industry => industry.Name 
		},
	}},
});