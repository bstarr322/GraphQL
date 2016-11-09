import {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID
} from 'graphql';

import {
  connectionArgs,
  connectionFromPromisedArray,
} from 'graphql-relay';

// services
import businessService from './services/businessService.js'
import goalService from './services/goalService.js'
import taskTypeService from './services/taskTypeService.js'
import goalTypeService from './services/goalTypeService.js'
import viewerService from './services/viewerService.js'

/*
  Study Node Interface Feature if it is still needed
  https://facebook.github.io/relay/docs/graphql-object-identification.html#content
  https://facebook.github.io/relay/graphql/objectidentification.htm
*/

/*
	Models
 */
// .net api models
import businessType from './models/businessType.js';
import collectionTreeType from './models/collectionTreeType.js';
import contentType from './models/contentType.js';
import industryType from './models/industryType.js';
import membershipType from './models/membershipType.js'
import teamTreeType from './models/teamTreeType.js';
import userIdType from './models/userIdType.js';
// goal api models
import goalType from './models/goalType.js';
import goalTypeType from './models/goalTypeType.js';
import taskTypeType from './models/taskTypeType.js';
// input types - model of requests
import contentInputType from './models/inputTypes/contentInputType.js';
import goalInputType from './models/inputTypes/goalInputType.js';
import goalTypeInputType from './models/inputTypes/goalTypeInputType.js';
import taskInputType from './models/inputTypes/taskInputType.js';
import taskTypeInputType from './models/inputTypes/taskTypeInputType.js';
import teamInputType from './models/inputTypes/teamInputType.js';
import userIdInputType from './models/inputTypes/userIdInputType.js';

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
		type: new GraphQLList(goalTypeType),
		resolve: function (_,args) { 
			var g = goalTypeService.getGoalTypes();
			console.log(g);
			return g;
		}
	},
	goalTypeById: {
		type: goalTypeType,
		args: {goalTypeId: {type: GraphQLInt}},
		resolve: (_,args) => goalTypeService.getGoalTypes()
	},
	goalTypeByTag: {
		type: goalTypeType,
		args: {tag: {type: GraphQLString}},
		resolve: (_,args) => goalTypeService.getGoalTypeByTag(args.tag)
	},
	taskTypes: {
		type: new GraphQLList(taskTypeType),
		resolve: (_,args) => taskTypeService.getTaskTypes()
	},
	taskType: {
		type: taskTypeType,
		args: {taskTypeId: {type: GraphQLInt}},
		resolve: (_,args) => goalTaskTypeService.getTaskType(args.taskTypeId)
	},
	taskTypeByTag: {
		type: taskTypeType,
		args: {tag: {type: GraphQLString}},
		resolve: (_,args) => taskTypeService.getTaskTypeByTag(args.tag)
	},

	// business services
	businesses: {
		type: new GraphQLList(businessType),
		resolve: (_, args) => businessService.getGoalAssignableBusinesses()
	},
	industriesByBusinessId: {
		type: new GraphQLList(industryType),
		args: {businessId: {type: GraphQLString}},
		resolve: (_, args) => businessService.getIndustriesByBusiness(args.businessId)
	},
	membershipsByBusinessAndIndustry: {
		type: new GraphQLList(membershipType),
		args: {businessId: {type: GraphQLString}, industryId: {type: GraphQLString}},
		resolve: (_, args) => businessService.getMembershipsByBusinessAndIndustry(args.businessId, args.industryId)
	},
	userIdsByBusinessAndTeam: {
		type: new GraphQLList(userIdType),
		args: {businessId: {type: GraphQLString}, teamId: {type: GraphQLString}},
		resolve: (_, args) => businessService.getUserIdsByBusinessAndTeam(args.businessId, args.teamId)
	},
	teamsByBusinessId: {
		type: teamTreeType,
		args: {businessId: {type: GraphQLString}},
		resolve: (_,args) => businessService.getTeamsInTreeFormByBusiness(args.businessId)
	},
	collectionsByBusinessId: {
		type: new GraphQLList(collectionTreeType),
		args: {businessId: {type: GraphQLString}},
		resolve: (_, args) => businessService.getCollectionsInTreeFormByBusiness(args.businessId)
	},
	contentsByBusinessId: {
		type: new GraphQLList(contentType),
		args: {businessId: {type: GraphQLString},...connectionArgs},
		resolve: (_, args) => businessService.getContentsByBusiness(args.businessId)
	},
  }
};
export const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'Logged In User',
  fields: () => getViewerFields()
});
