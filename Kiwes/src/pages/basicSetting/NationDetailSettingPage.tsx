import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import {width, height} from '../../global';
import backIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

let asiaImage = require('../../../assets/images/asia.png');
let africaImage = require('../../../assets/images/africa.png');
let northAmericaImage = require('../../../assets/images/northAmerica.png');
let southAmericaImage = require('../../../assets/images/southAmerica.png');
let oceaniaImage = require('../../../assets/images/oceania.png');
let europeImage = require('../../../assets/images/europe.png');

const NationDetailSettingPage = ({route, navigation}) => {
  const {nickname, gender, birthday, introduction} = route.params;
  const [selectedNation, setNation] = useState('아시아');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({top: 0, left: 0});
  const targetRef = useRef(null);

  const nationOptions = [
    '아시아',
    '유럽',
    '아프리카',
    '북아메리카',
    '남아메리카',
    '오세아니아',
  ];

  const openModal = event => {
    if (targetRef && targetRef.current) {
      targetRef.current.measure((fx, fy, width, height, px, py) => {
        setModalPosition({top: py, left: px});
        setModalVisible(true);
      });
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleNationSelection = nation => {
    setNation(nation);
  };

  const handleNext = () => {
    navigation.navigate('InterestLanguageSettingPage', {
      nickname: nickname,
      gender: gender,
      birthday: birthday,
      introduction: introduction,
      nation: 'FOREIGN',
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
          width: '33%',
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
        <Text style={styles.mainText}>본인의 국적을 {'\n'}선택해주세요.</Text>
      </View>
      <View style={styles.mainContainer}>
        <View>
          <TouchableOpacity
            ref={targetRef}
            onPress={openModal}
            style={styles.nationSelectButton}>
            <View style={{width: width * 30}}></View>
            <Text style={styles.modalText}>{selectedNation}</Text>
            <View style={{width: width * 25, marginRight: width * 5}}>
              <Icon name="chevron-down" size={25} color="#9BD23C" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageContainer}>
        {selectedNation === '아시아' && (
          <Image source={asiaImage} style={styles.image} resizeMode="contain" />
        )}
        {selectedNation === '유럽' && (
          <Image
            source={europeImage}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        {selectedNation === '아프리카' && (
          <Image
            source={africaImage}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        {selectedNation === '북아메리카' && (
          <Image
            source={northAmericaImage}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        {selectedNation === '남아메리카' && (
          <Image
            source={southAmericaImage}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        {selectedNation === '오세아니아' && (
          <Image
            source={oceaniaImage}
            style={styles.image}
            resizeMode="contain"
          />
        )}
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
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View
          style={[
            styles.modalContainer,
            {top: modalPosition.top, left: modalPosition.left},
          ]}>
          {nationOptions.map((nation, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handleNationSelection(nation);
                closeModal();
              }}
              style={{
                padding: height * 10,
                borderTopWidth: index === 0 ? 0 : 1,
                borderTopStartRadius: index === 0 ? 10 : 0,
                borderTopRightRadius: index === 0 ? 10 : 0,
                borderBottomLeftRadius: index === 5 ? 10 : 0,
                borderBottomEndRadius: index === 5 ? 10 : 0,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  selectedNation === nation ? '#EDEDED' : 'white',
              }}>
              {selectedNation === nation ? (
                <View
                  style={{
                    width: width * 280,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{width: width * 50}}></View>
                  <Text style={styles.modalText}>{nation}</Text>
                  <View style={{width: width * 30, marginRight: width * 20}}>
                    <Icon name="check" size={25} color="#F00" />
                  </View>
                </View>
              ) : (
                <Text style={styles.modalText}>{nation}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
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
  mainText: {
    color: '#303030',

    fontSize: height * 28,
    fontWeight: '600',
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    padding: 20,
  },
  nationSelectButton: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 280,
    height: height * 50,
    backgroundColor: '#FFFFFF',
    borderColor: '#9BD23C',
    borderWidth: 2,
    borderRadius: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: height * 10,
  },
  image: {
    width: width * 520,
    height: height * 320,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 50,
    width: width * 350,
    borderWidth: 2,
    borderColor: '#58C047',
    backgroundColor: '#58C047',
    borderRadius: 8,
  },
  modalContainer: {
    position: 'absolute',
    width: width * 280,
    backgroundColor: '#FFFFFF',
    borderColor: '#9BD23C',
    borderWidth: 2,
    borderRadius: 10,
  },
  modalText: {
    textAlign: 'center',
    color: '#303030',

    fontWeight: '500',
    fontSize: height * 20,
  },
});

export default NationDetailSettingPage;
