// import the dependency
import * as actionType from '../actionTypes';

const {
  INIT_PAIR_ARRAY,
  RESET,
  INCREASE_STEP_COUNT,
  OPEN_CARD,
  UPDATE_VISITED_ARRAY,
} = actionType;

// reducer

const initialState = {
  pairArray: [],
  visitedIndexArray: [],
  disabledIndexArray: [],
  stepCount: 0,
  firstCard: undefined,
  firstCardIndex: undefined,
  flipBackCard: undefined,
};

function notesReducer(state = initialState, action) {
  let visitedIndexArray;
  const { payload } = action;
  switch (action.type) {
    case INIT_PAIR_ARRAY:
      console.log({ payload });
      return { ...state, pairArray: payload };
    case INCREASE_STEP_COUNT:
      console.log(state.stepCount + 1);
      return { ...state, stepCount: state.stepCount + 1 };
    case RESET:
      return {
        ...state,
        firstCard: undefined,
        firstCardIndex: undefined,
        visitedIndexArray: [],
        disabledIndexArray: [],
        stepCount: 0,
      };
    case OPEN_CARD:
      // eslint-disable-next-line no-case-declarations
      const {
        firstCard,
        flipBackCard,
        disabledIndexArray,
        firstCardIndex,
      } = state;
      // eslint-disable-next-line no-case-declarations
      const { num, cardIndex } = payload;
      if (firstCard === undefined) {
        visitedIndexArray = state.visitedIndexArray.splice();
        visitedIndexArray.push(cardIndex);
        console.log('push visitedIndexArray', { visitedIndexArray });
        return {
          ...state,
          firstCard: num,
          firstCardIndex: cardIndex,
          visitedIndexArray,
        };
      } else {
        console.log(
          'remove index',
          { visitedIndexArray },
          { cardIndex },
          { firstCard },
          { num }
        );

        if (firstCard === num) {
          disabledIndexArray.push(firstCardIndex);
          disabledIndexArray.push(cardIndex);
          console.log('push to disabledIndexArray ', { disabledIndexArray });
          return {
            ...state,
            disabledIndexArray,
            firstCard: undefined,
            firstCardIndex: undefined,
          };
        } else {
          visitedIndexArray = state.visitedIndexArray.slice();
          const _flipBackCard = visitedIndexArray.pop();
          console.log('remove from visitedIndexArray', visitedIndexArray, {
            _flipBackCard,
          });
          return {
            ...state,
            flipBackCard: _flipBackCard,
            visitedIndexArray,
          };
        }
      }
    case UPDATE_VISITED_ARRAY:
      return state;
    default:
      return state;
  }
}

export default notesReducer;
