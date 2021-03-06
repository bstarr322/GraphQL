/**
 * Model for getting content
 * from cpdone web service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
	name: 'ContentId',
	fields: function () { return {
		Id: { 
			type: GraphQLString, 
			resolve: content => content
		}
	}},
});