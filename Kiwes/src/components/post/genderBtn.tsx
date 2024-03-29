import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {height, width} from '../../global';
import Text from '@components/atoms/Text';

export default function GenderBtn({text, isSelect, onPress}: any) {
  return (
    <Pressable
      style={() => [
        styles.button,
        {
          backgroundColor: isSelect ? '#3DBE14' : '#F7F7F7',
          borderColor: isSelect ? '#3DBE14' : '#ffffff',
        },
      ]}
      onPress={onPress}>
      <View style={styles.buttonContent}>
        <Text
          style={{
            ...styles.text,
            color: isSelect ? '#ffffff' : '#7C7C7C',
          }}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: width * 3,
    height: height * 48,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center', // 세로 중앙 정렬
    alignItems: 'center', // 가로 중앙 정렬
    marginBottom: height * 20,
  },
  buttonContent: {
    justifyContent: 'center', // 세로 중앙 정렬
    alignItems: 'center', // 가로 중앙 정렬
    height: '100%',
  },
  text: {
    fontWeight: '500',
    fontSize: height * 15,
  },
});
