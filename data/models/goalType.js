/**
 * Model for getting goals
 * from goals service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLList,
	GraphQLBoolean,
	GraphQLInt
} from 'graphql';

import goalTypeType from './goalTypeType';
import teamType from './teamType';


export default new GraphQLObjectType({
  	name: 'Goal',
	fields: function() { return {
		id: { 
			type: new GraphQLNonNull(GraphQLID)
		},
		goalId: { 
			type: GraphQLString
		},
		goalType: { 
			type: goalTypeType
		},
		name: {
			type: GraphQLString
		},
		teams: {
			type: new GraphQLList(teamType)

		},
		startDate: {
			type: GraphQLString
		},
		endDate: {
			type: GraphQLString
		},
		numberOfTasks: {
			type: GraphQLInt 
		},
		progress: {
			type: GraphQLInt 
		},
	}},
});

