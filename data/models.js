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
	goalServices,
	taskTypeServices,
	goalTypeServices,
	teamServices,
	contentServices,
	collectionServices,
	businessServices
} from './services';

/*
  Study Node Interface Feature if it is still needed
  https://facebook.github.io/relay/docs/graphql-object-identification.html#content
  https://facebook.github.io/relay/graphql/objectidentification.htm
*/

/*
  .net graphqlobjecttype -> refactor
*/
export const businessType = new GraphQLObjectType({
  name: 'Business',
  fields: function() { return {
	id: {type: new GraphQLNonNull(GraphQLID), resolve: business => business.Id },
    name: { type: GraphQLString, resolve: business => business.Name },
    image: { type: GraphQLString, resolve: business => business.Image },
  }},
});

export const industryType = new GraphQLObjectType({
  name: 'Industry',
  fields: function() { return {
	id: {type: new GraphQLNonNull(GraphQLID), resolve: industry => industry.IndustryId},
    name: { type: GraphQLString, resolve: industry => industry.IndustryName },
  }},
});

export const membershipType = new GraphQLObjectType({
  name: 'Membership',
  fields: function() { return {
	id: {type: new GraphQLNonNull(GraphQLID), resolve: membership => membership.Name },
    name: { type: GraphQLString, resolve: membership => membership.Name },
  }},
});

export const teamTreeType = new GraphQLObjectType({
  name: 'TeamTree',
  fields: function() { return {
	id: {type: new GraphQLNonNull(GraphQLID), resolve: team => team.Id },
    title: { type: GraphQLString, resolve: team => team.Title },
    parentNodeId: { type: GraphQLString, resolve: team => team.ParentNodeId },
    childrenNodes : { type: new GraphQLList(teamTreeType), resolve: team => team.ChildrenNodes  } 
  }},
});

export const collectionTreeType = new GraphQLObjectType({
  name: 'CollectionTree',
  fields: function() { return {
	id: {type: new GraphQLNonNull(GraphQLID), resolve: collection => collection.Id },
    title: { type: GraphQLString, resolve: collection => collection.Title },
    parentNodeId: { type: GraphQLString, resolve: collection => collection.ParentNodeId },
    contentCount : { type: GraphQLInt, resolve: collection => collection.ContentCount },
    image: { type: GraphQLString, resolve: collection => collection.Image },
    childrenNodes: { type: new GraphQLList(collectionTreeType), resolve: collection => collection.ChildrenNodes } 
  }},
});

export const contentType = new GraphQLObjectType({
  name: 'Content',
  fields: function () { return {
	id: {type: new GraphQLNonNull(GraphQLID), resolve: content => content.Id },
    name: { type: GraphQLString, resolve: content => content.Name },
    type: { type: GraphQLString, resolve: content => content.Type },
    typeId: { type: GraphQLString, resolve: content => content.TypeId }
  }},
});

/*
  .net graphqlobjecttype -> refactor ends here
*/

export function getGoalFields() {
  return {
    id: {type: new GraphQLNonNull(GraphQLID)},
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

export const goalType = new GraphQLObjectType({
  name: 'Goal',
  fields: () => getGoalFields(),
});

export const goalType_Type = new GraphQLObjectType({
  name: 'GoalType',
  fields: function() { return {
      id: {type: new GraphQLNonNull(GraphQLID)},
      name: { type: GraphQLString },
      iconReference: { type: GraphQLString },
      tag: { type: GraphQLString },
  }},
});

export const taskType_Type = new GraphQLObjectType({
  name: 'TaskType',
  fields: function() { return {
	  id: {type: new GraphQLNonNull(GraphQLID)},
      name: { type: GraphQLString },
	  tag: { type: GraphQLString },
  }},
});

/*
   refactor Input Types?
 */

export const goalInputType = new GraphQLInputObjectType ({
  name:'GoalInput',
  fields: () => getGoalInputFields()
});

export const goalType_InputType = new GraphQLInputObjectType({
  name: 'GoalTypeInput',
  fields: { id: { type: GraphQLInt } }
});

export const taskInputType = new GraphQLInputObjectType({
  name: 'TaskInput',
  fields: function() { return {
	taskType: {type: taskType_InputType },
	instruction: { type: GraphQLString },
	order: { type: GraphQLInt },
	daysToComplete: { type: GraphQLInt },
	content: { type: contentInputType }
  }}
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

export const contentInputType = new GraphQLInputObjectType({
  name: 'ContentInput',
  fields: function() { return { contentId: {type: GraphQLString }}}
});

export const userInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: function () { return {
	  id: { type: GraphQLString }
  }}
});


