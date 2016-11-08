import {connectionDefinitions} from 'graphql-relay';

// .net api models
import businessType from './models/businessType.js';
import collectionTreeType from './models/collectionTreeType.js';
import contentType from './models/contentType.js';
import industryType from './models/industryType.js';
import membershipType from './models/membershipType.js'
import teamTreeType from './models/teamTreeType.js';
import userIdType from './models/userIdType.js';
// goal api models
import goalType from './models/goalType.js';
import taskTypeType from './models/taskTypeType.js';
// input types - model of requests
import contentInputType from './models/inputTypes/contentInputType.js';
import goalInputType from './models/inputTypes/goalInputType.js';
import goalTypeInputType from './models/inputTypes/goalTypeInputType.js';
import taskInputType from './models/inputTypes/taskInputType.js';
import taskTypeInputType from './models/inputTypes/taskTypeInputType.js';
import teamInputType from './models/inputTypes/teamInputType.js';
import userIdInputType from './models/inputTypes/userIdInputType.js';

/*
  A feature that can be explored specifically for GoalType
  https://facebook.github.io/relay/docs/graphql-connections.html
  https://facebook.github.io/relay/graphql/connections.htm
*/

export const {connectionType: goalConnection, edgeType: goalEdge} = connectionDefinitions({ name: 'Goal', nodeType: goalType });
