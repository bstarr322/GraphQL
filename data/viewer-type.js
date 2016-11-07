import {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList
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
  //businessServices
} from './services.js';

import {
	businessService
} from './services/businessService.js'

import {
  goalType,
  goalType_Type,
  taskType_Type,
  teamTreeType,
  contentType,
  collectionType,
  businessType
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
	goalTypes: {
		type: new GraphQLList(goalType_Type),
		resolve: (_,args) => new goalTypeServices().getGoalTypes()
	},
	goalType: {
		type: goalType_Type,
		args: {goalTypeId: {type: GraphQLInt}},
		resolve: (_,args) => new goalTypeServices().getGoalTypes()
	},
	goalTypeByTag: {
		type: goalType_Type,
		args: {tag: {type: GraphQLString}},
		resolve: (_,args) => new goalTypeServices().getGoalTypeByTag(args.tag)
	},
	taskTypes: {
		type: new GraphQLList(taskType_Type),
		resolve: (_,args) => new taskTypeServices().getTaskTypes()
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
	teams: {
		type: teamTreeType,
		args: {businessId: {type: GraphQLString}},
		resolve: (_,args) => new businessService().getTeamsInTreeFormByBusiness(args.businessId)
	},
	contents: {
		type: new GraphQLList(contentType),
		args: {businessId: {type: GraphQLString},...connectionArgs},
		resolve: (_, args) => new businessService.getContentsByBusiness(args.businessId)
	},
	collections: {
		type: new GraphQLList(collectionType),
		args: {businessId: {type: GraphQLString}},
		resolve: (_, args) => new businessService.getCollectionsInTreeFormByBusiness(args.businessId)
	},
	businesses: {
		type: new GraphQLList(businessType),
		resolve: (_, args) => new businessService.getGoalAssignableBusinesses()
	},	
  }
};
export const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'Logged In User',
  fields: () => getViewerFields()
});
