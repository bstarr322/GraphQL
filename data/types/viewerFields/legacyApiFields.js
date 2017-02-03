import {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean
} from 'graphql';

// .net api models
import businessType from '../../models/legacyApi/businessType.js';
import collectionTreeType from '../../models/legacyApi/collectionTreeType.js';
import contentType from '../../models/legacyApi/contentType.js';
import contentIdType from '../../models/legacyApi/contentIdType.js';
import industryType from '../../models/legacyApi/industryType.js';
import membershipType from '../../models/legacyApi/membershipType.js';
import legacyTeamTreeType from '../../models/legacyApi/teamTreeType.js';
import userType from '../../models/legacyApi/userType.js';

// legacy services
import businessService from '../../services/businessService.js';
import collectionService from '../../services/collectionService.js';
import contentService from '../../services/contentService.js';
import goalService from '../../services/goalService.js';
import taskTypeService from '../../services/taskTypeService.js';
import userService from '../../services/userService.js';
import goalTypeService from '../../services/goalTypeService.js';
import teamService from '../../services/teamService.js';
import viewerService from '../../services/viewerService.js';

// infrastructure
import httpParser from '../../utilities/httpParser.js'

export default {
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
	managedGoalBusinesses: {
		type: new GraphQLList(businessType),
		resolve: (_,args, req) => new businessService(httpParser(req)).getManagedGoalBusinesses()
	},
	myGoalBusinesses: {
		type: new GraphQLList(businessType),
		resolve: (_,args, req) => new businessService(httpParser(req)).getMyGoalBusinesses()
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
		type: legacyTeamTreeType,
		args: {businessId: {type: GraphQLString}},
		resolve:  (_,args, req) => new businessService(httpParser(req)).getTeamsInTreeFormByBusiness(args.businessId)
	},

	// team Service
	teamInformationByTeamIdAndBusinessId: {
		type: legacyTeamTreeType,
		args: {teamId: {type: GraphQLString}, businessId: {type: GraphQLString}},
		resolve:  (_,args, req) => new teamService(httpParser(req)).getTeamInformationByTeamIdAndBusinessId(args.teamId, args.businessId)
	},
}
