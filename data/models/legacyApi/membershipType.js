/**
 * Model for getting memberships
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
	name: 'Membership',
	fields: function() { return {
	  	membershipId: { 
	  		type: GraphQLID, 
	  		resolve: membership => membership.Id 
	  	},
		name: { 
			type: GraphQLString, 
			resolve: membership => membership.Name 
		},
		cpdPoints: {
			type: GraphQLInt, 
			resolve: membership => membership.CpdPoints 
		}
	}},
});
