/**
 * Model of incoming membership http request  
 */

import {
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean
} from 'graphql';

export default new GraphQLInputObjectType ({
	name: 'MembershipInput',
	fields: function() { return { 
		membershipId: { type: GraphQLString },
		points: { type: GraphQLInt }
	}},
});