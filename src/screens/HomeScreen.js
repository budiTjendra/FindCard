import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableHighlight,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardRow } from '../components';
import * as genHelper from '../helper/GeneratorHelper';
import * as actionCreator from '../redux/actionCreators';

const { initPairArray, reset } = actionCreator;
const HomeScreen = () => {
  const PAIR = 4;
  const dispatch = useDispatch();
  const pairArr = useSelector(state => state.pairArray);

  useEffect(() => {
    generateNums();
    return () => {};
  }, [generateNums]);

  const restart = () => {
    generateNums();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const generateNums = () => {
    const numArr = genHelper.generateRandomNumber(PAIR);
    const _pairArr = genHelper.generatePairsInArray(numArr);
    dispatch(initPairArray(_pairArr));
    dispatch(reset());
  };

  const generateCard = () => {
    let cardArr = [];
    let count = 0;
    const cardRowArr = [];

    const addToCardRow = () => {
      const cardArrayElement = cardArr.slice();
      const key = `cardRow-${cardRowArr.length + 1}`;
      const cardRowElement = <CardRow key={key}>{cardArrayElement}</CardRow>;
      cardRowArr.push(cardRowElement);
      cardArr = [];
    };

    pairArr.map(item => {
      count += 1;
      const cardElement = <Card num={item} key={count} />;
      cardArr.push(cardElement);

      if (count % 3 === 0 && count !== 0) {
        addToCardRow();
      }
    });

    if (cardArr.length !== 0) {
      addToCardRow();
    }

    return cardRowArr;
  };

  const bounces = PAIR > 4;

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={restart}
          >
            <Text>Restart</Text>
          </TouchableHighlight>

          <Text>Steps:0</Text>
        </View>
        <ScrollView bounces={bounces}>{generateCard()}</ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  topContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});

export default HomeScreen;
