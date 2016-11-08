/**
 * Model for getting memberships
 * from cpdone web service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
	name: 'Membership',
	fields: function() { return {
	  	id: { 
	  		type: new GraphQLNonNull(GraphQLID), 
	  		resolve: membership => membership.Id 
	  	},
		name: { 
			type: GraphQLString, 
			resolve: membership => membership.Name 
		},
	}},
});
