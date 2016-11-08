/**
 * Model of incoming userId http request 
 */

import {
	GraphQLInputObjectType,
	GraphQLString
} from 'graphql';

export default new GraphQLInputObjectType ({
	name: 'UserIdInput',
	fields: function () { return {
		id: { 
			type: GraphQLString 
		}
	}},
});