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

import bluePromise from 'bluebird';

import { 
  goalConnection,
  goalEdge 
} from './connections';

import goalInputType from '../models/inputTypes/goalInputType.js';
import { viewerType } from '../types/viewer-type.js';

import goalService from '../services/goalService.js';
import contentService from '../services/contentService.js';
import userService from '../services/userService.js';

//outputFields are to be discussed and decided 
//Q: Will goalConnection be queried again in managegoals if we inserted a new goal or not? (if not,
//we need goalEdge to output and insert the new edge to goalConnection)
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
    return Promise.all(iterableQryPromises(input,req)).then(data => {
      //response is aligned with the request in data object
      var mapData = data;
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

      return new goalService(getToken(req)).createGoal(input);

    }).catch(errorMessage => {
      console.log(errorMessage);
    });
  }
});

function iterableQryPromises(input,req){
  var promiseArr = [];
  if ('tasks' in input.goal) {
    input.goal.tasks.forEach(function(task) {
      if('collection' in task){
        var promiseTask = new contentService(getToken(req)).getContentByCollectionIdAndBusinessId(task.collection.collectionId, input.goal.businessId);
        promiseArr.push(promiseTask); 
      }
    });
  }
  
  input.goal.teams.forEach((team) => {
    var promiseTeam = new userService(getToken(req)).getUserIdsByBusinessAndTeam(team.id, input.goal.businessId);
    promiseArr.push(promiseTeam);
  });

  return promiseArr;
};

export const deleteGoalMutation = mutationWithClientMutationId ({
  name: 'DeleteGoal',
  inputFields: {goalId: {type: GraphQLString}},
  outputFields: { 
    viewer: {
      type: viewerType
    }
  },
  mutateAndGetPayload: function(input,req){
    return new goalService(getToken(req)).deleteGoal(input);
  
}});


var getToken = function(request) {
  var token = extractAuthToken(request.headers);
  return generateAuthToken(token);
}

var extractAuthToken = function(headers) {
  return "nothing"; //headers.authorization;
}

var generateAuthToken = function(token) {
  return { 'authorization' : token };
}

