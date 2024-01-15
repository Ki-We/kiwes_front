import React from 'react';
import {TouchableOpacity, SafeAreaView, Text, View} from 'react-native';
import UploadImageTest from '../components/UploadImageTest';

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
      <View style={{marginTop: 100}}>
        <UploadImageTest />
      </View>
    </SafeAreaView>
  );
}
export default MyPage;
