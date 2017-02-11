/**
 * Model for getting cpd user goals from cpdone web service api.
 * 
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt
} from 'graphql';

import userType from "./userType.js";

export default new GraphQLObjectType ({
	name: 'CpdGoalUsers',
	fields: function() { return {
		cpdGoalUsersId: { 
			type: GraphQLID, 
			resolve: cpdGoalUsers => cpdGoalUsers.id 
		},
		goalId: { type: GraphQLString },
		user: { type: userType },
		startDate: { type: GraphQLString },
		anniversaryDate: { type: GraphQLString },
		timeRemaining: { type: GraphQLInt },
		pointsCompleted: { type: GraphQLInt },
		percentage: { type: GraphQLInt },
	}},
});