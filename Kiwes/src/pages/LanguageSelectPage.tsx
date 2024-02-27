import React, {useCallback, useState} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text as BasicText,
  StyleSheet,
  Linking,
} from 'react-native';
import Text from '@components/atoms/Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {height, width} from '../global';
import {useFocusEffect} from '@react-navigation/native';

const Terms =
  'https://evendoha.notion.site/9494cdbdccfe49e783f603ca3d7acabb?pvs=4';
const PrivacyPolicy =
  'https://evendoha.notion.site/78ca0b2126144376bb66ff017c489a90?pvs=4';
const openPDF = (pdf: string) => {
  Linking.openURL(pdf);
};

const LanguageSelectPage = ({navigation}) => {
  useFocusEffect(
    useCallback(() => {
      checkLanguage();
    }, []),
  );
  const checkLanguage = async () => {
    const language = await AsyncStorage.getItem('language');
    if (language == null) return;

    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [termsAgree, agreeToTerms] = useState(false);
  const [privacyAgree, agreeToPrivacy] = useState(false);
  const languageSelectComplete = async () => {
    await AsyncStorage.setItem('language', selectedLanguage);
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
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
      <BasicText
        style={
          selectedLanguage === language
            ? [styles.languageSelectButtonText, {color: '#FFFFFF'}]
            : styles.languageSelectButtonText
        }>
        {language === 'KO' ? '한' : 'E'}
      </BasicText>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/kiwesLogo.png')}
          style={styles.image}
          resizeMode="contain"
        />
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
      <View style={styles.agreementsContainer}>
        <View style={styles.agreement}>
          <TouchableOpacity
            style={
              termsAgree === true
                ? [styles.agreementCheckBox, {backgroundColor: '#58C047'}]
                : styles.agreementCheckBox
            }
            onPress={() => agreeToTerms(!termsAgree)}>
            <Icon name="check" size={15} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openPDF(Terms)}>
            <Text style={styles.agreementText}>
              이용약관 동의 / Terms and Conditions Agreement
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.agreement}>
          <TouchableOpacity
            style={
              privacyAgree === true
                ? [styles.agreementCheckBox, {backgroundColor: '#58C047'}]
                : styles.agreementCheckBox
            }
            onPress={() => agreeToPrivacy(!privacyAgree)}>
            <Icon name="check" size={15} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openPDF(PrivacyPolicy)}>
            <Text style={styles.agreementText}>
              개인정보 처리방침 동의 / Privacy Policy Agreement
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {selectedLanguage !== '' && termsAgree && privacyAgree ? (
        <TouchableOpacity
          style={styles.nextButton1}
          onPress={languageSelectComplete}>
          <Text style={[styles.nextButtonText, {color: '#FFFFFF'}]}>NEXT</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.nextButton2}>
          <Text style={styles.nextButtonText}>NEXT</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 200,
  },
  image: {
    width: width * 230,
    height: height * 110,
  },
  mainContainer: {
    alignItems: 'center',
    height: height * 300,
  },
  mainText: {
    color: '#303030',
    fontSize: height * 20,
    fontWeight: '500',
  },
  languageSelectButtonContainer: {
    marginTop: height * 70,
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
    fontFamily: 'ChosunCentennial_ttf',
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
  agreementsContainer: {
    marginBottom: height * 40,
    height: height * 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agreement: {
    width: width * 310,
    flexDirection: 'row',
    marginTop: height * 5,
  },
  agreementCheckBox: {
    width: width * 24,
    height: height * 24,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  agreementText: {
    marginLeft: 10,
    color: '#868686',
    fontSize: height * 12.6,
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
  nextButtonText: {
    color: '#DADADA',
    fontSize: height * 18,
    fontWeight: '600',
  },
});

export default LanguageSelectPage;
