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
import userType from "./userType.js";

export default new GraphQLObjectType ({
	name: 'GoalUsers',
	fields: function() { return {
		goalUserId: { 
			type: GraphQLID, 
			resolve: goalUser => goalUser.id 
		},
		user: { type: userType },
		teams: { type: new GraphQLList(teamType) },
		progress: { type: GraphQLInt },
		lastUpdate: { type: GraphQLString }
	}},
});