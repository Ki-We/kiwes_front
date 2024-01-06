import React from 'react';
import {TouchableOpacity, SafeAreaView, Text} from 'react-native';

export function MyPage({navigation}: any) {
  return (
    <SafeAreaView>
      <Text>MyPage Screen</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PostClub');
        }}>
        <Text>PostClub</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Search');
        }}>
        <Text>Search</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default MyPage;
