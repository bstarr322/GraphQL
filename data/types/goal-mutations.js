/**
 * goal-mutations.js is insert and delete operations specifically for goal type 
 * 
 */

import { 
  GraphQLString,
  GraphQLInt,
  GraphQLOutputType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID
} from 'graphql';
import { 
  mutationWithClientMutationId, 
  fromGlobalId
} from 'graphql-relay';

import { 
  goalConnection,
  goalEdge 
} from './connections';

import goalInputType from '../models/inputTypes/goalInputType.js';
import { viewerType } from '../types/viewer-type.js';

import goalService from '../services/goalService.js';
import contentService from '../services/contentService.js';
import userService from '../services/userService.js';

// infrastructure
import httpParser from '../utilities/httpParser.js'

export const createGoalMutation = mutationWithClientMutationId({
  name: 'CreateGoal',
  inputFields: { 
    goal: { type: goalInputType }
  },
  outputFields: { 
    goalId: {
      type: GraphQLString,
      resolve: function(payload) { 
        if ('goal' in payload){
          return payload.goal.id;
        } else {
          return null;
        }
      }
    },
    viewer: {
      type: viewerType
    },
    errorMessage: {
      type: GraphQLString
    },
    clientMutationId: {
      type: GraphQLString
    }
  },
  mutateAndGetPayload: function(input,req){
    return Promise.all(promisesForCreateGoal(input,req)).then(data => {
      var mapData = data;
      //response is aligned with the request in data object
      if ('tasks' in input.goal) {
        //assign tasks to input
        input.goal.tasks.forEach((task,idx) => {
          if('collection' in task){
            input.goal.tasks[idx].collection.contents = mapData[0];
            //remove first item from array
            mapData.shift();   
          }
        });
      }

      //assign teams to input
      input.goal.teams.forEach((team,idx) => {
        input.goal.teams[idx].users = mapData[0];
        //remove first item from array
        mapData.shift();   
      });

      return new goalService(httpParser(req)).createGoal(input);

    }).catch(error => {
      console.log("promisesForCreateGoal error -> " + error.message);
      return error;
    });
  }
});

//promise for collection contentsIds and team's userIds 
function promisesForCreateGoal(input,req){
  var promiseArr = [];
  if ('tasks' in input.goal) {
    input.goal.tasks.forEach(function(task) {
      if('collection' in task){
        var promiseTask = new contentService(httpParser(req)).getContentByCollectionIdAndBusinessId(task.collection.collectionId, input.goal.businessId);
        promiseArr.push(promiseTask); 
      }
    });
  }

  input.goal.teams.forEach((team) => {
    var promiseTeam = new userService(httpParser(req)).getUserByBusinessAndTeam(team.id, input.goal.businessId);
    promiseArr.push(promiseTeam);
  });

  return promiseArr;
};

export const deleteGoalMutation = mutationWithClientMutationId ({
  name: 'DeleteGoal',
  inputFields: {goalId: {type: GraphQLString}},
  outputFields: { 
    deleted: {
        type: GraphQLBoolean,
        resolve: payload => {
          console.log(payload);
          return payload.deleted
        }
    },
    viewer: {
      type: viewerType
    }
  },
  mutateAndGetPayload: function(input,req){
    return new goalService(httpParser(req)).deleteGoal(input.goalId);
  }
});
