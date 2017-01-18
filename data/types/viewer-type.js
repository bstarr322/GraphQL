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
import businessType from '../models/legacyApi/businessType.js';
import collectionTreeType from '../models/legacyApi/collectionTreeType.js';
import contentType from '../models/legacyApi/contentType.js';
import contentIdType from '../models/legacyApi/contentIdType.js';
import industryType from '../models/legacyApi/industryType.js';
import membershipType from '../models/legacyApi/membershipType.js';
import teamTreeType from '../models/legacyApi/teamTreeType.js';
import userType from '../models/legacyApi/userType.js';
// goal api models
import goalType from '../models/goalsApi/goalType.js';
import goalTypeType from '../models/goalsApi/goalTypeType.js';
import taskTypeType from '../models/goalsApi/taskTypeType.js';
import goalUserType from '../models/goalsApi/goalUserType.js';
import goalUsersType from '../models/goalsApi/goalUsersType.js';
import cpdAvailableYearsType from '../models/goalsApi/cpdAvailableYearsType.js'; 
import cpdGoalSummaryType from '../models/goalsApi/cpdGoalSummaryType.js';
import cpdGoalUsersType from '../models/goalsApi/cpdGoalUsersType.js'; 
import cpdGoalUserType from '../models/goalsApi/cpdGoalUserType.js'; 

// legacy services
import businessService from '../services/businessService.js';
import collectionService from '../services/collectionService.js';
import contentService from '../services/contentService.js';
import goalService from '../services/goalService.js';
import taskTypeService from '../services/taskTypeService.js';
import userService from '../services/userService.js';
import goalTypeService from '../services/goalTypeService.js';
import teamService from '../services/teamService.js';
import viewerService from '../services/viewerService.js';

