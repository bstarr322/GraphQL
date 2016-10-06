var graphql = require('graphql');

/***** COMMON PROPERTIES OF QUERIES AND MUTATIONS *****/
function getGoalFields() {
  return {
    goalId: { 
		type: graphql.GraphQLString,
		resolve: (goalType) => goalType.id 
	},
    name: { type: graphql.GraphQLString },
  };
}
function getGoalTypeFields() {
  return {
    goalTypeId: { 
		type: graphql.GraphQLString, 
		resolve: (goalType) => goalType.id
	},
    name: { type: graphql.GraphQLString },
	iconReference: { type: graphql.GraphQLString },
  };
}
function getTaskTypeFields() {
  return {
    taskTypeId: { 
		type: graphql.GraphQLString,
		resolve: (taskType) => taskType.id
	},
    name: { type: graphql.GraphQLString },
  };
}
/***** MODELS ****/
const goalType = new graphql.GraphQLObjectType({
  name: 'Goal',
  fields: getGoalFields()
});
const goalType_Type = new graphql.GraphQLObjectType({
  name: 'GoalType',
  fields: getGoalTypeFields()
});
const taskType_Type = new graphql.GraphQLObjectType({
  name: 'TaskType',
  fields: getTaskTypeFields()
});

exports.goalType = goalType;
exports.goalType_Type = goalType_Type;
exports.taskType_Type = taskType_Type;
