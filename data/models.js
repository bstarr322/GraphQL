import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLString
} from 'graphql';
import {
	nodeDefinitions,
	fromGlobalId,
	globalIdField
} from 'graphql-relay';
import {
	goalServices,
	taskTypeConnection,
	goalTypeConnection,
} from './services';


/*
  Register Types to node-interface (can be refactored)
  https://facebook.github.io/relay/docs/graphql-object-identification.html#content
  https://facebook.github.io/relay/graphql/objectidentification.htm
*/
const  { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    let { id, type } = fromGlobalId(globalId);
	if (type === 'GoalType')
      return new goalTypeConnection().getGoalType(id);
	else if (type === 'TaskType')
      return new taskTypeConnection().getTaskType(id);
	// else if (type === 'Goal')
      // return goalService.getGoalType(id);
    return null;
  },
  (obj) => {
	if (obj instanceof goalType)
      return goalType_Type;
	else if (obj instanceof taskType)
      return taskType_Type;
  	// else if (obj instanceof Goal)
      // return goalType;
    return null;
  }
);

function getGoalFields() {
  return {
    id: {type: GraphQLString},
	name: {type: GraphQLString},
	goalType: {type: GraphQLString},
	description: {type: GraphQLString},
	business: {type: GraphQLString},
  };
}
function getGoalTypeFields() {
  return {
    id: globalIdField('GoalType'),
    name: { type: GraphQLString },
	iconReference: { type: GraphQLString },
  };
}
function getTaskTypeFields() {
  return {
    id: globalIdField('TaskType'),
    name: { type: GraphQLString },
  };
}

export const goalType = new GraphQLObjectType({
  name: 'Goal',
  fields: getGoalFields(),
  // interfaces: () => [nodeInterface]
});
export const GoalInputType = new GraphQLInputObjectType ({
  name:'GoalInput',
  fields: getGoalFields()
});
export const goalType_Type = new GraphQLObjectType({
  name: 'GoalType',
  fields: getGoalTypeFields(),
  interfaces: () => [nodeInterface]
});
export const taskType_Type = new GraphQLObjectType({
  name: 'TaskType',
  fields: getTaskTypeFields(),
  interfaces: () => [nodeInterface]
});

