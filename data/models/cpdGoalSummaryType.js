/**
 * Model for getting cpd goal summary from cpdone web service api.
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

import cpdSummaryType from './cpdSummaryType.js';

export default new GraphQLObjectType ({
	name: 'CpdGoalSummary',
	fields: function() { return {
		cpdGoalSummaryId: { 
			type: GraphQLID, 
			resolve: cpdGoalSummary => cpdGoalSummary.id 
		},
		extensionId: { type: GraphQLString },
		summary: { type: new GraphQLList(cpdSummaryType) },
	}},
});