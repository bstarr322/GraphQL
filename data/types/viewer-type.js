/**
 * viewer-type.js root for all queries available to viewer/user
 * The top level entity to model the various data served to the user can be named as viewer.
 * viewer as a root query field of the GraphQL schema enables us to provide data based on the current user.
 * Purpose of viewer root query field -> https://goo.gl/fxFexR 
 */

/**
 * Node Interface Feature study if it is still needed
 * https://facebook.github.io/relay/docs/graphql-object-identification.html#content
 * https://facebook.github.io/relay/graphql/objectidentification.htm
 */

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

// .net api models
import businessType from '../models/businessType.js';
import collectionTreeType from '../models/collectionTreeType.js';
import contentType from '../models/contentType.js';
import contentIdType from '../models/contentIdType.js';
import industryType from '../models/industryType.js';
import membershipType from '../models/membershipType.js'
import teamTreeType from '../models/teamTreeType.js';
import userIdType from '../models/userIdType.js';
// goal api models
import goalType from '../models/goalType.js';
import goalTypeType from '../models/goalTypeType.js';
import taskTypeType from '../models/taskTypeType.js';
import goalUserType from '../models/goalUserType.js';
// input types - model of requests
import contentInputType from '../models/inputTypes/contentInputType.js';
import goalInputType from '../models/inputTypes/goalInputType.js';
import goalTypeInputType from '../models/inputTypes/goalTypeInputType.js';
import taskInputType from '../models/inputTypes/taskInputType.js';
import taskTypeInputType from '../models/inputTypes/taskTypeInputType.js';
import teamInputType from '../models/inputTypes/teamInputType.js';
import userIdInputType from '../models/inputTypes/userIdInputType.js';

// services
import businessService from '../services/businessService.js'
import collectionService from '../services/collectionService.js'
import contentService from '../services/contentService.js'
import goalService from '../services/goalService.js'
import taskTypeService from '../services/taskTypeService.js'
import userService from '../services/userService.js'
import goalTypeService from '../services/goalTypeService.js'
import viewerService from '../services/viewerService.js'

import { goalConnection } from './connections.js';

export const viewerType = new GraphQLObjectType({
	name: 'Viewer',
	description: 'Logged In User, root for all queries available to viewer/user',
	fields: () => getViewerFields()
});

function getViewerFields() {
  return {
	viewerId: { 
		type: GraphQLString, 
		resolve: (viewer) => viewer.id
	},
	name: { type: GraphQLString },
	
	// goals services
	goalConnection: {
		type: goalConnection,
		args: {
			businessId: {type: GraphQLString},
			page: {type: GraphQLInt},
			size: {type: GraphQLInt},
			...connectionArgs
		},
		resolve: (_, args, req) => connectionFromPromisedArray(new goalService(getToken(req)).getGoals(args.businessId, args.page, args.size), args)
	},
	goal: {
		type: goalType,
		args: {goalId: {type: GraphQLString}},
		resolve: (_,args, req) => new goalService(getToken(req)).getGoal(args.goalId)
	},
	goalTypes: {
		type: new GraphQLList(goalTypeType),
		resolve: (_,args, req) => new goalTypeService(getToken(req)).getGoalTypes()
	},
	goalType: {
		type: goalTypeType,
		args: {goalTypeId: {type: GraphQLInt}},
		resolve: (_,args, req) => new goalTypeService(getToken(req)).goalType(goalTypeId)
	},
	goalTypeByTag: {
		type: goalTypeType,
		args: {tag: {type: GraphQLString}},
		resolve: (_,args, req) => new goalTypeService(getToken(req)).getGoalTypeByTag(args.tag)
	},
	taskTypes: {
		type: new GraphQLList(taskTypeType),
		resolve: (_,args, req) => new taskTypeService(getToken(req)).getTaskTypes()
	},
	taskType: {
		type: taskTypeType,
		args: {taskTypeId: {type: GraphQLInt}},
		resolve: (_,args, req) => new taskTypeService(getToken(req)).getTaskType(args.taskTypeId)
	},
	taskTypeByTag: {
		type: taskTypeType,
		args: {tag: {type: GraphQLString}},
		resolve: (_, args, req) => new taskTypeService(getToken(req)).getTaskTypeByTag(args.tag)
	},
	goalUsers: {
		type: new GraphQLList(goalUserType),
		args: {goalId: {type:GraphQLString}},
		resolve: (_,args, req) => new goalService(getToken(req)).getGoalUsers(args.goalId)
	},
	goalUser: {
		type: goalUserType,
		args: {
			goalId: {type:GraphQLString},
			userId: {type:GraphQLString}
		},
		resolve: (_,args, req) => new goalService(getToken(req)).getGoalUser(args.goalId, args.userId)
	},


	// user service
	userIdsByBusinessAndTeam: {
		type: new GraphQLList(userIdType),
		args: {businessId: {type: GraphQLString}, teamId: {type: GraphQLString}},
		resolve: (_,args, req) => new userService(getToken(req)).getUserIdsByBusinessAndTeam(args.businessId, args.teamId)
	},

	// content service
	contentsByBusinessId: {
		type: new GraphQLList(contentType),
		args: {businessId: {type: GraphQLString}},
		resolve: (_,args, req) => new contentService(getToken(req)).getContentsByBusiness(args.businessId)
	},
	contentIdsByBusinessIdAndCollectionId: {
		type: new GraphQLList(contentIdType),
		args: {businessId: {type: GraphQLString}, collectionId: {type: GraphQLString}},
		resolve: (_,args, req) => new contentService(getToken(req)).getContentByCollectionIdAndBusinessId(args.collectionId, args.businessId)
	},

	// collection service
	collectionsByBusinessId: {
		type: new GraphQLList(collectionTreeType),
		args: {businessId: {type: GraphQLString}},
		resolve: (_,args, req) => new collectionService(getToken(req)).getCollectionsInTreeFormByBusiness(args.businessId)
	},

	// business service
	businesses: {
		type: new GraphQLList(businessType),
		resolve: (_,args, req) => new businessService(getToken(req)).getGoalAssignableBusinesses()
	},
	industriesByBusinessId: {
		type: new GraphQLList(industryType),
		args: {businessId: {type: GraphQLString}},
		resolve: (_,args, req) => new businessService(getToken(req)).getIndustriesByBusiness(args.businessId)
	},
	membershipsByBusinessAndIndustry: {
		type: new GraphQLList(membershipType),
		args: {businessId: {type: GraphQLString}, industryId: {type: GraphQLString}},
		resolve: (_,args, req) => new businessService(getToken(req)).getMembershipsByBusinessAndIndustry(args.businessId, args.industryId)
	},
	teamsByBusinessId: {
		type: teamTreeType,
		args: {businessId: {type: GraphQLString}},
		resolve:  (_,args, req) => new businessService(getToken(req)).getTeamsInTreeFormByBusiness(args.businessId)
	},


  }
}

var getToken = function(request) {
	var token = extractAuthToken(request.headers);
	return generateAuthToken(token);
}

var extractAuthToken = function(headers) {
	//return headers.authorization;
	return 'nothing';
}

var generateAuthToken = function(token) {
	return { 'authorization' : token };
}