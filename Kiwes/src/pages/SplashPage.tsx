import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

export default function SplashPage() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://kiwes2-bucket.s3.ap-northeast-2.amazonaws.com/main/splash_icon.png',
        }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFD8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    aspectRatio: 1,
    width: '70%',
  },
});
