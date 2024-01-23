import React, {useState, useEffect} from 'react';
import {
  Keyboard,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {width, height} from '../../global';
import {apiServer} from '../../utils/metaData';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';
import backIcon from 'react-native-vector-icons/Ionicons';

const NickNameSettingPage = ({navigation}) => {
  const [nickname, setNickname] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState('20');
  const [checkStatus, setCheckStatus] = useState('');

  // const buffer = new Buffer(nickname, 'utf-8');
  // const byteLength = () => {
  //   return 15 - buffer.length;
  // };
  // const lastNickName = nickname.slice(0, -1);
  const handleTextChange = inputText => {
    // 한글 영어 숫자 가능하려면 /[^\w\dㄱ-ㅎㅏ-ㅣ가-힣]/g, '' 입력
    // const inputBuffer = new Buffer(inputText, 'utf-8');
    // const filteredText = inputText.replace(/[^a-zA-Z가-힣]/g, '');
    // if (inputBuffer.length <= 15) {
    //   setNickname(filteredText);
    // }
  };
  const refreshCheckStatus = () => {
    setCheckStatus('');
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

  const handleNext = () => {
    // 다음 화면으로 이동
    navigation.navigate('GenderSettingPage');
  };
  //////////////////////////////////////////////////////////////////////////
  const check = () => {
    nickname === '' ? setCheckStatus('false') : setCheckStatus('true');
  };
  ///////////////////////////////////////////////////////////////////////////
  const checkNinkName = async () => {
    const url = `${apiServer}/nickname`;
    const {data} = await new RESTAPIBuilder(url, 'POST')
      .build()
      .run()
      .catch(err => {
        console.log(err);
      });
    data === true ? setCheckStatus('true') : setCheckStatus('false');
    console.log(data);
  };

  return (
    <View style={styles.container}>
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
      <View
        style={{
          width: '40%',
          height: height * 4,
          backgroundColor: 'black',
        }}
      />
      <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={keyboardStatus}
          style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <View
            style={{
              marginTop: height * 100,
              height: height * 40,
              flexDirection: 'row',
              paddingLeft: 20,
              padding: 5,
            }}>
            <Text style={styles.mainText}>닉네임</Text>
            <Text style={[styles.mainText, {color: '#58C047'}]}> *</Text>
          </View>
          <View>
            <View style={styles.inputContainer}>
              <View style={styles.input}>
                <TextInput
                  placeholder="닉네임 입력"
                  style={styles.input}
                  onChangeText={handleTextChange}
                  value={nickname}
                  onPressIn={refreshCheckStatus}
                />
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    check();
                    Keyboard.dismiss();
                  }}
                  style={styles.checkButton}>
                  <Text style={{color: '#FFF', fontSize: width * 15}}>
                    중복확인
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{paddingLeft: 20, marginBottom: height * 100}}>
              {checkStatus === 'true' ? (
                <Text style={styles.checkText}>사용 가능한 닉네임 입니다.</Text>
              ) : checkStatus === 'false' ? (
                <Text style={styles.errorText}>
                  이미 존재하는 닉네임 입니다.
                </Text>
              ) : (
                <Text style={styles.checkText}>
                  닉네임은 한글, 영어 포함 {byteLength()} byte 이내로
                  작성해주세요.
                </Text>
              )}
            </View>
          </View>
          {checkStatus === 'true' ? (
            <TouchableOpacity style={styles.nextButton1} onPress={handleNext}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'Pretendard',
                  fontSize: width * 18,
                  fontWeight: '700',
                }}>
                다음
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.nextButton2}>
              <Text
                style={{
                  color: '#DADADA',
                  fontFamily: 'Pretendard',
                  fontSize: width * 18,
                  fontWeight: '700',
                }}>
                다음
              </Text>
            </View>
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
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
    marginBottom: height * -2,
  },
  headerText: {
    color: '#303030',
    fontFamily: 'Pretendard',
    fontSize: width * 20,
    fontWeight: '900',
  },
  nextButton1: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 50,
    width: width * 340,
    borderWidth: 2,
    borderColor: '#58C047',
    backgroundColor: '#58C047',
    borderRadius: 8,
    marginTop: height * 70,
  },
  nextButton2: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 50,
    width: width * 340,
    borderWidth: 2,
    borderColor: '#DADADA',
    borderRadius: 8,
    marginTop: height * 70,
  },
  mainText: {
    color: '#303030',
    fontFamily: 'Pretendard',
    fontSize: width * 15,
    fontWeight: '600',
  },
  inputContainer: {
    padding: 15,
    paddingTop: 10,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#303030',
    backgroundColor: '#FFF',
    paddingBottom: height * 15,
    width: width * 260,
    fontSize: width * 14,
    marginTop: 5,
    marginRight: 5,
    height: height * 50,
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
    color: '#58C047',
    fontFamily: 'Pretendard',
    fontSize: width * 12,
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    fontFamily: 'Pretendard',
    fontSize: width * 12,
    fontWeight: '500',
  },
});

export default NickNameSettingPage;
