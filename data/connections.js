import {connectionDefinitions} from 'graphql-relay';
import {goalType,goalType_Type,taskType_Type,teamType,contentType,collectionType,businessType} from './models.js';

/*
  https://facebook.github.io/relay/docs/graphql-connections.html
  https://facebook.github.io/relay/graphql/connections.htm
*/

export const {connectionType: goalConnection, edgeType: goalEdge} = connectionDefinitions({ name: 'Goal', nodeType: goalType });
export const {connectionType: goalTypeConnection, edgeType: goalTypeEdge}  = connectionDefinitions({ name: 'GoalType', nodeType: goalType_Type });
export const {connectionType: taskTypeConnection, edgeType: taskTypeEdge}  = connectionDefinitions({ name: 'TaskType', nodeType: taskType_Type });
export const {connectionType: teamConnection, edgeType: teamEdge}  = connectionDefinitions({ name: 'Team', nodeType: teamType });
export const {connectionType: contentConnection, edgeType: contentEdge}  = connectionDefinitions({ name: 'Content', nodeType: contentType });
export const {connectionType: collectionConnection, edgeType: collectionEdge}  = connectionDefinitions({ name: 'Collection', nodeType: collectionType });
export const {connectionType: businessConnection, edgeType: businessEdge}  = connectionDefinitions({ name: 'Business', nodeType: businessType });