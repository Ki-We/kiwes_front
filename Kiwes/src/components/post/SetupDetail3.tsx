import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {height, width} from '../../global';
import {TextInput} from 'react-native-gesture-handler';

export default function SetupDetail3() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>기본 정보</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#8A8A8A'}
          placeholder="모임 제목을 입력해주세요"
        />

        <Text style={styles.text}>모임 소개</Text>
        <TextInput
          style={styles.textarea}
          placeholderTextColor={'#8A8A8A'}
          placeholder="모임에 대해 소개해주세요"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: width * 20,
  },
  text: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: width * 13,
    color: '#303030',
  },
  input: {
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    padding: 5,
    paddingLeft: 10,
    fontSize: 13,
    color: '#8A8A8A',
    marginTop: height * 20,
    height: height * 48,
    marginBottom: height * 10,
  },
  textarea: {
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    padding: 5,
    paddingLeft: 10,
    fontSize: 13,
    color: '#8A8A8A',
    marginTop: height * 10,
    height: height * 180,
    textAlignVertical: 'top',
  },
});
