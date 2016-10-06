var graphql = require('graphql');
var graphqlrelay = require('graphql-relay');
var model = require('./models');
var connection = require('./connections');

var services = require('./services.js');
var goalService = new services.Goals();
	
//Viewer Layer
//Viewer Fields can  be refactored in the future
//Categorize by module
const viewerType = new graphql.GraphQLObjectType({
	name: 'Viewer',
	description: 'Logged In User',
	fields: () => ({
		viewerId: { 
			type: graphql.GraphQLString, 
			resolve: (viewerType) => viewerType.id
		},
		name: { type: graphql.GraphQLString },
		goalsConn: {
			type: connection.goalConnection,
			args: graphqlrelay.connectionArgs,
			resolve: (_, args) => graphqlrelay.connectionFromPromisedArray(goalService.getGoals(), args)
		},
		goalTypesConn: {
			type: connection.goalTypeConnection,
			args: graphqlrelay.connectionArgs,
			resolve: (_, args) => graphqlrelay.connectionFromPromisedArray(goalService.getGoalTypes(), args)
		},
		goalType: {
			type: model.goalType_Type,
			args: {goalTypeId: {type: graphql.GraphQLInt}},
			resolve: (_,args) => goalService.getGoalType(args.goalTypeId)
		},
		taskTypesConn: {
			type: connection.taskTypeConnection,
			args: graphqlrelay.connectionArgs,
			resolve: (_, args) => graphqlrelay.connectionFromPromisedArray(goalService.getTaskTypes(), args)
		},
		taskType: {
			type: model.taskType_Type,
			args: {taskTypeId: {type: graphql.GraphQLInt}},
			resolve: (_,args) => goalService.getTaskType(args.taskTypeId)
		}
	}),
});

// Root query type all queryable objects must be added as fields here.
const queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
		viewer: {
			type: viewerType,
			args: {viewerId: {type: graphql.GraphQLInt}},
			resolve: (_,args) => goalService.getViewer(args.viewerId)
		}
	}
});

/***** MUTATIONS ****/
const goalInputType = new graphql.GraphQLInputObjectType({
  name: 'GoalInput',
  fields: { clientMutationId: { type: graphql.GraphQLString }, name: { type: graphql.GraphQLString } }
});
const goalInputPayloadType = new graphql.GraphQLObjectType({
  name: 'GoalInputPayload',
  fields: { clientMutationId: { type: graphql.GraphQLString }, name: { type: graphql.GraphQLString } }
});
// Root type for all mutations.
const mutationType = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createGoal: {
      type: goalInputPayloadType,
      args: {
        input: { type: goalInputType }
      },      
      resolve: function(_, args) {
        goalService.createGoal(args.input);
        return { clientMutationId: args.input.clientMutationId, name: args.input.name };
      }
    }
  }
});

// Root query object.
const schema = new graphql.GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

exports.schema = schema;
