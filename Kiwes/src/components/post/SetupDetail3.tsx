import React, {useState} from 'react';
import {Pressable, StyleSheet, View, Image} from 'react-native';
import {height, width} from '../../global';
import {TextInput} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Text from '@components/atoms/Text';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {launchImageLibrary} from 'react-native-image-picker';

export default function SetupDetail3({post, setPost}: any) {
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
        setPost({...post, imageSource: source});
      }
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>기본 정보</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#C2C2C2'}
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
          placeholderTextColor={'#C2C2C2'}
          placeholder="모임에 대해 소개해주세요"
          multiline={true}
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
    fontWeight: '600',
    fontSize: height * 13,
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
    color: '#C2C2C2',
    whiteSpace: 'pre-line',
    textAlign: 'center',
    fontSize: height * 13,
    fontWeight: '500',
  },
  input: {
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    padding: 5,
    paddingLeft: 10,
    fontSize: height * 13,
    fontWeight: '500',
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
    flexShrink: 1,
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    padding: 5,
    paddingLeft: 10,
    color: '#8A8A8A',
    marginTop: height * 10,
    height: height * 180,
    textAlignVertical: 'top',
    fontSize: height * 13,
    fontWeight: '500',
  },
});
