import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionCreator from '../redux/actionCreators';

const { increaseStepCount } = actionCreator;

class Card extends Component {
  constructor(props) {
    super(props);
    const { num } = this.props;
    this.state = { num };
  }

  onClick = () => {
    const { increaseStepCount: increaseStepCountAction } = this.props;

    console.log('yoyo', this.props);
    increaseStepCountAction();
  };

  render() {
    const { num } = this.state;
    const createDummyElement = () => (
      <View style={[styles.cardContainer, { display: 'none' }]}>
        <Text>{num}</Text>
      </View>
    );

    const createElement = () => (
      <TouchableWithoutFeedback onPress={this.onClick}>
        <View style={styles.cardContainer}>
          <Text>{num}</Text>
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
    flex: 1,
    borderWidth: 5,
    borderColor: 'gray',
    borderRadius: 6,
  },
});

const mapStateToProps = state => {
  const { stepCount } = state;
  return {
    stepCount,
  };
};

Card.propTypes = {
  num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  increaseStepCount: PropTypes.func,
};

export default connect(mapStateToProps, { increaseStepCount })(Card);
