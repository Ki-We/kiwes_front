import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {width, height} from '../../global';
import backIcon from 'react-native-vector-icons/Ionicons';

let imagePath = require('../../../assets/images/koreanKiwe.png');
const NationSettingPage = ({route, navigation}) => {
  const {nickname, gender, birthday, introduction} = route.params;
  const [selectedNation, setNation] = useState('');

  const handleNationSelection = nation => {
    setNation(nation);
    // console.log(nation);
  };

  const renderRadioButton = nation => (
    <View>
      {selectedNation === nation && styles.selected ? (
        <TouchableOpacity
          style={styles.selected}
          onPress={() => handleNationSelection(nation)}>
          <Text
            style={{
              color: '#FFF',

              fontSize: height * 20,
              fontWeight: '500',
            }}>
            한국인
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.radioButtonCircle}
          onPress={() => handleNationSelection(nation)}>
          <Text
            style={{
              color: '#000',

              fontSize: height * 20,
              fontWeight: '500',
            }}>
            한국인
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const handleNext = () => {
    navigation.navigate('InterestLanguageSettingPage', {
      nickname: nickname,
      gender: gender,
      birthday: birthday,
      introduction: introduction,
      nation: selectedNation,
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
      <View>
        <View style={styles.mainContainer}>
          {renderRadioButton('KOREA')}
          <TouchableOpacity
            style={styles.radioButtonCircle}
            onPress={() =>
              navigation.navigate('NationDetailSettingPage', {
                nickname: nickname,
                gender: gender,
                birthday: birthday,
                introduction: introduction,
              })
            }>
            <Text
              style={{
                color: '#000',
                fontSize: height * 20,
                fontWeight: '500',
              }}>
              외국인
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageContainer}>
        {selectedNation === 'KOREA' ? (
          <Image source={imagePath} style={styles.image} resizeMode="contain" />
        ) : selectedNation === '외국인' ? (
          <View style={{height: height * 300}}></View>
        ) : (
          <View style={{height: height * 300}}></View>
        )}
      </View>
      {selectedNation != '' ? (
        <TouchableOpacity style={styles.nextButton1} onPress={handleNext}>
          <Text
            style={{
              color: '#FFFFFF',

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
    marginBottom: height * 20,
  },
  radioButtonCircle: {
    borderColor: '#9BD23C',
    borderWidth: 2,
    width: width * 120,
    height: height * 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderColor: '#9BD23C',
    backgroundColor: '#9BD23C',
    borderWidth: 2,
    width: width * 120,
    height: height * 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: height * 50,
  },
  image: {
    width: width * 190,
    height: height * 300,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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

export default NationSettingPage;
