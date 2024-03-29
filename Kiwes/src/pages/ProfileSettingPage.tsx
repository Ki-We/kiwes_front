import React, {useState, useEffect} from 'react';
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  Image,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Text from '@components/atoms/Text';
import RNFS from 'react-native-fs';
import {apiServer} from '../utils/metaData';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import {launchImageLibrary} from 'react-native-image-picker';
import backIcon from 'react-native-vector-icons/Ionicons';
import cameraIcon from 'react-native-vector-icons/FontAwesome';
import {width, height} from '../global';
import ProfileImageUploadModal from '../components/ProfileImageUploadModal';
import {Buffer, constants} from 'buffer';
import {LANGUAGE} from '@/utils/utils';
import {useSelector} from 'react-redux';
import {RootState} from '@/slice/RootReducer';

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
};
let imagePath =
  'https://kiwes2-bucket.s3.ap-northeast-2.amazonaws.com/profileimg/profile.jpg';

const ProfileSettingPage = ({route, navigation}) => {
  const language = useSelector((state: RootState) => state.language);
  const {thumbnailImage, myIntroduction} = route.params;
  const [imageFile, setImageFile] = useState(thumbnailImage);
  const [isProfileImageBasic, setProfileImageBasic] = useState(false);
  const onPickImage = response => {
    if (response.didCancel || !response) {
      return;
    }
    setImageFile(response.assets[0].uri);
    setProfileImageBasic(false);
  };
  const setImageBasic = (isTrue: boolean) => {
    setImageFile(imagePath);
    setProfileImageBasic(isTrue);
  };
  // 갤러리에서 사진 선택
  const setImageFromLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const modalOpen = () => {
    if (Platform.OS === 'android') {
      setModalVisible(true);
    } else {
    }
  };

  const profileImageSubmit = async () => {
    if (isProfileImageBasic) {
      const url = `${apiServer}/mypage/defalut`;
      await new RESTAPIBuilder(url, 'POST')
        .setNeedToken(true)
        .setBody(imagePath)
        .build()
        .run()
        .then(({data}) => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
      console.log(imagePath);
      setProfileImageBasic(false);
    } else {
      const url = `${apiServer}/mypage/profileImg`;
      const presignedResponse = await new RESTAPIBuilder(url, 'GET')
        .setNeedToken(true)
        .build()
        .run()
        .catch(err => {
          console.log(err);
        });
      const presignedUrl = presignedResponse.data;
      console.log('presignedUrl: ', presignedUrl);
      // Read the file and convert it to binary
      console.log('imageFile: ', imageFile);

      const imageData = await RNFS.readFile(imageFile, 'base64');
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
      }
    }
  };

  //////////////////////////////////////////////////////////////////////////// 자기소개

  const [introduction, setIntroduction] = useState(myIntroduction);
  const [keyboardStatus, setKeyboardStatus] = useState('20');

  const buffer = new Buffer(introduction, 'utf-8');
  const byteLength = 150 - buffer.length;

  const handleTextChange = inputText => {
    const inputBuffer = new Buffer(inputText, 'utf-8');
    if (inputBuffer.length <= 150) {
      setIntroduction(inputText);
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('0');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('20');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const introductionSubmit = async () => {
    const url = `${apiServer}/mypage/introduction`;
    await new RESTAPIBuilder(url, 'POST')
      .setNeedToken(true)
      .setBody(introduction)
      .build()
      .run()
      .then(({data}) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(introduction);
    navigation.pop();
  };
  /////////////////////////////////
  const test = () => {
    console.log('thumbnailImage : ', thumbnailImage);
    console.log('imageFile : ', imageFile);
    if (thumbnailImage === imageFile) console.log('TRUE');
  };
  /////////////////////////////////
  const settingComplete = async () => {
    if (thumbnailImage === imageFile) {
      await introductionSubmit();
    } else {
      await profileImageSubmit();
      await introductionSubmit();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{width: width * 50}}>
          <backIcon.Button
            backgroundColor="#FFFFFF"
            iconStyle={{marginRight: 0, padding: 5}}
            borderRadius={3}
            name="arrow-back"
            color="#303030"
            size={25}
            onPress={() => navigation.pop()}
          />
        </View>
        <Text style={styles.headerText}>프로필 설정</Text>
        <View style={{width: width * 50}}></View>
      </View>
      <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          // keyboardVerticalOffset={keyboardStatus}
          style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <ScrollView
            style={{flexGrow: 1}}
            // keyboardShouldPersistTaps="handled"
            // keyboardDismissMode="interactive"
          >
            <View
              style={{
                marginTop: height * 60,
                height: height * 40,
                paddingLeft: 20,
                padding: 5,
              }}>
              <Text style={styles.mainText}>프로필 이미지</Text>
            </View>
            <View style={styles.imageContainer}>
              <View style={styles.image}>
                <Image
                  source={{uri: imageFile}}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View
                  style={{
                    position: 'absolute',
                    top: height * 120,
                    left: width * 120,
                    height: height * 50,
                    width: width * 50,
                  }}>
                  <TouchableOpacity onPress={modalOpen}>
                    <Image
                      source={require('../../assets/images/camera.png')}
                      style={styles.cameraIcon}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View>
              <View
                style={{
                  marginTop: height * 60,
                  height: height * 40,
                  flexDirection: 'row',
                  paddingLeft: 20,
                  padding: 5,
                }}>
                <Text style={styles.mainText}>자기소개 (선택)</Text>
              </View>
              <View>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder={
                      language.language == LANGUAGE.KO
                        ? '간단하게 본인을 소개해주세요 :)'
                        : 'Please introduce yourself briefly :)'
                    }
                    style={styles.input}
                    onChangeText={handleTextChange}
                    value={introduction}
                    multiline={true}
                  />
                </View>
                <View
                  style={{alignItems: 'flex-end', paddingRight: width * 20}}>
                  <Text style={styles.checkText}>{byteLength} / 150 byte</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.completeButton}
                onPress={settingComplete}>
                <Text
                  style={{
                    color: '#FFFFFF',

                    fontSize: height * 18,
                    fontWeight: '600',
                  }}>
                  설정 완료
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <ProfileImageUploadModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        setImageBasic={setImageBasic}
        setImageFromLibrary={setImageFromLibrary}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: width * 10,
    height: height * 66,
    borderBottomWidth: height * 1,
    borderBottomColor: '#989898',
    // marginBottom: height * 60,
  },
  headerText: {
    color: '#303030',

    fontSize: height * 20,
    fontWeight: '600',
  },
  mainText: {
    color: '#303030',

    fontSize: height * 15,
    fontWeight: '600',
  },
  imageContainer: {
    marginTop: height * 20,
    height: height * 150,
    alignItems: 'center',
  },
  image: {
    width: width * 140,
    height: height * 145,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    backgroundColor: '#000000',
    borderRadius: 25,
    width: width * 30,
    height: height * 30,
  },
  inputContainer: {
    padding: 15,
    // flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    fontSize: height * 15,
    fontWeight: '500',
    width: '100%',
    height: height * 220,
    textAlignVertical: 'top',
    textAlign: 'auto',
    color: '#303030',
  },
  checkText: {
    color: '#303030',
    fontSize: height * 12,
    fontWeight: '500',
  },
  completeButton: {
    marginVertical: height * 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 50,
    width: width * 340,
    borderWidth: 2,
    borderColor: '#58C047',
    backgroundColor: '#58C047',
    borderRadius: 8,
  },
});

export default ProfileSettingPage;
