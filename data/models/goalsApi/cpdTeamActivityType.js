/**
 * Model for getting cpd user goals from cpdone web service api.
 * 
 */

import {
	GraphQLObjectType,
	GraphQLList
} from 'graphql';


import membershipType from '../legacyApi/membershipType.js';
import cpdGoalUsersType from './cpdGoalUsersType.js';

export default new GraphQLObjectType ({
	name: 'CpdTeamActivity',
	fields: function() { return {
		cpdUsers: { type: new GraphQLList(cpdGoalUsersType)},
		membership: { type: membershipType }
	}},
});
