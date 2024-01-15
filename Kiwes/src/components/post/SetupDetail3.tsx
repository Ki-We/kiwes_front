import React, {useState} from 'react';
import {Pressable, StyleSheet, Alert, Text, View, Image} from 'react-native';
import {height, width} from '../../global';
import {TextInput} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {launchImageLibrary} from 'react-native-image-picker';
import {Buffer} from 'buffer';
import {apiServer} from '../../utils/metaData';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';
import RNFS from 'react-native-fs';

export default function SetupDetail3({post, setPost}: any) {
  // const [response, setResponse] = useState('');
  // const [imageFile, setImageFile] = useState('');
  const [imageSource, setImageSource] = useState(null);
  // 이미지 가져오기
  // const onSelectImage = () => {
  //   launchImageLibrary(
  //     {
  //       madiaType: 'photo',
  //       maxWidth: 512,
  //       maxHeight: 512,
  //       includeBase64: true,
  //     },
  //     response => {
  //       console.log(response);
  //       // console.log(response.assets[0].base64)
  //       if (response.didCancel) {
  //         return;
  //       } else if (response.errorCode) {
  //         console.log('Image Error : ' + response.errorCode);
  //       }

  //       setResponse(response);
  //       setImageFile(response.assets[0].base64);
  //     },
  //   );
  // };
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
    const clubId = 1;
    const url = `${apiServer}/api/v1/club/article/presigned-url?clubId=${clubId}`;
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
    <>
      <View style={styles.container}>
        <Text style={styles.text}>기본 정보</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#8A8A8A'}
          placeholder="모임 제목을 입력해주세요"
          onChangeText={text => {
            setPost({...post, title: text});
          }}
        />
        <Pressable
          style={styles.thumbnail}
          onPress={() => {
            selectPhotoFromGallery();
          }}>
          {imageSource ? (
            <Image source={{uri: imageSource}} style={styles.imagebox} />
          ) : (
            <Text style={styles.textinfo}>
              {'대표 이미지를 업로드해주세요\n(파일 크기 최대 10MB)'}
            </Text>
          )}

          <View style={styles.iconContainer}>
            <FontAwesomeIcon icon={faPlus} />
          </View>
        </Pressable>
        <Text style={styles.text}>모임 소개</Text>
        <TextInput
          style={styles.textarea}
          placeholderTextColor={'#8A8A8A'}
          placeholder="모임에 대해 소개해주세요"
          onChangeText={text => {
            setPost({...post, content: text});
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: width * 20,
  },
  text: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: width * 13,
    color: '#303030',
  },

  thumbnail: {
    height: height * 130,
    backgroundColor: '#F7F7F7',
    marginBottom: height * 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagebox: {
    flex: 1,
    height: height * 130,
    width: width * 280,
    resizeMode: 'contain',
    backgroundColor: '#F7F7F7',
  },
  textinfo: {
    fontFamily: 'Pretendard',
    color: '#8A8A8A',
    whiteSpace: 'pre-line',
    textAlign: 'center',
  },
  input: {
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    padding: 5,
    paddingLeft: 10,
    fontSize: 13,
    color: '#8A8A8A',
    marginTop: height * 20,
    height: height * 48,
    marginBottom: height * 10,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 10,
  },
  textarea: {
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    padding: 5,
    paddingLeft: 10,
    fontSize: 13,
    color: '#8A8A8A',
    marginTop: height * 10,
    height: height * 180,
    textAlignVertical: 'top',
  },
});
