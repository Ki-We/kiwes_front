import React from 'react';
import {TouchableOpacity, SafeAreaView, Text, View} from 'react-native';
import UploadImageTest from '../components/UploadImageTest';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

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
      <GooglePlacesAutocomplete
        styles={{
          textInput: {
            backgroundColor: '#F7F7F7', // 이 부분에 원하는 색상을 입력하세요.
          },
        }}
        placeholder="모임 장소를 검색해주세요"
        minLength={2}
        keyboardShouldPersistTaps={'handled'}
        fetchDetails={false}
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
        keepResultsAfterBlur={true}
        enablePoweredByContainer={false}
        onPress={(data, details = null) => {}}
        query={{
          key: 'AIzaSyBlRgYCAJwXVcFYQ2HVG1C0jBFCwwX3BDA',
          language: 'en',
        }}
      />
    </SafeAreaView>
  );
}
export default MyPage;
