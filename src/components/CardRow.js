import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import * as Setting from '../Setting';
import Card from './Card';

const CardRow = props => {
  const { children } = props;

  const dummyLength = Setting.MAX_CARD_PER_ROW - children.length;
  const dummyArrElement = dummyLength !== 0 ? [] : null;
  for (let i = 0; i < dummyLength; i++) {
    const key = `dummy-${i}`;
    dummyArrElement.push(<Card num="dummy" key={key} />);
  }
  return (
    <View
      style={{
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      {children}
      {dummyArrElement}
    </View>
  );
};

CardRow.propTypes = {
  children: PropTypes.element.isRequired,
};
export default CardRow;
