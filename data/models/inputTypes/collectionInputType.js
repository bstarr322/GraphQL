/**
 * Model of incoming content http request 
 */

import {
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql';

import contentInputType from './contentInputType';

export default new GraphQLInputObjectType ({
	name: 'CollectionInput',
	fields: function() { return { 
		collectionId: { type: GraphQLString },
		contents: { type: new GraphQLList(contentInputType) }
	}},
});