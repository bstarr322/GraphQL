import {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean
} from 'graphql';

import {
  connectionArgs,
  connectionFromPromisedArray,
} from 'graphql-relay';

// goal api models
import goalType from '../../models/goalsApi/goalType.js';
import goalTypeType from '../../models/goalsApi/goalTypeType.js';
import taskTypeType from '../../models/goalsApi/taskTypeType.js';
import goalUserType from '../../models/goalsApi/goalUserType.js';
import goalUsersType from '../../models/goalsApi/goalUsersType.js';
import goalsTeamTreeType from '../../models/goalsApi/teamTreeType.js';
import cpdAvailableYearsType from '../../models/goalsApi/cpdAvailableYearsType.js'; 
import cpdGoalSummaryType from '../../models/goalsApi/cpdGoalSummaryType.js';
import cpdGoalUsersType from '../../models/goalsApi/cpdGoalUsersType.js'; 
import cpdGoalUserType from '../../models/goalsApi/cpdGoalUserType.js'; 

import goalService from '../../services/goalService.js';
import taskTypeService from '../../services/taskTypeService.js';
import goalTypeService from '../../services/goalTypeService.js';

// infrastructure
import httpParser from '../../utilities/httpParser.js'

import { goalConnection } from '../connections.js';

export default {
	// goals services
	goalConnection: {
		type: goalConnection,
		args: {
			businessId: {type: GraphQLString},
			page: {type: GraphQLInt},
			size: {type: GraphQLInt},
			sortField:  {type: GraphQLString},
			sortDirection: {type: GraphQLString},
			prioritizeBusinessCritical: {type: GraphQLBoolean},
			goalType: {type: GraphQLInt},
			...connectionArgs
		},
		resolve: (_, args, req) => connectionFromPromisedArray(new goalService(httpParser(req)).getGoals(
			args.businessId, args.page, args.size, args.sortField,args.sortDirection, args.prioritizeBusinessCritical, args.goalType), args)
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
		args: {
			goalId: {type:GraphQLString},
			page: {type:GraphQLInt},
			size: {type:GraphQLInt},
			sortField: {type:GraphQLString},
			sortDirection: {type:GraphQLString}
		},
		resolve: (_,args, req) => new goalService(httpParser(req)).getGoalUsers(args.goalId, args.page, args.size, args.sortField, args.sortDirection)
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
			page: {type:GraphQLInt},
			size: {type:GraphQLInt},
			sortField:  {type: GraphQLString},
			sortDirection: {type: GraphQLString},
			prioritizeBusinessCritical: {type: GraphQLBoolean},
			goalType: {type: GraphQLInt}
		},
		resolve: (_,args, req) => new goalService(httpParser(req)).getMyGoals(
			args.businessId, args.page, args.size, args.sortField, args.sortDirection, args.prioritizeBusinessCritical, args.goalType)
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
			month: {type:GraphQLInt},
			sortField: {type:GraphQLInt},
			sortDirection: {type:GraphQLInt}
		},
		resolve: (_,args,req) => new goalService(httpParser(req)).getCpdGoalUsers(args.goalId, args.page, args.size, args.month, args.sortField, args.sortDirection)
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
	goalPercentages: {
		type: goalsTeamTreeType,
		args: {teamIds: {type: new GraphQLList(GraphQLString)}, goalId: {type: GraphQLString}, businessId: {type: GraphQLString}},
		resolve:  (_,args, req) => new goalService(httpParser(req)).getGoalPercentages(args.teamIds, args.goalId, args.businessId)
	},

};