import React from 'react';
import RoundCategory from '../atoms/roundCategory';
import {StyleSheet, Text, View} from 'react-native';
import {height, width} from '../../global';

export default function SetupCategory() {
  return (
    <>
      <View style={styles.text}>
        <Text>
          <Text style={styles.highlight}>*</Text> 하나만 선택 가능
        </Text>
      </View>
      <View style={styles.container}>
        <RoundCategory
          text="🎮게임/보드게임"
          onPress={() => {
            return;
          }}
        />
        <RoundCategory
          text="🎟️문화/전시/공연"
          onPress={() => {
            return;
          }}
        />
        <RoundCategory
          text="🍺술"
          onPress={() => {
            return;
          }}
        />
        <RoundCategory
          text="🏀스포츠"
          onPress={() => {
            return;
          }}
        />
        <RoundCategory
          text="🎨공예/그림"
          onPress={() => {
            return;
          }}
        />
        <RoundCategory
          text="❤️봉사활동"
          onPress={() => {
            return;
          }}
        />
        <RoundCategory
          text="🥝기타"
          onPress={() => {
            return;
          }}
        />
        <RoundCategory
          text="🎧K-pop"
          onPress={() => {
            return;
          }}
        />
        <RoundCategory
          text="🍔맛집/카페"
          onPress={() => {
            return;
          }}
        />
        <RoundCategory
          text="📚스터디"
          onPress={() => {
            return;
          }}
        />
        <RoundCategory
          text="✈️여행"
          onPress={() => {
            return;
          }}
        />
        <RoundCategory
          text="🇰🇷한국 문화"
          onPress={() => {
            return;
          }}
        />
        <RoundCategory
          text="🎬영화/드라마/애니"
          onPress={() => {
            return;
          }}
        />
        <RoundCategory
          text="🎉파티/클럽"
          onPress={() => {
            return;
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: width * 20,
  },
  text: {
    marginLeft: width * 20,
    color: '#ADADAD',
    marginBottom: height * 15,
  },
  highlight: {
    color: '#3DBE14',
  },
});
