import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {height, width} from '../../global';
import {TextInput} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {launchImageLibrary} from 'react-native-image-picker';

export default function SetupDetail3({post, setPost}: any) {
  const [response, setResponse] = useState('');
  const [imageFile, setImageFile] = useState('');

  // 이미지 가져오기
  const onSelectImage = () => {
    launchImageLibrary(
      {
        madiaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: true,
      },
      response => {
        console.log(response);
        // console.log(response.assets[0].base64)
        if (response.didCancel) {
          return;
        } else if (response.errorCode) {
          console.log('Image Error : ' + response.errorCode);
        }

        setResponse(response);
        setImageFile(response.assets[0].base64);
      },
    );
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
            onSelectImage();
          }}>
          <Text style={styles.textinfo}>
            {'대표 이미지를 업로드해주세요\n(파일 크기 최대 10MB)'}
          </Text>
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
  thumbnail: {
    height: height * 130,
    backgroundColor: '#F7F7F7',
    marginBottom: height * 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinfo: {
    fontFamily: 'Pretendard',
    color: '#8A8A8A',
    whiteSpace: 'pre-line',
    textAlign: 'center',
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
