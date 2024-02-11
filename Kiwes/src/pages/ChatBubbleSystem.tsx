import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Chat} from '../utils/commonInterface';
import {height} from '../global';

export default function ChatBubbleSystem({chat}: {chat: Chat}) {
  return <Text style={styles.container}>{chat.msg}</Text>;
}

const styles = StyleSheet.create({
  container: {
    color: '#303030',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: height * 10,
    fontWeight: '600',
    paddingTop: 3,
    paddingBottom: 3,
  },
});
