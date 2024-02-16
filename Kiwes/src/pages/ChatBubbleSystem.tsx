import React from 'react';
import {StyleSheet} from 'react-native';
import Text from '@components/atoms/Text';
import {Chat} from '../utils/commonInterface';
import {height} from '../global';

export default function ChatBubbleSystem({chat}: {chat: Chat}) {
  return <Text style={styles.container}>{chat.msg}</Text>;
}

const styles = StyleSheet.create({
  container: {
    color: '#303030',
    textAlign: 'center',

    fontSize: height * 10,
    fontWeight: '600',
    paddingTop: 3,
    paddingBottom: 3,
  },
});
