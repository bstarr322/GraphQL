/**
 * Model of incoming membership http request  
 */

import {
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLInt
} from 'graphql';

export default new GraphQLInputObjectType ({
	name: 'MembershipInput',
	fields: function() { return { 
		membershipId: { type: GraphQLString },
		points: { type: GraphQLInt }
	}},
});