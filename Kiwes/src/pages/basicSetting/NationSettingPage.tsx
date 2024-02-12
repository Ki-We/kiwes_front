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

let imagePath =
  'https://s3-alpha-sig.figma.com/img/161f/dbd1/aedd1353d96cbd26574287bdd0db2010?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SZCzPpIGMhNuMSRnKI68DH2hhzpCBjIpWi-Pp4Jr7rLj4PTATKOXhY64GItdIhYCBe2Hl1TR8Jx-VHYC72nPd69-Cy8whFRLXMfxL4iSvp9b7uVkFyz6nH~LABvuSPPgYApIG6E6YseZ5bt74UcqysYJgf2uc55mSwDWRo9Em2rpDCne53Cq-JkfWFX6WA6CIk5sxnDmB3~ij4HNJ-UVFFwW-eCuVhmxE6QSAimj5NhImpsBRfUHoXDVjzmR7SHnH-N-1-y7~6WuhP9oNBWfeI4mOdShTOvxwiW-lO85WiYOI6f5xZ8lV6v4AEA-T3yJQ2e0RhLY8Q2P1SFbMUVWFQ__';

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
              fontFamily: 'Pretendard',
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
              fontFamily: 'Pretendard',
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
                fontFamily: 'Pretendard',
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
          <Image
            source={{uri: imagePath}}
            style={styles.image}
            resizeMode="contain"
          />
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
