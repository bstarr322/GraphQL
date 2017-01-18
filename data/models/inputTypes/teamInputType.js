/**
 * Model of incoming team http request 
 */

import {
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql';


import userInputType from './userInputType.js';

export default new GraphQLInputObjectType ({
	name: 'TeamInput',
	fields: function () { return {
		id: { type: GraphQLString },
		name: { type: GraphQLString }
	}},
});