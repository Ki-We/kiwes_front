import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Text from '@components/atoms/Text';

const NothingShow = ({title, styleKiwe}: any) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/soSad.png')}
        style={[styles.image, styleKiwe.image]}
        resizeMode="contain"
      />
      <Text style={styleKiwe.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxHeight: '70%',
    maxWidth: '70%',
  },
});

export default NothingShow;
