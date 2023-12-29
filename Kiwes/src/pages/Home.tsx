import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

let imagePath = require('./kiwes.png');

export function Home({navigation}: any) {
  const logout = async () => {
    await AsyncStorage.removeItem('userData');
    await navigation.navigate('Login');
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
