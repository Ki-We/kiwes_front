import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {width, height} from '../global';
import backIcon from 'react-native-vector-icons/Ionicons';

const LanguageSettingPage = ({route, navigation}) => {
  const currentLanguage = 'KO';
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const languageSelectComplete = async () => {
    await AsyncStorage.setItem('language', selectedLanguage);
    const savedLanguage = await AsyncStorage.getItem('language');
    console.log(savedLanguage);
    navigation.reset({
      index: 0,
      routes: [{name: 'BottomTab'}],
    });
  };

  const handleLanguageSelection = (language: string) => {
    setSelectedLanguage(language);
  };

  const languageSelectButton = (language: string) => (
    <TouchableOpacity
      onPress={() => handleLanguageSelection(language)}
      style={
        selectedLanguage === language
          ? styles.languageSelected
          : styles.languageSelectButton
      }>
      <Text
        style={
          selectedLanguage === language
            ? [styles.languageSelectButtonText, {color: '#FFFFFF'}]
            : styles.languageSelectButtonText
        }>
        {language === 'KO' ? '한' : 'E'}
      </Text>
    </TouchableOpacity>
  );

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
        <Text style={styles.headerText}>언어 설정</Text>
        <View style={{width: width * 50}}></View>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.mainText}>Select Language</Text>
        <View style={styles.languageSelectButtonContainer}>
          {languageSelectButton('KO')}
          {languageSelectButton('EN')}
        </View>
        <View style={styles.languageTextContainer}>
          <View style={styles.languageTextBox}>
            <Text
              style={
                selectedLanguage === 'KO'
                  ? [styles.languageText, {color: '#9BD23C'}]
                  : styles.languageText
              }>
              한국어
            </Text>
          </View>
          <View style={styles.languageTextBox}>
            <Text
              style={
                selectedLanguage === 'EN'
                  ? [styles.languageText, {color: '#9BD23C'}]
                  : styles.languageText
              }>
              English
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={languageSelectComplete}>
        <Text style={[styles.nextButtonText, {color: '#FFFFFF'}]}>
          설정 완료
        </Text>
      </TouchableOpacity>
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
    fontSize: height * 20,
    fontWeight: '600',
  },
  mainContainer: {
    marginTop: height * 50,
    alignItems: 'center',
    height: height * 300,
  },
  mainText: {
    color: '#303030',
    fontSize: height * 20,
    fontWeight: '500',
  },
  languageSelectButtonContainer: {
    marginTop: height * 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  languageSelectButton: {
    backgroundColor: '#FFFFFF',
    height: height * 100,
    width: width * 100,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#9BD23C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageSelected: {
    backgroundColor: '#9BD23C',
    height: height * 100,
    width: width * 100,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageSelectButtonText: {
    color: '#9BD23C',
    fontSize: height * 41,
    fontWeight: '600',
  },
  languageTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  languageTextBox: {
    height: height * 100,
    width: width * 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageText: {
    color: '#868686',
    fontSize: height * 24,
    fontWeight: '500',
  },
  nextButton: {
    marginTop: height * 200,
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
  nextButtonText: {
    color: '#DADADA',
    fontSize: height * 18,
    fontWeight: '600',
  },
});

export default LanguageSettingPage;
