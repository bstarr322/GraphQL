/**
 * Model for getting cpd user goals from cpdone web service api.
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
	name: 'CpdGoalUsers',
	fields: function() { return {
		cpdGoalUsersId: { 
			type: GraphQLID, 
			resolve: cpdGoalUsers => cpdGoalUsers.id 
		},
		goalId: { type: GraphQLString },
		userId: { type: GraphQLString },
		startDate: { type: GraphQLString },
		anniversaryDate: { type: GraphQLString },
		timeRemaining: { type: GraphQLInt },
		pointsCompleted: { type: GraphQLInt },
		percentage: { type: GraphQLInt },
	}},
});