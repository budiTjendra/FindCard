import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  Alert,
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
  const stepCount = useSelector(state => state.stepCount);
  const disabledIndexArray = useSelector(state => state.disabledIndexArray);
  const flippedCard = useSelector(state => state.flippedCard);

  useEffect(() => {
    generateNums();
    return () => {};
  }, [generateNums]);

  useEffect(() => {
    /*
    console.log(
      'USE EFFECT',
      { disabledIndexArray },
      { pairArr },
      { flippedCard }
    );*/
  }, [disabledIndexArray, flippedCard, pairArr]);

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

    pairArr.map((item, index) => {
      count += 1;
      const cardElement = <Card num={item} key={count} cardIndex={index} />;
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

  const createAlert = () =>
    Alert.alert(
      'Congratulation',
      `You finished with ${stepCount}  moves`,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );

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

          <Text>Steps:{stepCount}</Text>
          <Text>
            {pairArr.length}:{disabledIndexArray.length}
          </Text>
        </View>
        {disabledIndexArray.length === pairArr.length &&
          pairArr.length !== 0 &&
          createAlert()}
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
