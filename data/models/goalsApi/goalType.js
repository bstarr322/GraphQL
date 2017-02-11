/**
 * Model for getting goals from goals service api.
 * Parallel to userGoalType except in id value (goalId not equal to userGoalId)
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLList,
	GraphQLBoolean,
	GraphQLInt
} from 'graphql';

import goalTypeType from './goalTypeType';
import teamType from './teamType';
import taskType from './taskType';
import businessType from '../legacyApi/businessType'

export default new GraphQLObjectType({
	name: 'Goal',
	fields: function() { return {
		goalId: { 
			type: GraphQLID,
			resolve: goal => goal.id
		},
		extensionId: { type: GraphQLString },
		name: { type: GraphQLString	},
		goalType: { type: goalTypeType },
		description: { type: GraphQLString },
		business: { type: businessType },
		teams: { type: new GraphQLList(teamType) },
		startDate: { type: GraphQLString },
		isBusinessCritical: { type: GraphQLBoolean },
		isSequential: { type: GraphQLBoolean },
		endDate: { type: GraphQLString },
		numberOfTasks: { type: GraphQLInt },
		progress: { type: GraphQLInt },
		tasks: { type: new GraphQLList(taskType) },
	}},
});

