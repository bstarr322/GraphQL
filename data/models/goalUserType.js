/**
 * Model for getting user goals from cpdone web service api.
 * parallel to goalType except in id value (goalId not equal to userGoalId)
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLInt,
	GraphQLList
} from 'graphql';

import teamType from "./teamType.js";
import goalType from "./goalType.js";
import taskType from "./taskType.js";
import userType from "./userType.js";

export default new GraphQLObjectType ({
	name: 'GoalUser',
	fields: function() { return {
		goalUserId: { 
			type: GraphQLID, 
			resolve: userGoal => userGoal.id 
		},
		extensionId: { type: GraphQLString },
		goalId: { type: GraphQLString },
		user: { type: userType },
		userId: { type: GraphQLString },
		goalInfo: { type: goalType },
		teams: { type: new GraphQLList(teamType) },
		progress: { type: GraphQLInt },
		lastUpdate: { type: GraphQLString },
		tasks: { type: new GraphQLList(taskType) },
	}},
});