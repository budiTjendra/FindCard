import React, { Component } from 'react';
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

const { increaseStepCount, openCard } = actionCreator;

class Card extends Component {
  constructor(props) {
    super(props);
    const { num } = this.props;
    this.state = {
      num,
    };
  }

  componentWillMount() {
    console.log('componentWillMount');
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
      firstCard,
    } = this.props;

    const { num } = this.state;
    increaseStepCountAction();
    if (firstCard !== undefined) {
      if (firstCard !== num) {
        console.log('ANIMATE CLOSED CARD');
      }
    }
    openCardAction(num);
    this.flipCard();
  };

  flipCard() {
    console.log(this.value);
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
      <TouchableWithoutFeedback onPress={this.onClick}>
        <View style={{ flex: 1 }}>
          {true && (
            <Animated.View style={[styles.cardContainer, frontAnimatedStyle]}>
              <Text>?</Text>
            </Animated.View>
          )}
          {true && (
            <Animated.View style={[styles.cardContainer2, backAnimatedStyle]}>
              <Text>{num}</Text>
            </Animated.View>
          )}
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
  const { stepCount, firstCard } = state;
  return {
    stepCount,
    firstCard,
  };
};

Card.propTypes = {
  num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  increaseStepCount: PropTypes.func,
  openCard: PropTypes.func,
  firstCard: PropTypes.number,
};

export default connect(mapStateToProps, { increaseStepCount, openCard })(Card);