// infrastructure
import httpParser from '../utilities/httpParser.js'

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
		resolve: (_, args, req) => connectionFromPromisedArray(new goalService(httpParser(req)).getGoals(args.businessId, args.page, args.size), args)
	},
	goal: {
		type: goalType,
		args: {goalId: {type: GraphQLString}},
		resolve: (_,args, req) => new goalService(httpParser(req)).getGoal(args.goalId)
	},
	goalTypes: {
		type: new GraphQLList(goalTypeType),
		resolve: (_,args, req) => new goalTypeService(httpParser(req)).getGoalTypes()
	},
	goalType: {
		type: goalTypeType,
		args: {goalTypeId: {type: GraphQLInt}},
		resolve: (_,args, req) => new goalTypeService(httpParser(req)).goalType(goalTypeId)
	},
	goalTypeByTag: {
		type: goalTypeType,
		args: {tag: {type: GraphQLString}},
		resolve: (_,args, req) => new goalTypeService(httpParser(req)).getGoalTypeByTag(args.tag)
	},
	taskTypes: {
		type: new GraphQLList(taskTypeType),
		resolve: (_,args, req) => new taskTypeService(httpParser(req)).getTaskTypes()
	},
	taskType: {
		type: taskTypeType,
		args: {taskTypeId: {type: GraphQLInt}},
		resolve: (_,args, req) => new taskTypeService(httpParser(req)).getTaskType(args.taskTypeId)
	},
	taskTypeByTag: {
		type: taskTypeType,
		args: {tag: {type: GraphQLString}},
		resolve: (_, args, req) => new taskTypeService(httpParser(req)).getTaskTypeByTag(args.tag)
	},
	goalUsers: {
		type: new GraphQLList(goalUsersType),
		args: {goalId: {type:GraphQLString}},
		resolve: (_,args, req) => new goalService(httpParser(req)).getGoalUsers(args.goalId)
	},
	goalUser: {
		type: goalUserType,
		args: {
			goalId: {type:GraphQLString},
			userId: {type:GraphQLString}
		},
		resolve: (_,args, req) => new goalService(httpParser(req)).getGoalUser(args.goalId, args.userId)
	},
	myGoals: {
		type: new GraphQLList(goalType),
		args: {
			businessId: {type:GraphQLString},
			userId: {type:GraphQLString},
			page: {type:GraphQLInt},
			size: {type:GraphQLInt}
		},
		resolve: (_,args, req) => new goalService(httpParser(req)).getMyGoals(args.businessId, args.userId, args.page, args.size)
	},
	cpdAvailableYears: {
		type: new GraphQLList(cpdAvailableYearsType),
		args: {
			goalId: {type:GraphQLString},
			userId: {type:GraphQLString}
		},
		resolve: (_,args,req) => new goalService(httpParser(req)).getCpdAvailableYears(args.goalId, args.userId)
	},
	cpdGoalSummary: {
		type: cpdGoalSummaryType,
		args: { goalId: {type:GraphQLString} },
		resolve: (_,args,req) => new goalService(httpParser(req)).getCpdGoalSummary(args.goalId)
	},
	cpdGoalUsers: {
		type: new GraphQLList(cpdGoalUsersType),
		args: {
			goalId: {type:GraphQLString},
			page: {type:GraphQLInt},
			size: {type:GraphQLInt},
			month: {type:GraphQLInt}
		},
		resolve: (_,args,req) => new goalService(httpParser(req)).getCpdGoalUsers(args.goalId, args.page, args.size, args.month)
	},
	cpdGoalUser: {
		type: cpdGoalUserType,
		args: {
			goalId: {type:GraphQLString},
			userId: {type:GraphQLString},
			year: {type:GraphQLInt}
		},
		resolve: (_,args,req) => new goalService(httpParser(req)).getCpdGoalUser(args.goalId,args.userId,args.year)
	},


	// user service
	userByBusinessAndTeam: {
		type: new GraphQLList(userType),
		args: {businessId: {type: GraphQLString}, teamId: {type: GraphQLString}},
		resolve: (_,args, req) => new userService(httpParser(req)).getUserByBusinessAndTeam(args.businessId, args.teamId)
	},

	// content service
	contentsByBusinessId: {
		type: new GraphQLList(contentType),
		args: {businessId: {type: GraphQLString}},
		resolve: (_,args, req) => new contentService(httpParser(req)).getContentsByBusiness(args.businessId)
	},
	contentIdsByBusinessIdAndCollectionId: {
		type: new GraphQLList(contentIdType),
		args: {businessId: {type: GraphQLString}, collectionId: {type: GraphQLString}},
		resolve: (_,args, req) => new contentService(httpParser(req)).getContentByCollectionIdAndBusinessId(args.collectionId, args.businessId)
	},
	contentSummaryByBusinessAndContentId: {
		type: new GraphQLList(contentType),
		args: {businessId: {type: GraphQLString}, contentIds: {type: new GraphQLList(GraphQLString)}},
		resolve: (_,args, req) => { 
			var promiseArr = [];	
			args.contentIds.forEach(contentId => {
				var promise = new contentService(httpParser(req)).getContentSummaryByBusinessAndContentId(contentId, args.businessId); 
				promiseArr.push(promise)
			});
			return Promise.all(promiseArr).then(data => {
				return data;
			})
		}
	},

	// collection service
	collectionsByBusinessId: {
		type: new GraphQLList(collectionTreeType),
		args: {businessId: {type: GraphQLString}},
		resolve: (_,args, req) => new collectionService(httpParser(req)).getCollectionsInTreeFormByBusiness(args.businessId)
	},

	// business service
	businesses: {
		type: new GraphQLList(businessType),
		resolve: (_,args, req) => new businessService(httpParser(req)).getGoalAssignableBusinesses()
	},
	industriesByBusinessId: {
		type: new GraphQLList(industryType),
		args: {businessId: {type: GraphQLString}},
		resolve: (_,args, req) => new businessService(httpParser(req)).getIndustriesByBusiness(args.businessId)
	},
	membershipsByBusinessAndIndustry: {
		type: new GraphQLList(membershipType),
		args: {businessId: {type: GraphQLString}, industryId: {type: GraphQLString}},
		resolve: (_,args, req) => new businessService(httpParser(req)).getMembershipsByBusinessAndIndustry(args.businessId, args.industryId)
	},
	teamsByBusinessId: {
		type: teamTreeType,
		args: {businessId: {type: GraphQLString}},
		resolve:  (_,args, req) => new businessService(httpParser(req)).getTeamsInTreeFormByBusiness(args.businessId)
	},

	// team Service
	teamInformationByTeamIdAndBusinessId: {
		type: teamTreeType,
		args: {teamId: {type: GraphQLString}, businessId: {type: GraphQLString}},
		resolve:  (_,args, req) => new teamService(httpParser(req)).getTeamInformationByTeamIdAndBusinessId(args.teamId, args.businessId)
	},

  }
}
