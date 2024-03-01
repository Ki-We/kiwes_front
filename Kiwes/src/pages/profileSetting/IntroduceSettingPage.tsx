import React, {useState, useEffect} from 'react';
import {
  Keyboard,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import Text from '@components/atoms/Text';
import {width, height} from '../../global';
import backIcon from 'react-native-vector-icons/Ionicons';
import {Buffer} from 'buffer';
import {LANGUAGE} from '@/utils/utils';
import {useSelector} from 'react-redux';
import {RootState} from '@/slice/RootReducer';

const IntroduceSettingPage = ({route, navigation}) => {
  const {nickname, gender, birthday} = route.params;
  const [introduction, setIntroduction] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState('20');
  const language = useSelector((state: RootState) => state.language);

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

  const handleNext = () => {
    navigation.navigate('NationSettingPage', {
      nickname: nickname,
      gender: gender,
      birthday: birthday,
      introduction: introduction,
    });
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
          width: '100%',
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
                placeholderTextColor="#8F8F8F"
                style={styles.input}
                onChangeText={handleTextChange}
                value={introduction}
                multiline
              />
            </View>
            <View style={{alignItems: 'flex-end', paddingRight: width * 20}}>
              <Text style={styles.checkText}>{byteLength} / 150 byte</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: height * 18,
                fontWeight: '600',
              }}>
              다음
            </Text>
          </TouchableOpacity>
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

    fontSize: height * 20,
    fontWeight: '600',
  },
  nextButton: {
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
  mainText: {
    color: '#303030',
    fontSize: height * 15,
    fontWeight: '600',
  },
  inputContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#F8F8F8',
    color: '#000',
    shadowColor: '#000',
    placeholderColor: '#000',
    padding: 10,
    fontSize: height * 15,
    fontWeight: '500',
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
    fontSize: height * 12,
    fontWeight: '500',
  },
});

export default IntroduceSettingPage;
