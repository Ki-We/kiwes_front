import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Text from '@components/atoms/Text';

const NothingShow = ({title, styleKiwe}: any) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/soSad.png')}
        style={styleKiwe.image}
        resizeMode="contain"
      />
      <Text style={styleKiwe.text}> {title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
export default NothingShow;
