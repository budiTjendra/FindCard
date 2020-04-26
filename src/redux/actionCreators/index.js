import * as actionType from '../actionTypes';
import store from '../store';

const {
  INIT_PAIR_ARRAY,
  INCREASE_STEP_COUNT,
  RESET,
  SEND_REQUEST_FLIP,
  OPEN_CARD,
  RESET_FLIPPED_CARD,
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

const isObjectEmpty = obj => Object.keys(obj).length === 0;

export function openCard(payload) {
  console.log('OPEN CARD ACTION');
  return (dispatch, getState) => {
    const { flippedCard, disabledIndexArray } = getState();
    const { num, cardIndex } = payload;
    let firstFlippedCard = flippedCard['0'];
    let secondFlippedCard = flippedCard['1'];

    if (isObjectEmpty(firstFlippedCard)) {
      firstFlippedCard = {
        num,
        cardIndex,
      };
      flippedCard['0'] = firstFlippedCard;

      dispatch({
        type: OPEN_CARD,
        payload: {
          flippedCard,
        },
      });
    } else if (isObjectEmpty(secondFlippedCard)) {
      if (firstFlippedCard.cardIndex !== cardIndex) {
        secondFlippedCard = {
          num,
          cardIndex,
        };
        flippedCard['1'] = secondFlippedCard;

        if (firstFlippedCard.num !== secondFlippedCard.num) {
          dispatch(
            sendRequestFlip({
              cardIndex: firstFlippedCard.cardIndex,
            })
          );
          dispatch(
            sendRequestFlip({
              cardIndex: secondFlippedCard.cardIndex,
            })
          );

          dispatch(resetFlippedCard());

          dispatch({
            type: OPEN_CARD,
            payload: {
              flippedCard,
            },
          });
        } else {
          disabledIndexArray.push(firstFlippedCard.cardIndex);
          disabledIndexArray.push(secondFlippedCard.cardIndex);
          dispatch({
            type: OPEN_CARD,
            payload: {
              flippedCard: {
                0: {},
                1: {},
              },
              disabledIndexArray,
            },
          });
        }
      }
    }
  };
}

export function sendRequestFlip(payload) {
  console.log('SEND_REQUEST_FLIP ACTION', payload);
  return {
    type: SEND_REQUEST_FLIP,
    payload,
  };
}
export function flipSuccess(payload) {
  console.log('FLIP_SUCCESS ACTION', payload);
  return (dispatch, getState) => {
    const { flippedCard } = getState();
    const { cardIndex } = payload;
    if (flippedCard['0'].cardIndex === cardIndex) {
      flippedCard['0'] = {};
    } else if (flippedCard['1'].cardIndex === cardIndex) {
      flippedCard['1'] = {};
    }
    dispatch({
      type: OPEN_CARD,
      payload: {
        flippedCard,
      },
    });
  };
}

function resetFlippedCard() {
  return {
    type: RESET_FLIPPED_CARD,
  };
}
