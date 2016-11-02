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
  teamServices,
  contentServices,
  collectionServices,
  businessServices
} from './services.js';

import {
  goalType,
  goalType_Type,
  taskType_Type,
  teamType,
  contentType
} from './models.js';

import {
  goalConnection,
  taskTypeConnection,
  goalTypeConnection,
  teamConnection,
  contentConnection,
  collectionConnection,
  businessConnection
} from './connections.js';


function getViewerFields() {
  return {
	viewerId: { 
		type: GraphQLString, 
		resolve: (viewer) => viewer.id
	},
	name: { type: GraphQLString },
	// goalsConn: {
		// type: goalConnection,
		// args: {business: {type: GraphQLString},...connectionArgs},
		// resolve: (_, args) => connectionFromPromisedArray(new goalServices().getGoals(args.business), args)
	// },
	// goal: {
		// type: goalType,
		// args: {goalId:{type: GraphQLInt}},
		// resolve: (_,args) => new goalServices().getGoal(args.goalId)			
	// },
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
	goalTypeByTag: {
		type: goalType_Type,
		args: {tag: {type: GraphQLString}},
		resolve: (_,args) => new goalTypeServices().getGoalTypeByTag(args.tag)
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
	taskTypeByTag: {
		type: taskType_Type,
		args: {tag: {type: GraphQLString}},
		resolve: (_,args) => new taskTypeServices().getTaskTypeByTag(args.tag)
	},
	teamsConn: {
		type: teamConnection,
		args: {businessId: {type: GraphQLString},...connectionArgs},
		resolve: (_, args) => connectionFromPromisedArray(new teamServices().getTeams(args.businessId), args)
	},
	contentsConn: {
		type: contentConnection,
		args: {businessId: {type: GraphQLString},...connectionArgs},
		resolve: (_, args) => connectionFromPromisedArray(new contentServices().getContents(args.businessId), args)
	},
	collectionsConn: {
		type: collectionConnection,
		args: {businessId: {type: GraphQLString},...connectionArgs},
		resolve: (_, args) => connectionFromPromisedArray(new collectionServices().getCollections(args.businessId), args)
	},
	businessesConn: {
		type: businessConnection,
		args: connectionArgs,
		resolve: (_, args) => connectionFromPromisedArray(new businessServices().getBusinesses(), args)
	}
  }
};
export const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'Logged In User',
  fields: () => getViewerFields()
});
