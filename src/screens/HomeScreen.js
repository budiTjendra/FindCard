import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableHighlight,
} from 'react-native';
import { Card, CardRow } from '../components';
import * as genHelper from '../helper/GeneratorHelper';

const HomeScreen = () => {
  const [pairArr, setPairArr] = useState([]);

  useEffect(() => {
    generateNums();
    return () => {};
  }, []);

  const restart = () => {
    generateNums();
  };

  const generateNums = () => {
    const numArr = genHelper.generateRandomNumber(5);
    const _pairArr = genHelper.generatePairsInArray(numArr);

    setPairArr(_pairArr);
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
        <ScrollView>{generateCard()}</ScrollView>
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
