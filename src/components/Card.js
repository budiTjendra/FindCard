import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

const Card = ({ num }) => {
  const createDummyElement = () => (
    <View
      style={{
        marginVertical: 5,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        display: 'none',
      }}
    >
      <Text>{num}</Text>
    </View>
  );

  const createElement = () => (
    <View
      style={{
        marginVertical: 5,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <Text>{num}</Text>
    </View>
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
export default Card;
