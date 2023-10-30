import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export function Home({navigation}: any) {
  const logout = async () => {
    await AsyncStorage.removeItem('userData');
    await navigation.navigate('Login');
  };
  return (
    <View>
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

export default Home;
