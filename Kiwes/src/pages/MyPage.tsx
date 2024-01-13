import React from 'react';
import {TouchableOpacity, SafeAreaView, Text, StyleSheet} from 'react-native';
import NothingShow from '../components/NothingShow';

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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SettingPage');
        }}>
        <Text>Setting</Text>
      </TouchableOpacity>
      <NothingShow title={'set'} styleKiwe={styleKiwe} />
    </SafeAreaView>
  );
}
const styleKiwe = StyleSheet.create({
  image: {
    height: 450,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: 3,
  },
});
export default MyPage;
