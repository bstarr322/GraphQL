import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLBoolean,
	GraphQLList,
	GraphQLInt,
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
	contentServices,
	collectionServices,
	businessServices
} from './services';

/*
  Register Types to node-interface (can be refactored)
  https://facebook.github.io/relay/docs/graphql-object-identification.html#content
  https://facebook.github.io/relay/graphql/objectidentification.htm
*/
export const  { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    let { id, type } = fromGlobalId(globalId);
	if (type === 'Goal')
    return new goalTypeServices().getGoal(id);
	else if (type === 'GoalType')
    return new goalTypeServices().getGoalType(id);
	else if (type === 'TaskType')
    return new taskTypeServices().getTaskType(id);
	else if (type === 'Team')
    return new teamServices().getTeams(id);
	else if (type === 'Content')
    return new contentServices().getContents(id);
	else if (type === 'Collection')
    return new collectionServices().getCollections(id);
	else if (type === 'Business')
    return new businessServices().getBusinesses(id);
  return null;
  },
  (obj) => {
	if (obj instanceof Goal)
      return goalType;
	else if (obj instanceof GoalType)
      return goalType_Type;
	else if (obj instanceof TaskType)
      return taskType_Type;
	else if (obj instanceof Team)
    return teamType;
	else if (obj instanceof Content)
    return contentType;
	else if (obj instanceof Collection)
    return collectionType;
	else if (obj instanceof Business)
    return businessType;
  return null;
  }
);


/*
  .net graphqlobjecttype -> refactor
*/
export const businessType = new GraphQLObjectType({
  name: 'Business',
  fields: function() { return {
    id: globalIdField('Business', business => business.Id),
    name: { type: GraphQLString, resolve: business => business.Name },
    image: { type: GraphQLString, resolve: business => business.Image },
  }},
  interfaces: () => [nodeInterface]
});

export const industryType = new GraphQLObjectType({
  name: 'Industry',
  fields: function() { return {
    id: globalIdField('Industry', industry => industry.Id),
    name: { type: GraphQLString, resolve: industry => industry.Name },
  }},
  interfaces: () => [nodeInterface]
});

export const membershipType = new GraphQLObjectType({
  name: 'Membership',
  fields: function() { return {
    id: globalIdField('Membership', membership => membership.Id),
    name: { type: GraphQLString, resolve: membership => membership.Name },
  }},
  interfaces: () => [nodeInterface]
});

export const teamTreeType = new GraphQLObjectType({
  name: 'TeamTree',
  fields: function() { return {
    id: globalIdField('TeamTree', team => team.Id),
    title: { type: GraphQLString, resolve: team => team.Title },
    parentNodeId: { type: GraphQLString, resolve: team => team.ParentNodeId },
    childrenNodes : { type: new GraphQLList(teamTreeType), resolve: team => team.ChildrenNodes  } 
  }},
  interfaces: () => [nodeInterface]
});

export const collectionTreeType = new GraphQLObjectType({
  name: 'CollectionTree',
  fields: function() { return {
    id: globalIdField('CollectionTree', collection => collection.Id),
    title: { type: GraphQLString, resolve: collection => collection.Title },
    parentNodeId: { type: GraphQLString, resolve: collection => collection.ParentNodeId },
    childrenNodes : { type: new GraphQLList(collectionTreeType), resolve: collection => collection.ChildrenNodes },
    image: { type: GraphQLString, resolve: collection => collection.Image },
    childrenNodes: { type: new GraphQLList(collectionType), resolve: collection => collection.ChildrenNodes } 
  }},
  interfaces: () => [nodeInterface]
});

export const contentType = new GraphQLObjectType({
  name: 'Content',
  fields: function () { return {
    id: globalIdField('Content', content => content.Id),
      name: { type: GraphQLString, resolve: content => content.Name },
    type: { type: GraphQLString, resolve: content => content.Type },
    typeId: { type: GraphQLString, resolve: content => content.TypeId }
  }},
  interfaces: () => [nodeInterface]
});

/*
  .net graphqlobjecttype -> refactor ends here
*/

