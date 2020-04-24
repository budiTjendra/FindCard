import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const Card = ({ num }) => <Text>{num}</Text>;
Card.propTypes = {
  num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default Card;
