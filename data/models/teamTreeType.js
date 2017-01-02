/**
 * Model for getting teams in tree form
 * from cpdone web service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLList
} from 'graphql';

// self reference on children nodes
import teamTreeType from './teamTreeType.js'

export default new GraphQLObjectType({
	name: 'TeamTree',
	fields: function() { return {
		teamTreeId: {
			type: GraphQLID, 
			resolve: team => team.Id 
		},
		title: { 
			type: GraphQLString, 
			resolve: team => team.Title 
		},
		parentNodeId: { 
			type: GraphQLString, 
			resolve: team => team.ParentNodeId 
		},
		childrenNodes : { 
			type: new GraphQLList(teamTreeType), 
			resolve: team => team.ChildrenNodes  
		} 
	}},
});
