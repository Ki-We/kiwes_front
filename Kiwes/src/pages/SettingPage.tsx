import React, {useState} from 'react';
import {View, StyleSheet, Text, Linking} from 'react-native';
import Header from '../components/layout/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutModal from '../components/LogoutModal';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import {apiServer} from '../utils/metaData';
import UploadImageTest from '../components/UploadImageTest';
import {height, width} from '../global';
const url = `${apiServer}/auth/quit`;
const Terms =
  'https://drive.google.com/file/d/1zIPn45nR6PTI5tkjW80rbFqEx3wmFScS/view?usp=sharing';
const PrivacyPolicy =
  'https://drive.google.com/file/d/1Ri8iG7B2UI1aQjYvi9EtJBRcp_PoseCD/view?usp=sharing';
const openPDF = (pdf: string) => {
  Linking.openURL(pdf);
};

const SettingPage = ({navigation}: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modaltype, setModaltype] = useState('승락');
  const handleOpenLogoutModal = () => {
    setModalVisible(true);
    setModaltype('로그아웃');
  };
  const handleOpenSecessionModal = () => {
    setModalVisible(true);
    setModaltype('탈퇴하기');
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const logout = async () => {
    await AsyncStorage.removeItem('userData');
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };
  const secession = async () => {
    try {
      await new RESTAPIBuilder(url, 'POST').setNeedToken(true).build().run();
    } catch (err) {
      console.log(err);
    }
    logout();
  };
  const openinsta = () => {
    Linking.canOpenURL('instagram://app')
      .then(supported => {
        if (!supported) {
          Linking.openURL('https://www.instagram.com/kiwes_official');
        } else {
          Linking.openURL('instagram://user?username=kiwes_official');
        }
      })
      .catch(err => console.error('An error occurred', err));
  };
  const navigatePop = () => {
    navigation.pop();
  };
  return (
    <>
      <Header navigatePop={navigatePop} title={'설정'} />
      <View style={styles.container}>
        {/* <TouchableOpacity>
          <Text style={styles.text}>언어 설정</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => openPDF(Terms)}>
          <Text style={styles.text}>이용 약관</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openPDF(PrivacyPolicy)}>
          <Text style={styles.text}>개인정보 처리방침</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openinsta()}>
          <Text style={styles.text}>DM으로 문의하기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOpenLogoutModal()}>
          <Text style={styles.text}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOpenSecessionModal()}>
          <Text style={styles.text}>탈퇴하기</Text>
        </TouchableOpacity>
      </View>
      <LogoutModal
        isVisible={modalVisible}
        onClose={handleCloseModal}
        exitClub={modaltype === '로그아웃' ? logout : secession}
        modaltype={modaltype}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    paddingTop: height * 30,
  },
  text: {
    fontSize: height * 15,
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: '400',
    margin: width * 14,
    paddingBottom: height * 10,
    paddingLeft: width * 10,
  },
});
export default SettingPage;
