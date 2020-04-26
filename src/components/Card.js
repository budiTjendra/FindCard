import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionCreator from '../redux/actionCreators';

const {
  increaseStepCount,
  openCard,
  closeFirstCard,
  flipSuccess,
} = actionCreator;

class Card extends React.Component {
  constructor(props) {
    super(props);
    const { num, cardIndex } = this.props;
    this.state = {
      num,
      cardIndex,
    };
  }

  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
  }

  onClick = () => {
    const {
      increaseStepCount: increaseStepCountAction,
      openCard: openCardAction,
      closeFirstCard: closeFirstCardAction,
      firstCard,
      firstCardIndex,
      visitedArray,
      disabledIndexArray,
    } = this.props;

    const { num, cardIndex } = this.state;

    //console.log({ disabledIndexArray });
    if (disabledIndexArray.indexOf(cardIndex) !== -1) {
      return;
    }

    increaseStepCountAction();

    if (firstCard !== undefined) {
      if (firstCard !== num && cardIndex !== firstCardIndex) {
        setTimeout(() => {
          this.flipCard();
        }, 500);
      } else {
        //console.log('MATCH', { firstCard });
      }
    }

    setTimeout(() => {
      openCardAction({ num, cardIndex });
    }, 100);

    this.flipCard();
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { num, cardIndex } = this.props;

    if (
      nextProps.requestFlipByCardIndex !== undefined &&
      cardIndex === nextProps.requestFlipByCardIndex
    ) {
      /*
      console.log(
        'UNSAFE_componentWillReceiveProps',
        { nextProps },
        { props: this.props }
      );*/

      if (this.value !== 0) {
        setTimeout(() => {
          this.flipCard();
          // eslint-disable-next-line react/destructuring-assignment
          this.props.flipSuccess({
            cardIndex,
          });
        }, 1000);
      }
    }

    if (nextProps.num !== num) {
      // Perform some operation

      if (this.value !== 0) {
        setTimeout(() => {
          this.flipCard();
        }, 10);
      }

      setTimeout(() => {
        this.setState({ num: nextProps.num });
      }, 100);
    }
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start();
    }
  }

  render() {
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }],
    };
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }],
    };

    const { num } = this.state;
    const createDummyElement = () => (
      <View style={[styles.cardContainer, { display: 'none' }]}>
        <Text>{num}</Text>
      </View>
    );

    const createElement = () => (
      <TouchableWithoutFeedback onPress={this.onClick} key={num}>
        <View style={{ flex: 1 }}>
          <Animated.View style={[styles.cardContainer, frontAnimatedStyle]}>
            <Text>?</Text>
          </Animated.View>
          <Animated.View style={[styles.cardContainer2, backAnimatedStyle]}>
            <Text>{num}</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );

    const element = num === 'dummy' ? createDummyElement() : createElement();

    return (
      <View
        style={{
          width: '30%',
          height: undefined,
          aspectRatio: 3 / 5,
        }}
      >
        {element}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 5,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '95%',
    height: '90%',
    borderWidth: 5,
    borderColor: 'gray',
    borderRadius: 6,
    backfaceVisibility: 'hidden',
  },
  cardContainer2: {
    marginVertical: 5,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '92%',
    height: '90%',
    borderWidth: 5,
    borderColor: 'gray',
    borderRadius: 6,
    backfaceVisibility: 'hidden',
  },
});

const mapStateToProps = state => {
  const {
    stepCount,
    firstCard,
    firstCardIndex,
    visitedArray,
    flipBackCard,
    disabledIndexArray,
    requestFlipByCardIndex,
  } = state;
  return {
    stepCount,
    firstCard,
    firstCardIndex,
    visitedArray,
    disabledIndexArray,
    flipBackCard,
    requestFlipByCardIndex,
  };
};

Card.propTypes = {
  num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  increaseStepCount: PropTypes.func,
  openCard: PropTypes.func,
  closeFirstCard: PropTypes.func,
  flipSuccess: PropTypes.func,
  firstCard: PropTypes.number,
  firstCardIndex: PropTypes.number,
  cardIndex: PropTypes.number,
  visitedArray: PropTypes.array,
  disabledIndexArray: PropTypes.array,
};

export default connect(mapStateToProps, {
  increaseStepCount,
  openCard,
  closeFirstCard,
  flipSuccess,
})(Card);
