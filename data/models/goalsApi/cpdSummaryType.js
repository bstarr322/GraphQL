/**
 * Model for getting summary from CpdGoalSummary of cpdone web service api.
 * 
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLInt,
	GraphQLList
} from 'graphql';

export default new GraphQLObjectType ({
	name: 'CpdSummary',
	fields: function() { return {
		monthsRemaining: { type: GraphQLInt },
		numberOfUsers: { type: GraphQLInt }
	}},
});