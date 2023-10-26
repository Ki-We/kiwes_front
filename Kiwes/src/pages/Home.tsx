import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export function Home({navigation}: any) {
  return (
    <View>
      <Text>Home Screen</Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('KakaoTest');
        }}>
        <Text>카카오 로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
