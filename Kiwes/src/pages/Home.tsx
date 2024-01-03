import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

let imagePath = require('../../assets/images/kiwes.png');

export function Home({navigation}: any) {
  const logout = async () => {
    await AsyncStorage.removeItem('userData');
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}], // 로그인 화면의 라우트 이름을 지정
    });
  };
  return (
    <View>
      <Image source={imagePath} style={styles.image} resizeMode="contain" />
      <Text>Home Screen</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Test');
        }}>
        <Text>ChatTest</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('KeyboardTest');
        }}>
        <Text>KeyboardTest</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Splash');
        }}>
        <Text>Splash</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 133,
    height: 167,
  },
});

export default Home;