export function getGoalFields() {
  return {
    id: globalIdField('Goal'),
	//id: {type: new GraphQLNonNull(GraphQLID)},
	name: {type: GraphQLString},
	// goalType: {type: GraphQLString},
	description: {type: GraphQLString},
	businessId: {type: GraphQLString},
	isBusinessCritical: {type: GraphQLBoolean},
	isSequential: {type: GraphQLBoolean},
	startDate: {type: GraphQLString},
	/*still do not know how to enable object inputting*/
	//tasks: {type: new GraphQLList(taskType) },
	//teams: {type: new GraphQLList(teamType)}
  };
}

export function getGoalInputFields() {
  return {
    //id: globalIdField('Goal'),
	//id: {type: new GraphQLNonNull(GraphQLID)},
	name: {type: GraphQLString},
	goalType: {type: goalType_InputType},
	description: {type: GraphQLString},
	businessId: {type: GraphQLString},
	isBusinessCritical: {type: GraphQLBoolean},
	isSequential: {type: GraphQLBoolean},
	startDate: {type: GraphQLString},
	/*still do not know how to enable object inputting*/
	tasks: {type: new GraphQLList(taskInputType) },
	teams: {type: new GraphQLList(teamInputType)}
  };
}

// export const goalType = new GraphQLObjectType({
  // name: 'Goal',
  // fields: () => getGoalFields(),
// });

export const goalInputType = new GraphQLInputObjectType ({
  name:'GoalInput',
  fields: () => getGoalInputFields()
});

export const goalType_Type = new GraphQLObjectType({
  name: 'GoalType',
  fields: function() { return {
      id: globalIdField('GoalType'),
      name: { type: GraphQLString },
      iconReference: { type: GraphQLString },
      tag: { type: GraphQLString },
  }},
  interfaces: () => [nodeInterface]
});

export const goalType_InputType = new GraphQLInputObjectType({
  name: 'GoalTypeInput',
  fields: { id: { type: GraphQLInt } }
});

export const taskInputType = new GraphQLInputObjectType({
  name: 'TaskInput',
  fields: function() { return {
	//id: {type: new GraphQLNonNull(GraphQLID)},
	taskType: {type: taskType_InputType },
	instruction: { type: GraphQLString },
	order: { type: GraphQLInt },
	daysToComplete: { type: GraphQLInt },
	content: { type: contentInputType }
  }}
});

export const taskType_Type = new GraphQLObjectType({
  name: 'TaskType',
  fields: function() { return {
	  id: globalIdField('TaskType'),
      name: { type: GraphQLString },
	  tag: { type: GraphQLString },
  }},
  interfaces: () => [nodeInterface]
});
export const taskType_InputType = new GraphQLInputObjectType({
  name: 'TaskTypeInput',
  fields: function() { return {
	  id: { type: GraphQLInt }
  }}
});

export const teamInputType = new GraphQLInputObjectType({
  name: 'TeamInput',
  fields: function () { return {
	  id: { type: GraphQLString },
	  users: { type: new GraphQLList(userInputType)}
  }}
});

export const userInputType = new GraphQLInputObjectType({
  name: 'User',
  fields: function () { return {
	  id: { type: GraphQLString }
  }}
});

export const contentInputType = new GraphQLInputObjectType({
  name: 'ContentInput',
  fields: function() { return { contentId: {type: GraphQLString }}}
});

export const collectionType = new GraphQLObjectType({
  name: 'Collection',
  fields: function() { return {
      id: globalIdField('Collection', collection => collection.Id),
      title: { type: GraphQLString, resolve: collection => collection.Title },
  	  parentNodeId: { type: GraphQLString, resolve: collection => collection.ParentNodeId },
  	  childrenNodesCount: { type: GraphQLInt, resolve: collection => collection.ChildrenNodesCount },
  	  image: { type: GraphQLString, resolve: collection => collection.Image },
  	  childrenNodes: { type: new GraphQLList(collectionType), resolve: collection => collection.ChildrenNodes } 
  }},
  interfaces: () => [nodeInterface]
});

