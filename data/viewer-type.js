import {
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionFromPromisedArray,
} from 'graphql-relay';

import {
  goalServices,
  viewerServices,
  goalTypeServices,
  taskTypeServices,
} from './services.js';

import {
  goalType,
  goalType_Type,
  taskType_Type,
} from './models.js';

import {
  goalConnection,
  taskTypeConnection,
  goalTypeConnection,
} from './connections.js';


export function viewerQuery() {
  return {
	viewerId: { 
		type: GraphQLString, 
		resolve: (viewerType) => viewerType.id
	},
	name: { type: GraphQLString },
	goalsConn: {
		type: goalConnection,
		args: {business: {type: GraphQLString},...connectionArgs},
		resolve: (_, args) => connectionFromPromisedArray(new goalServices().getGoals(args.business), args)
	},
	goal: {
		type: goalType,
		args: {goalId:{type: GraphQLInt}},
		resolve: (_,args) => new goalServices().getGoal(args.goalId)			
	},
	goalTypesConn: {
		type: goalTypeConnection,
		args: connectionArgs,
		resolve: (_, args) => connectionFromPromisedArray(new goalTypeServices().getGoalTypes(), args)
	},
	goalType: {
		type: goalType_Type,
		args: {goalTypeId: {type: GraphQLInt}},
		resolve: (_,args) => new goalTypeServices().getGoalType(args.goalTypeId)
	},
	taskTypesConn: {
		type: taskTypeConnection,
		args: connectionArgs,
		resolve: (_, args) => connectionFromPromisedArray(new taskTypeServices().getTaskTypes(), args)
	},
	taskType: {
		type: taskType_Type,
		args: {taskTypeId: {type: GraphQLInt}},
		resolve: (_,args) => new taskTypeServices().getTaskType(args.taskTypeId)
	},
  };
}