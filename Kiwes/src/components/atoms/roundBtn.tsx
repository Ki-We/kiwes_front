import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {height, width} from '../../global';
import {langList} from '../../utils/utils';

export default function RoundBtn({id = '', text, isSelect, onPress}: any) {
  if (id != '') {
    const lang = langList.find(c => c.key === id);
    text = lang?.text;
  }
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
    width: width * 100,
    height: height * 44,
    borderColor: '#9BD23C',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center', // 세로 중앙 정렬
    alignItems: 'center', // 가로 중앙 정렬
    marginVertical: height * 10,
  },
  buttonContent: {
    justifyContent: 'center', // 세로 중앙 정렬
    alignItems: 'center', // 가로 중앙 정렬
    height: '100%',
  },
  text: {
    fontWeight: '300',
    fontSize: height * 13,
  },
});
