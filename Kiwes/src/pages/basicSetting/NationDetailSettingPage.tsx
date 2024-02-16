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

let asiaImage =
  'https://s3-alpha-sig.figma.com/img/e3cd/f289/ecb3b325cb0dc07d1a15b5f2d8257983?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RXYcnaWmqFAzKA69Pgrxv4YWrmPmy~03HbCF4GFoNkfPFRK9CtBSVxVNcwiAWqOaTmZ9lgDg4ZJH4fqsjMqK49v0uGfjM0yKmDMeHVmOrbckth82oGMDe6nXL~CS9EFJqMR066EEY2EzY7OVi1ksrvERHBOIPvp-a~YHyA2sZZFvFjOiKymFCxp4i1CIxdQeQrHDxYOtxnfMtAu75bpwaVauq9-Uyu2qEmQpUgtc5VaQMLYcOq7x33rV-GQRKtq-aBOvmlUon9TUNOqwwSbeDM06wfv5Vf2S-jaNEXI~TNhcGAZcWMOhE9TcR7Hg9eL0lKq~V2Vep3ummu~yar~syA__';
let europeImage =
  'https://s3-alpha-sig.figma.com/img/0cab/0883/1744106c1d30930b14edbbef54e3cc5b?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SJcmYxlGfR24yJ~iKMppcOIvrQCuqczxQuvCepKnHhSx6rpU-TFitvs~uGtHXw4Gdvk0i0RDBz7JvVxQEBrL32VbxClyvbv5BA-DGRXXYfW3xmmIGoH38YGbkp16fxE5Q7ylsuIVtmcPCrL1SE8GkMqUxBrGi1Md9r2yAfmztRv-goGsEKZ-Om3bF5L6hpinSULUekNPGcJvSAlTW~LrvB5dKbHGE~LcYf6BQqejGKqQjpRe~6Pw9Hb30uhedDPskA51UUHnckZ6ARJAhHqz27FJ-JxXkqUiLLaToMEFyoxYPf7epxiZhOhwBE6-gXF7rqsdEsoJEeZ6DLmcNj9TnQ__';
let africaImage =
  'https://s3-alpha-sig.figma.com/img/cb87/2fd8/aa1cbdc8e91fcb3e2a0d7bd71ad13bee?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M6QMYlAqBm3AGKOmePX4OKdcQTjIaMm7VaLdMDP3~MMWaXLTHr73y-VAzBLpSwk~SsmND4uIBVIepIxV~VcZ89PZVbFpJN9v7bibuezIC1bkLqOxj9njnu5zIfvIGm4k4~oKVTFx-2s88~2m~peKnjuL0ffzl3KHfq-ZTSnUQThfX8CVp2QvZh9sd-sfMex3zjwaPSBGrvUklyiQWFI6KAl7GUKNYRXkUGpqWv6MAGiQNb-WwHXfAisxE4WN50jxYplp9Y8p58aewlMlF2ev5Ou-EPJKiMRQRmh5RhVbZL2fDRSjKTpZ22W0BHStLWCUkYRZJNEqWnMAmiSOsGWGYQ__';
let northAmericaImage =
  'https://s3-alpha-sig.figma.com/img/cf00/1ec8/f564994e79e5ececc559ffc09fdc7ff9?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UHgPnuh7darJ6hpR4jzxvyo4~SGydTg5lJDLa58wR3ZLI~6A-2rcK4Yld4tnouvkFzvypCet64LHzz88ag7jK78bjjvbAFdqQ-0G90uNiNhx0C2dQ8d~ZB-GXsN0Z7Z6YmpUhlBii4uENEYG0aGDTNmMk22~iAxBXgRWoXsKwnpKcyedrMr1xT43gE3nN886bFEBMTG1ggU0vlrRlb8a44Ek25PTBXMH86zL9a550tdsj4zx2IIasN3JC4z18RvXgsVRIMcqxBda964HWdOT0uh5XNk3ws6ek7fNmOsZRPfyvhBsF8-XVIjb2iHTc~7VkjZrUbsVV7U3FJLIHLMSMw__';
let southAmericaImage =
  'https://s3-alpha-sig.figma.com/img/734c/7865/650b310024c984d022bdf6ec0285a790?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N78QlY3SP0eNX86LVhqECz7-qFLqbarboMvJHOpLlhI1xllKEkD9NuXf0qOpYlWy2pfdhBpX1GMOGw-UgrgtqtJWEMk8bzZhuP~5pLRlhzAI0VabrfGTJYt4cPTu-toZh8RXUkfi1zKBRmMt2lwlv6wTwP1wph9Z7HWS9pvn6klU3aoDGC7f919-QLPj8KUPtT-TGX4TdCgMaNmDaFIy3ykPTJcBRAyA0OekfDM~CYmLifTOr8-wbn3mK4HpRHxVja3S1hu2kW5MuMegExQF2k~j3hPidT2KVX84GPZvvmMo-hzovmTPRHJ7n8n6vDSuCDDc6Lp1Wkr5Vs9VFcmLlA__';
let oceaniaImage =
  'https://s3-alpha-sig.figma.com/img/b865/be1b/b7bd83450311fc9947a8aded6e57af87?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Sf9fLyYcr0druVtqH~LK8~okaXI4yddooaMm0i912j5hqubWyL7vodGvvw5i56NfEtzK72fT8aOk8ynbRo-wdmJ6pXyaoIyp6eQNdlXootcotiM34EK3u6P7~2vKnW4l2dUnuBm~~sWL-QvlRpcUOsx~Put~c3WAEsMgDFUjsJ5hP0XYqANctvfsoSxJB8o8VElakIt2gAy9TU0g1oZyp8Y4JvaJzzKfOq2p6n8xh6nm-5dh7SCGMNnXF~IKk-rssC08IozUsjzDeTcwp1VVeSLRcanKgLWRAzCApIpidPMRcS9cbpiAaw4U5rcd2q0ks1E~r31nFzjKSoMWnFQ7Gg__';

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
          <Image
            source={{uri: asiaImage}}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        {selectedNation === '유럽' && (
          <Image
            source={{uri: europeImage}}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        {selectedNation === '아프리카' && (
          <Image
            source={{uri: africaImage}}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        {selectedNation === '북아메리카' && (
          <Image
            source={{uri: northAmericaImage}}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        {selectedNation === '남아메리카' && (
          <Image
            source={{uri: southAmericaImage}}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        {selectedNation === '오세아니아' && (
          <Image
            source={{uri: oceaniaImage}}
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
    width: width * 560,
    height: height * 350,
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
