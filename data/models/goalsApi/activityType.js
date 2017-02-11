/**
 * Model for getting activites from userCpdGoals/
 * from cpdone web service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt
} from 'graphql';

import taskTypeType from './taskTypeType.js';

export default new GraphQLObjectType({
	name: 'Activity',
	fields: function() { return {
		activityId: { type: GraphQLID },
		taskType: { type: taskTypeType },
		datePerformed: { type: GraphQLString },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		cpdCategory: { type: GraphQLString },
		contentId: { type: GraphQLString },
		points: { type: GraphQLInt },
	}},
});