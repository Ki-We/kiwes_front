import React from 'react';
import RoundBtn from '../atoms/roundBtn';
import {StyleSheet, Text, View} from 'react-native';
import {height, width} from '../../global';

export default function SetupLang() {
  return (
    <>
      <View style={styles.text}>
        <Text>
          <Text style={styles.highlight}>*</Text> 최대 2개 선택 가능
        </Text>
      </View>
      <View style={styles.container}>
        <RoundBtn
          text="한국어"
          onPress={() => {
            return;
          }}
        />
        <RoundBtn
          text="English"
          onPress={() => {
            return;
          }}
        />
        <RoundBtn
          text="日本語"
          onPress={() => {
            return;
          }}
        />
        <RoundBtn
          text="中文(简体)"
          onPress={() => {
            return;
          }}
        />
        <RoundBtn
          text="中文(繁體)"
          onPress={() => {
            return;
          }}
        />
        <RoundBtn
          text="Français"
          onPress={() => {
            return;
          }}
        />
        <RoundBtn
          text="Español"
          onPress={() => {
            return;
          }}
        />
        <RoundBtn
          text="Deutsch"
          onPress={() => {
            return;
          }}
        />
        <RoundBtn
          text="Tiếng Việt"
          onPress={() => {
            return;
          }}
        />
        <RoundBtn
          text="Pусский"
          onPress={() => {
            return;
          }}
        />
        <RoundBtn
          text="기타"
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
