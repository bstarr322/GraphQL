/**
 * Model of incoming content http request 
 */

import {
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLBoolean
} from 'graphql';

export default new GraphQLInputObjectType ({
	name: 'ContentInput',
	fields: function() { return { 
		contentId: { type: GraphQLString }
	}},
});