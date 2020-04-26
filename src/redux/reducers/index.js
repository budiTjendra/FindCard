// import the dependency
import * as actionType from '../actionTypes';

const {
  INIT_PAIR_ARRAY,
  RESET,
  INCREASE_STEP_COUNT,
  RESET_FLIPPED_CARD,
  SEND_REQUEST_FLIP,
  OPEN_CARD,
} = actionType;

// reducer

const initFlippedCard = {
  0: {},
  1: {},
};

const initialState = {
  pairArray: [],
  visitedIndexArray: [],
  disabledIndexArray: [],
  stepCount: 0,
  flippedCard: { ...initFlippedCard },
  requestFlipByCardIndex: undefined,
  firstCard: undefined,
  firstCardIndex: undefined,
  flipBackCard: undefined,
  secondCard: undefined,
  secondCardIndex: undefined,
};

function cardsReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case INIT_PAIR_ARRAY:
      console.log('INIT_PAIR_ARRAY');
      // console.log({ payload });
      return { ...state, pairArray: payload };
    case INCREASE_STEP_COUNT:
      console.log('INCREASE_STEP_COUNT');
      // console.log(state.stepCount + 1);
      return { ...state, stepCount: state.stepCount + 1 };
    case RESET:
      console.log('RESET');
      return {
        ...state,
        visitedIndexArray: [],
        disabledIndexArray: [],
        stepCount: 0,
        flippedCard: { ...initFlippedCard },
        requestFlipByCardIndex: undefined,
        firstCard: undefined,
        firstCardIndex: undefined,
        flipBackCard: undefined,
        secondCard: undefined,
        secondCardIndex: undefined,
      };
    case OPEN_CARD:
      console.log('OPEN_CARD');
      // eslint-disable-next-line no-case-declarations
      const { flippedCard, disabledIndexArray } = payload;
      if (disabledIndexArray !== undefined) {
        return {
          ...state,
          flippedCard: { ...flippedCard },
          disabledIndexArray: [...disabledIndexArray],
        };
      }
      return {
        ...state,
        flippedCard: { ...flippedCard },
      };
    case RESET_FLIPPED_CARD:
      console.log('RESET_FLIPPED_CARD');
      return {
        ...state,
        flippedCard: { ...initFlippedCard },
        requestFlipByCardIndex: undefined,
      };
    case SEND_REQUEST_FLIP:
      console.log('SEND_REQUEST_FLIP', payload);
      return {
        ...state,
        requestFlipByCardIndex: payload.cardIndex,
      };
    default:
      return state;
  }
}

export default cardsReducer;
