import * as actionType from '../actionTypes';

const {
  INIT_PAIR_ARRAY,
  INCREASE_STEP_COUNT,
  RESET,
  OPEN_CARD,
  UPDATE_VISITED_ARRAY,
} = actionType;
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

export function openCard(payload) {
  return {
    type: OPEN_CARD,
    payload,
  };
}

export function updateVisitedArray(payload) {
  return {
    type: UPDATE_VISITED_ARRAY,
    payload,
  };
}
