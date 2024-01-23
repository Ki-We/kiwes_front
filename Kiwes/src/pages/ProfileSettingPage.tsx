import React, {useState, useEffect} from 'react';
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {apiServer} from '../utils/metaData';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import {launchImageLibrary} from 'react-native-image-picker';
import backIcon from 'react-native-vector-icons/Ionicons';
import cameraIcon from 'react-native-vector-icons/FontAwesome';
import {width, height} from '../global';
import ProfileImageUploadModal from '../components/ProfileImageUploadModal';

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
};

let imagePath =
  'https://s3-alpha-sig.figma.com/img/747c/b110/aab5c4d20ab8d710ceb49bd7c856a200?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GBFZIQeb4if4jqWM37ljfqdQ3UR9wVwmkTAT1fhiw9jYxQ4pJcrkJ1E0Cb6rlTpsWBhc1yE7~zOdp~IEmkbgUftW1KGWvQFZMnNKUlAJYQOR5qELZt4dnD-m7vO0Roe8tjP~l78gPKSeBDVVTZMwc~b07y56xkXhteN6hNjFhScCyveSqcN9sR1sYbdM98xQyqhLeMJwgO4yRo0~mfyYkv~KzERjeKd179tW9KIDDHln9TMmYTXxe6v~L7Z4o69BkOTB~19-sug~2SdyfvK4MuBlhSefC6O1FywLjHhmUNlOkBab~cAI4gqEa2Ms8OGyNkOzW0kMs4xDkDZPZnYcWQ__';

const ProfileSettingPage = ({navigation}) => {
  const [response, setResponse] = useState('');
  const [imageFile, setImageFile] = useState(imagePath);
  const onPickImage = response => {
    if (response.didCancel || !response) {
      return;
    }
    // console.log('PickImage', res);
    console.log(response);
    setResponse(response);
    setImageFile(response.assets[0].uri);
  };
  const setImageBasic = () => {
    setImageFile(imagePath);
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

  //////////////////////////////////////////////////////////////////////////// 자기소개

  const [introduction, setIntroduction] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState('20');

  // const buffer = new Buffer(introduction, 'utf-8');
  // const byteLength = 150 - buffer.length;

  const handleTextChange = inputText => {
    // const inputBuffer = new Buffer(inputText, 'utf-8');
    // if (inputBuffer.length <= 150) {
    //   setIntroduction(inputText);
    // }
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

  // const settingComplete = async () => {
  //   const url = `${apiServer}/mypage/introduction`;
  //   const {data} = await new RESTAPIBuilder(url, 'POST')
  //     .build()
  //     .run()
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   console.log(data);
  //   avigation.pop();
  // };

  const settingComplete = () => {
    navigation.pop();
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
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            keyboardVerticalOffset={keyboardStatus}>
            <View
              style={{
                height: height * 40,
                flexDirection: 'row',
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
                    top: height * 105,
                    left: width * 90,
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
                    placeholder="간단하게 본인을 소개해주세요 :)"
                    style={styles.input}
                    onChangeText={handleTextChange}
                    value={introduction}
                    multiline
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
                    fontFamily: 'Pretendard',
                    fontSize: width * 18,
                    fontWeight: '700',
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
    marginBottom: height * 60,
  },
  headerText: {
    color: '#303030',
    fontFamily: 'Pretendard',
    fontSize: width * 20,
    fontWeight: '900',
  },
  mainText: {
    color: '#303030',
    fontFamily: 'Pretendard',
    fontSize: width * 15,
    fontWeight: '700',
  },
  imageContainer: {
    marginTop: height * 20,
    height: height * 150,
    alignItems: 'center',
  },
  image: {
    width: width * 120,
    height: height * 140,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    backgroundColor: '#000000',
    borderRadius: 25,
    width: width * 30,
    height: height * 35,
  },
  inputContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    fontSize: width * 14,
    width: '100%',
    height: height * 220,
    textAlignVertical: 'top',
    textAlign: 'auto',
  },
  checkButton: {
    height: height * 50,
    width: width * 76,
    borderRadius: 5,
    backgroundColor: '#C0C0C0',
    padding: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: {
    color: '#303030',
    fontFamily: 'Pretendard',
    fontSize: width * 12,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontFamily: 'Pretendard',
    fontSize: width * 12,
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
