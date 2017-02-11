/**
 * Model for getting user goals from cpdone web service api.
 * parallel to goalType except in id value (goalId not equal to userGoalId)
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList
} from 'graphql';

import goalType from "./goalType.js";
import taskType from "./taskType.js";
import userType from "./userType.js";

export default new GraphQLObjectType ({
	name: 'GoalUser',
	fields: function() { return {
		goalId: { 
			type: GraphQLID, 
			resolve: goal => goal.id 
		},
		extensionId: { type: GraphQLString },
		user: { type: userType },
		goalInfo: { type: goalType },
		progress: { type: GraphQLInt },
		tasks: { type: new GraphQLList(taskType) },
	}},
});