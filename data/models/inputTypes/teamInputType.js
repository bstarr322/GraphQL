/**
 * Model of incoming team http request 
 */

import {
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql';


import userIdInputType from './userIdInputType.js';

export default new GraphQLInputObjectType ({
	name: 'TeamInput',
	fields: function () { return {
		id: { 
			type: GraphQLString 
		},
		users: { 
			type: new GraphQLList(userIdInputType)
		}
	}},
});