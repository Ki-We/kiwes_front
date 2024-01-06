import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {height, width} from '../../global';

export default function RoundBtn({text, isSelect, onPress}: any) {
  return (
    <Pressable
      style={() => [
        styles.button,
        {
          backgroundColor: isSelect ? '#9BD23C' : '#ffffff',
        },
      ]}
      onPress={onPress}>
      <View style={styles.buttonContent}>
        <Text
          style={{
            ...styles.text,
            color: isSelect ? '#ffffff' : '#303030',
          }}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: height * 44,
    borderColor: '#9BD23C',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center', // 세로 중앙 정렬
    alignItems: 'center', // 가로 중앙 정렬
    marginBottom: height * 20,
    paddingLeft: width * 10,
    paddingRight: width * 10,
  },
  buttonContent: {
    justifyContent: 'center', // 세로 중앙 정렬
    alignItems: 'center', // 가로 중앙 정렬
    height: '100%',
  },
  text: {
    fontFamily: 'Pretendard',
    fontWeight: '300',
    fontSize: width * 13,
  },
});
