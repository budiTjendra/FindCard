// import the dependency
import * as actionType from '../actionTypes';

const { INIT_PAIR_ARRAY } = actionType;

// reducer

const initialState = {
  pairArray: [],
};

function notesReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case INIT_PAIR_ARRAY:
      console.log({ payload });
      return { ...state, pairArray: payload };
    default:
      return state;
  }
}

export default notesReducer;
