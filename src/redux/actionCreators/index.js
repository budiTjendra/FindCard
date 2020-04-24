import * as actionType from '../actionTypes';

const { INIT_PAIR_ARRAY, INCREASE_STEP_COUNT, RESET } = actionType;
// Action Creators

export function initPairArray(arr) {
  return {
    type: INIT_PAIR_ARRAY,
    payload: arr,
  };
}

export function increaseStepCount() {
  return {
    type: INCREASE_STEP_COUNT,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}
