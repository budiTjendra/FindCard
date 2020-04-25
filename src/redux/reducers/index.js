// import the dependency
import * as actionType from '../actionTypes';

const { INIT_PAIR_ARRAY, RESET, INCREASE_STEP_COUNT, OPEN_CARD } = actionType;

// reducer

const initialState = {
  pairArray: [],
  stepCount: 0,
  firstCard: undefined,
  firstCardIndex: undefined,
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
      return { ...state };
    case OPEN_CARD:
      // eslint-disable-next-line no-case-declarations
      const { firstCard } = state;
      // eslint-disable-next-line no-case-declarations
      const { num, cardIndex } = payload;
      if (firstCard === undefined) {
        return { ...state, firstCard: num, firstCardIndex: cardIndex };
      }
      return state;
    default:
      return state;
  }
}

export default notesReducer;
