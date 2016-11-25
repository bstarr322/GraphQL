/**
 * Model of incoming goal http request 
 */

import {
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLBoolean
} from 'graphql';

import taskInputType from './taskInputType.js';
import teamInputType from './teamInputType.js';
import goalTypeInputType from './goalTypeInputType.js';

export default new GraphQLInputObjectType ({
	name:'GoalInput',
	fields: function() { return {
		id: {
			type: GraphQLString
		},
		name: {
			type: GraphQLString
		},
		goalType: {
			type: goalTypeInputType
		},
		description: {
			type: GraphQLString
		},
		businessId: {
			type: GraphQLString
		},
		isBusinessCritical: {
			type: GraphQLBoolean
		},
		isSequential: {
			type: GraphQLBoolean
		},
		startDate: {
			type: GraphQLString
		},
		tasks: {
			type: new GraphQLList(taskInputType) 
		},
		teams: {
			type: new GraphQLList(teamInputType)
		}
  	}},
});