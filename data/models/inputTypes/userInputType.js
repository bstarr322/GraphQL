/**
 * Model of incoming userId http request 
 */

import {
	GraphQLInputObjectType,
	GraphQLString
} from 'graphql';

export default new GraphQLInputObjectType ({
	name: 'UserInput',
	fields: function () { return {
	    id:{ type: GraphQLString },
	    fullName: { type: GraphQLString }
	}},
});