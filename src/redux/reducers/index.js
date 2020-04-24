// import the dependency
import * as actionType from '../actionTypes';

const { INIT_PAIR_ARRAY, RESET, INCREASE_STEP_COUNT } = actionType;

// reducer

const initialState = {
  pairArray: [],
  stepCount: 0,
};

function notesReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case INIT_PAIR_ARRAY:
      console.log({ payload });
      return { ...state, pairArray: payload };
    case INCREASE_STEP_COUNT:
      console.log(state.stepCount + 1);
      return { ...state, stepCount: state.stepCount + 1 };
    case RESET:
      return { ...state, stepCount: 0 };
    default:
      return state;
  }
}

export default notesReducer;
