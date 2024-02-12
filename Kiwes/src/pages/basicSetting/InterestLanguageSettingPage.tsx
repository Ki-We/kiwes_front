import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {width, height} from '../../global';
import backIcon from 'react-native-vector-icons/Ionicons';

const InterestLanguageSettingPage = ({route, navigation}) => {
  const {nickname, gender, birthday, introduction, nation} = route.params;
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const checkBoxValues = [
    '한국어',
    'English',
    '日本語',
    '中文(简体)',
    '中文(繁體)',
    'Français',
    'Español',
    'Deutsch',
    'Pусский',
    'Tiếng Việt',
    '기타',
  ];
  const languageCodeMap = {
    한국어: 'KO',
    English: 'EN',
    日本語: 'JP',
    '中文(简体)': 'CH1',
    '中文(繁體)': 'CH2',
    Français: 'FR',
    Español: 'ES',
    Deutsch: 'DE',
    Pусский: 'RU',
    'Tiếng Việt': 'VN',
    기타: 'OTHER',
  };
  const valueToCodeMap = value => {
    const selectedLanguageCode = languageCodeMap[value];
    return selectedLanguageCode;
  };

  const toggleCheckbox = value => {
    const isChecked =
      checkedBoxes.includes(value) &&
      selectedLanguages.includes(valueToCodeMap(value));
    if (isChecked) {
      setCheckedBoxes(checkedBoxes.filter(box => box !== value));
      setSelectedLanguages(
        selectedLanguages.filter(box => box !== valueToCodeMap(value)),
      );
    } else {
      setCheckedBoxes([...checkedBoxes, value]);
      setSelectedLanguages([...selectedLanguages, valueToCodeMap(value)]);
    }
  };

  const handleNext = () => {
    navigation.navigate('InterestTopicSettingPage', {
      nickname: nickname,
      gender: gender,
      birthday: birthday,
      introduction: introduction,
      nation: nation,
      interestLanguages: selectedLanguages,
    });
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
        <Text style={styles.headerText}>기본 설정</Text>
        <View style={{width: width * 50}}></View>
      </View>
      <View
        style={{
          width: '66%',
          height: height * 4,
          backgroundColor: 'black',
          marginBottom: height * 10,
        }}></View>
      <View
        style={{
          flexDirection: 'row',
          paddingLeft: width * 20,
          padding: 5,
        }}>
        <Text style={styles.mainText}>
          관심언어를 {'\n'}1개 이상 선택해 주세요.
        </Text>
      </View>
      <View style={styles.mainContainer}>
        {checkBoxValues.map((value, index) => (
          <TouchableOpacity
            style={
              checkedBoxes.includes(value)
                ? styles.selected
                : styles.radioButtonCircle
            }
            key={index}
            onPress={() => toggleCheckbox(value)}>
            <Text
              style={
                checkedBoxes.includes(value)
                  ? [styles.buttonText, {color: '#FFFFFF'}]
                  : styles.buttonText
              }>
              {value}
            </Text>
          </TouchableOpacity>
        ))}
        {/* <Text>{selectedLanguageCodes}</Text>   */}
      </View>
      {checkedBoxes.length > 0 ? (
        <TouchableOpacity style={styles.nextButton1} onPress={handleNext}>
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: 'Pretendard',
              fontSize: height * 18,
              fontWeight: '600',
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
              fontSize: height * 18,
              fontWeight: '600',
            }}>
            다음
          </Text>
        </View>
      )}
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
    marginBottom: height * -2,
  },
  headerText: {
    color: '#303030',
    fontFamily: 'Pretendard',
    fontSize: height * 20,
    fontWeight: '600',
  },
  mainText: {
    color: '#303030',
    fontFamily: 'Pretendard',
    fontSize: height * 28,
    fontWeight: '600',
  },
  mainContainer: {
    marginTop: height * 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: height * 70,
  },
  radioButtonCircle: {
    borderColor: '#9BD23C',
    borderWidth: 2,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: width * 2,
    marginBottom: height * 30,
  },
  selected: {
    backgroundColor: '#9BD23C',
    borderColor: '#9BD23C',
    borderWidth: 2,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: width * 2,
    marginBottom: height * 30,
  },
  buttonText: {
    color: '#303030',
    fontFamily: 'Pretendard',
    fontSize: height * 20,
    fontWeight: '500',
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
  },
});

export default InterestLanguageSettingPage;
