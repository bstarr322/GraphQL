import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	GraphQLID
} from 'graphql';
import {
	nodeDefinitions,
	fromGlobalId,
	globalIdField,
	connectionFromUrls
} from 'graphql-relay';
import {
	goalServices,
	taskTypeServices,
	goalTypeServices,
	teamServices,
} from './services';

/*
  Register Types to node-interface (can be refactored)
  https://facebook.github.io/relay/docs/graphql-object-identification.html#content
  https://facebook.github.io/relay/graphql/objectidentification.htm
*/
export const  { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    let { id, type } = fromGlobalId(globalId);
	if (type === 'GoalType')
      return new goalTypeServices().getGoalType(id);
	else if (type === 'TaskType')
      return new taskTypeServices().getTaskType(id);
	else if (type === 'Goal')
      return new goalServices().getGoalType(id);
  	else if (type === 'Team')
      //getTeam(id) function does not exist yet, no end point to send request to
      return new teamServices().getTeam(id);
    return null;
  },
  (obj) => {
	if (obj instanceof goalType)
      return goalType_Type;
	else if (obj instanceof taskType)
      return taskType_Type;
  	else if (obj instanceof Goal)
      return goalType;
  	else if (obj instanceof Team)
      return teamType;
    return null;
  }
);

export function getGoalFields() {
  return {
    id: globalIdField('Goal'),
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
function getTeamFields() {
  return {
    id: globalIdField('GoalType', team => team.Id),
	//id: { type:new GraphQLNonNull(GraphQLID), resolve: team => team.Id },
    title: { type: GraphQLString, resolve: team => team.Title },
	parentId: { type: GraphQLString, resolve: team => team.ParentId },
	subGroups : { type: new GraphQLList(teamType), resolve: team => team.SubGroups  } 
  }
};

export const goalType = new GraphQLObjectType({
  name: 'Goal',
  fields: () => getGoalFields(),
  interfaces: () => [nodeInterface]
});
export const goalInputType = new GraphQLInputObjectType ({
  name:'GoalInput',
  fields: getGoalFields()
});
export const goalType_Type = new GraphQLObjectType({
  name: 'GoalType',
  fields: () => getGoalTypeFields(),
  interfaces: () => [nodeInterface]
});
export const taskType_Type = new GraphQLObjectType({
  name: 'TaskType',
  fields: () => getTaskTypeFields(),
  interfaces: () => [nodeInterface]
});
export const teamType = new GraphQLObjectType({
  name: 'Team',
  fields: () => getTeamFields(),
  interfaces: () => [nodeInterface]
});


