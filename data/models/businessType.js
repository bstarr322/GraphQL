/**
 * Model for getting goal assignable businesses
 * from cpdone web service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
	name: 'Business',
	fields: function() { return {
		businessId: { 
			type: new GraphQLNonNull(GraphQLID), 
			resolve: business => business.Id 
		},
		name: { 
			type: GraphQLString, 
			resolve: business => business.Name 
		},
		image: { 
			type: GraphQLString, 
			resolve: business => business.Image 
		},
	}},
});