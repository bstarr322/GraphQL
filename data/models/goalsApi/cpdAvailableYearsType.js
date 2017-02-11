/**
 * Model for getting goal assignable businesses
 * from cpdone web service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt
} from 'graphql';

export default new GraphQLObjectType({
	name: 'CpdAvailableYears',
	fields: function() { return {
		year: { type:  GraphQLInt },
		from: { type: GraphQLString },
		to: { type: GraphQLString }
	}}
});