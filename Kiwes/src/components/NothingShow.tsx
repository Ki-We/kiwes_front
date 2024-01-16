import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

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
