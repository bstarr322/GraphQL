import {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
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
  teamTreeType,
  contentType,
  collectionTreeType,
  businessType,
  industryType,
  userIdType,
  membershipType
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

/*
 * Query aliases must be unique, cannot overload
 */
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
	goalTypeById: {
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
	teamsByBusinessId: {
		type: teamTreeType,
		args: {businessId: {type: GraphQLString}},
		resolve: (_,args) => new businessServices().getTeamsInTreeFormByBusiness(args.businessId)
	},
	contentsByBusinessId: {
		type: new GraphQLList(contentType),
		args: {businessId: {type: GraphQLString},...connectionArgs},
		resolve: (_, args) => new businessServices().getContentsByBusiness(args.businessId)
	},
	collectionsByBusinessId: {
		type: new GraphQLList(collectionTreeType),
		args: {businessId: {type: GraphQLString}},
		resolve: (_, args) => new businessServices().getCollectionsInTreeFormByBusiness(args.businessId)
	},
	businesses: {
		type: new GraphQLList(businessType),
		resolve: (_, args) => new businessServices().getGoalAssignableBusinesses()
	},
	industriesByBusinessId: {
		type: new GraphQLList(industryType),
		args: {businessId: {type: GraphQLString}},
		resolve: (_, args) => new businessServices().getScopedBusinessIndustrySummariesByBusiness(args.businessId)
	},
	userIdsByBusinessAndTeam: {
		type: userIdType,
		args: {businessId: {type: GraphQLString}, teamId: {type: GraphQLString}},
		resolve: (_, args) => new businessServices().getUserIdsByBusinessAndTeam(args.businessId,args.teamId)
	},
	industryMembershipsByBusiness: {
		type: new GraphQLList(membershipType),
		args: {businessId: {type: GraphQLString}, industryId: {type: GraphQLString}},
		resolve: (_, args) => new businessServices().getIndustryMembershipsByBusiness(args.businessId, args.industryId)
	},
  }
};
export const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'Logged In User',
  fields: () => getViewerFields()
});
