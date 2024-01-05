import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {width} from '../../global';

export default function SetupDetail1() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>모임 날짜</Text>

        <Text style={styles.text}>모집 마감일</Text>

        <Text style={styles.text}>장소</Text>
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
});
