import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {height} from '../../global';

export default function Step({title, children}: any) {
  return (
    <View>
      <Text style={styles.stepTitle}>{title}</Text>
      <br />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  stepTitle: {
    color: '#303030',
    fontSize: height * 24,
    fontWeight: '600',
  },
});
