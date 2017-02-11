/**
 * Model of incoming team http request 
 */

import {
	GraphQLInputObjectType,
	GraphQLString,
} from 'graphql';

export default new GraphQLInputObjectType ({
	name: 'TeamInput',
	fields: function () { return {
		id: { type: GraphQLString },
		name: { type: GraphQLString }
	}},
});