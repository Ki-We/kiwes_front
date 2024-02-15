import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {height, width} from '../../global';

export default function SearchBtn({text, onPress}: any) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View style={styles.buttonContent}>
        <Text style={styles.text}>df{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: width * 100,
    height: height * 32,
    borderColor: '#9BD23C',
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center', // 세로 중앙 정렬
    alignItems: 'center', // 가로 중앙 정렬-
    margin: 5,
  },
  buttonContent: {
    justifyContent: 'center', // 세로 중앙 정렬
    alignItems: 'center', // 가로 중앙 정렬
    height: '100%',
  },
  text: {
    color: '#303030',
    fontFamily: 'Pretendard',
    fontWeight: '400',
    fontSize: height * 14,
  },
});
