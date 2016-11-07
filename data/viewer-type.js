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

// services
import { businessService } from './services/businessService.js'
import { goalService } from './services/goalService.js'
import { goalTaskTypeService } from './services/goalTaskTypeService.js'
import { goalTypeService } from './services/goalTypeService.js'
import { viewerService } from './services/viewerService.js'

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
		resolve: (_,args) => new goalTypeService().getGoalTypes()
	},
	goalTypeById: {
		type: goalType_Type,
		args: {goalTypeId: {type: GraphQLInt}},
		resolve: (_,args) => new goalTypeService().getGoalTypes()
	},
	goalTypeByTag: {
		type: goalType_Type,
		args: {tag: {type: GraphQLString}},
		resolve: (_,args) => new goalTypeService().getGoalTypeByTag(args.tag)
	},
	taskTypes: {
		type: new GraphQLList(taskType_Type),
		resolve: (_,args) => new taskTypeService().getTaskTypes()
	},
	taskType: {
		type: taskType_Type,
		args: {taskTypeId: {type: GraphQLInt}},
		resolve: (_,args) => new taskTypeService().getTaskType(args.taskTypeId)
	},
	taskTypeByTag: {
		type: taskType_Type,
		args: {tag: {type: GraphQLString}},
		resolve: (_,args) => new taskTypeService().getTaskTypeByTag(args.tag)
	},

	// business services
	businesses: {
		type: new GraphQLList(businessType),
		resolve: (_, args) => new businessService().getGoalAssignableBusinesses()
	},
	industriesByBusinessId: {
		type: new GraphQLList(industryType),
		args: {businessId: {type: GraphQLString}},
		resolve: (_, args) => new businessService().getIndustriesByBusiness(args.businessId)
	},
	membershipsByBusinessAndIndustry: {
		type: new GraphQLList(membershipType),
		args: {businessId: {type: GraphQLString}, industryId: {type: GraphQLString}},
		resolve: (_, args) => new businessService().getMembershipsByBusinessAndIndustry(args.businessId, args.industryId)
	},
	userIdsByBusinessAndTeam: {
		type: new GraphQLList(GraphQLID),
		args: {businessId: {type: GraphQLString}, teamId: {type: GraphQLString}},
		resolve: (_, args) => new businessService().getMembershipsByBusinessAndIndustry(args.businessId, args.teamId)
	},
	teamsByBusinessId: {
		type: teamTreeType,
		args: {businessId: {type: GraphQLString}},
		resolve: (_,args) => new businessService().getTeamsInTreeFormByBusiness(args.businessId)
	},
	collectionsByBusinessId: {
		type: new GraphQLList(collectionTreeType),
		args: {businessId: {type: GraphQLString}},
		resolve: (_, args) => new businessService().getCollectionsInTreeFormByBusiness(args.businessId)
	},
	contentsByBusinessId: {
		type: new GraphQLList(contentType),
		args: {businessId: {type: GraphQLString},...connectionArgs},
		resolve: (_, args) => new businessService().getContentsByBusiness(args.businessId)
	},
  }
};
export const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'Logged In User',
  fields: () => getViewerFields()
});
