import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export function Home({navigation}: any) {
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
    </View>
  );
}

export default Home;
