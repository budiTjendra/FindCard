import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreator from '../redux/actionCreators';

const { increaseStepCount } = actionCreator;

const Card = ({ num }) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(increaseStepCount());
  };

  const createDummyElement = () => (
    <View style={[styles.cardContainer, { display: 'none' }]}>
      <Text>{num}</Text>
    </View>
  );

  const createElement = () => (
    <TouchableWithoutFeedback onPress={onClick}>
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
};
Card.propTypes = {
  num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

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

export default Card;
