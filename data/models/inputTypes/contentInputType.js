/**
 * Model of incoming content http request 
 */

import {
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLBoolean
} from 'graphql';

import taskInputType from './taskInputType.js';
import teamInputType from './teamInputType.js';
import goalTypeInputType from './goalTypeInputType.js';

export default new GraphQLInputObjectType ({
	name: 'ContentInput',
	fields: function() { return { 
		contentId: {
			type: GraphQLString 
		}
	}},
});