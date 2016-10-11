import {connectionDefinitions} from 'graphql-relay';
import {goalType,goalType_Type,taskType_Type} from './models.js';

/*
  https://facebook.github.io/relay/docs/graphql-connections.html
  https://facebook.github.io/relay/graphql/connections.htm
*/

export const {connectionType: goalConnection, edgeType: goalEdge} = connectionDefinitions({ name: 'Goal', nodeType: goalType });
export const {connectionType: goalTypeConnection, edgeType: goalTypeEdge}  = connectionDefinitions({ name: 'GoalType', nodeType: goalType_Type });
export const {connectionType: taskTypeConnection, edgeType: taskTypeEdge}  = connectionDefinitions({ name: 'TaskType', nodeType: taskType_Type });

