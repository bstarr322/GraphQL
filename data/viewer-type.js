import {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType
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
  teamServices
} from './services.js';

import {
  goalType,
  goalType_Type,
  taskType_Type,
  teamType
} from './models.js';

import {
  goalConnection,
  taskTypeConnection,
  goalTypeConnection,
  teamConnection
} from './connections.js';


function getViewerFields() {
  return {
	viewerId: { 
		type: GraphQLString, 
		resolve: (viewer) => viewer.id
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
	teams: {
		type: teamType,
		args: {businessId: {type: GraphQLString}},
		resolve: (_, args) => new teamServices().getTeams(args.businessId)
	},	
	teamsTestData: {
		type: teamType,
		resolve: () => new teamServices().getTeamsTestData()
	},
	//teamsConn is broken, displays arraySlice.slice is not a function
	teamsConn: {
		type: teamConnection,
		args: {businessId: {type: GraphQLString},...connectionArgs},
		resolve: (_, args) => connectionFromPromisedArray(new teamServices().getTeamsTestData(), args)
	}	
  }
};
export const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'Logged In User',
  fields: () => getViewerFields()
});
