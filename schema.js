var graphql = require('graphql');

var services = require('./services.js');
var goalService = new services.Goals();


/***** COMMON PROPERTIES OF QUERIES AND MUTATIONS *****/
function getGoalFields() {
  return {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  };
}
/***** QUERIES ****/
// Define the Goal type with two string fields: `id` and `name`.
// The type of Goal is GraphQLObjectType, which has child fields
// with their own types (in this case, GraphQLString).
const goalType = new graphql.GraphQLObjectType({
  name: 'Goal',
  fields: getGoalFields()
});

// All lists must be defined as fields of this list object.
// This is because I could not figure out how to use lists as a direct child of query in relay.
const listsType = new graphql.GraphQLObjectType({
  name: 'Lists',
  fields: {
    goals: { 
      type: new graphql.GraphQLList(goalType),
      resolve: function (_, args) {
        return goalService.getGoals();
      } 
    }
  }
});

// Root query type all queryable objects must be added as fields here.
const queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      lists: {type: listsType, resolve: function (_, args) { return {}; }},
      goal: {
        type: goalType,
        // `args` describes the arguments that the `goal` query accepts
        args: {
          id: { type: graphql.GraphQLString }
        },
        // The resolve function describes how to "resolve" or fulfill
        // the incoming query.
        // In this case we use the `id` argument from above as a key
        // to get the User from `data`
        resolve: function (_, args) {
          return goalService.getGoal(args.id);
        }
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
