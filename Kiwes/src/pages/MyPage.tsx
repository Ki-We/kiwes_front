import React from 'react';
import {TouchableOpacity, SafeAreaView, Text} from 'react-native';

export function MyPage({navigation}: any) {
  return (
    <SafeAreaView>
      <Text>MyPage Screen</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Search');
        }}>
        <Text>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SettingPage');
        }}>
        <Text>Setting</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default MyPage;
