import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, CardRow } from '../components';
import * as genHelper from '../helper/GeneratorHelper';

const HomeScreen = () => {
  const numArr = genHelper.generateRandomNumber(5);
  const pairArr = genHelper.generatePairsInArray(numArr);

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
      <View
        style={{
          flex: 0,
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <ScrollView>{generateCard()}</ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
