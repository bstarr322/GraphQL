/**
 * Model for getting cpd user goal from cpdone web service api.
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

import dateRangeType from './cpdAvailableYearsType.js';
import activityType from './activityType.js';
import userType from './userType.js';

export default new GraphQLObjectType ({
	name: 'CpdGoalUser',
	fields: function() { return {
		cpdGoalUserId: { 
			type: GraphQLID, 
			resolve: cpdGoalUser => cpdGoalUser.id 
		},
		goalId: { type: GraphQLString },
		goalCpdPersonalId: { type: GraphQLString },
		goalCpdOrgAdminId: { type: GraphQLString },
		membershipId: { type: GraphQLString },
		dateJoined: { type: GraphQLString },
		pointsCompleted: { type: GraphQLInt },
		pointsToComplete: { type: GraphQLInt },
		dateRange: { type: dateRangeType
		 },
		activities: { type: new GraphQLList(activityType) },
		user: {type: userType}

	}},
});