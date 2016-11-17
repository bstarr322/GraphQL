/**
 * Model for getting collection in tree from 
 * from cpdone web service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLList,
	GraphQLInt
} from 'graphql';

// self reference on children nodes
import collectionTreeType from './collectionTreeType.js'

export default new GraphQLObjectType({
	name: 'CollectionTree',
	fields: function() { return {
		collectionId: { 
			type: new GraphQLNonNull(GraphQLID), 
			resolve: collection => collection.Id 
		},
		title: { 
			type: GraphQLString, 
			resolve: collection => collection.Title 
		},
		parentNodeId: { 
			type: GraphQLString, 
			resolve: collection => collection.ParentNodeId 
		},
		contentCount : { 
			type: GraphQLInt, 
			resolve: collection => collection.ContentCount 
		},
		image: { 
			type: GraphQLString, 
			resolve: collection => collection.Image 
		},
		childrenNodes: { 
			type: new GraphQLList(collectionTreeType), 
			resolve: collection => collection.ChildrenNodes 
		} 
	}},
})
