import * as actionType from '../actionTypes';

const { INIT_PAIR_ARRAY } = actionType;
// Action Creators

export function initPairArray(arr) {
  return {
    type: INIT_PAIR_ARRAY,
    payload: arr,
  };
}
