import React, {useState} from 'react';
import {Button, View, Alert, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import {apiServer} from '../utils/metaData';
import {Buffer} from 'buffer';

const UploadImageTest = () => {
  const [imageSource, setImageSource] = useState(null);

  const selectPhotoFromGallery = () => {
    const options = {
      noData: true,
    };

    launchImageLibrary(options, response => {
      console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = response.assets[0].uri;
        console.log(response.assets[0].uri);
        console.log(source);
        setImageSource(source);
      }
    });
  };

  const onSubmit = async () => {
    if (!imageSource || typeof imageSource === 'number') {
      return Alert.alert('이미지를 선택해주세요');
    }

    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      return Alert.alert('접근 토큰이 없습니다. 로그인 해주세요.');
    }
    const url = `${apiServer}/mypage/profileImg`;
    const presignedResponse = await new RESTAPIBuilder(url, 'GET')
      .setNeedToken(true)
      .build()
      .run()
      .catch(err => {
        console.log(err);
      });
    const presignedUrl = presignedResponse.data;
    console.log(presignedUrl);
    // Read the file and convert it to binary
    console.log(imageSource);
    const imageData = await RNFS.readFile(imageSource, 'base64');
    const binaryData = new Buffer(imageData, 'base64');

    const uploadResponse = await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/jpeg',
      },
      body: binaryData,
    });
    console.log(uploadResponse);
    if (!uploadResponse.ok) {
      const errorMessage = await uploadResponse.text();
      console.log(errorMessage);
      return Alert.alert('Upload failed', errorMessage);
    }

    Alert.alert('Upload completed');
  };

  return (
    <View>
      <Button title="갤러리에서 사진 선택" onPress={selectPhotoFromGallery} />
      {imageSource && (
        <Image source={{uri: imageSource}} style={{width: 200, height: 200}} />
      )}
      <Button title="제출" onPress={onSubmit} />
    </View>
  );
};

export default UploadImageTest;
