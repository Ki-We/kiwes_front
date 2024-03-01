import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Text from '@components/atoms/Text';
import {apiServer} from '../../utils/metaData';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {width, height} from '../../global';
import backIcon from 'react-native-vector-icons/Ionicons';
import {LANGUAGE} from '@/utils/utils';
import {useSelector} from 'react-redux';
import {RootState} from '@/slice/RootReducer';

const images = [
  require('../../../assets/images/kpop.png'),
  require('../../../assets/images/kculture.png'),
  require('../../../assets/images/cafe.png'),
  require('../../../assets/images/sports.png'),
  require('../../../assets/images/show.png'),
  require('../../../assets/images/travel.png'),
  require('../../../assets/images/study.png'),
  require('../../../assets/images/game.png'),
  require('../../../assets/images/party.png'),
  require('../../../assets/images/alcohol.png'),
  require('../../../assets/images/movie.png'),
  require('../../../assets/images/paint.png'),
  require('../../../assets/images/volunteer.png'),
  require('../../../assets/images/other.png'),
];

const InterestTopicSettingPage = ({route, navigation}) => {
  const {nickname, gender, birthday, introduction, nation, interestLanguages} =
    route.params;
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const language = useSelector((state: RootState) => state.language);
  const checkBoxValues = [
    'K-pop',
    '한국문화',
    '맛집/카페',
    '스포츠',
    '문화/전시/공연',
    '여행',
    '스터디',
    '게임/보드게임',
    '파티/클럽',
    '술',
    '영화/드라마/애니',
    '공예/그림',
    '봉사활동',
    '기타',
  ];
  const topicCodeMap = {
    'K-pop': 'KPOP',
    한국문화: 'KOREAN_CULTURE',
    '맛집/카페': 'CAFE',
    스포츠: 'SPORTS',
    '문화/전시/공연': 'CULTURE',
    여행: 'TRAVEL',
    스터디: 'STUDY',
    '게임/보드게임': 'GAME',
    '파티/클럽': 'PARTY',
    술: 'DRINK',
    '영화/드라마/애니': 'MOVIE',
    '공예/그림': 'CRAFT',
    봉사활동: 'VOLUNTEER',
    기타: 'OTHER',
  };
  const valueToCodeMap = value => {
    const selectedTopicCode = topicCodeMap[value];
    return selectedTopicCode;
  };
  const toggleCheckbox = value => {
    const isChecked =
      checkedBoxes.includes(value) &&
      selectedTopics.includes(valueToCodeMap(value));
    if (isChecked) {
      setCheckedBoxes(checkedBoxes.filter(box => box !== value));
      setSelectedTopics(
        selectedTopics.filter(box => box !== valueToCodeMap(value)),
      );
    } else {
      setCheckedBoxes([...checkedBoxes, value]);
      setSelectedTopics([...selectedTopics, valueToCodeMap(value)]);
    }
    console.log(selectedTopics);
  };

  const settingComplete = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData == null) {
      return;
    }
    const tokenData = JSON.parse(userData);
    console.log('whole data: ', route.params, checkedBoxes);

    const url = `${apiServer}/additional-info`;
    const data = {
      accessToken: tokenData.accessToken,
      birth: birthday,
      categories: selectedTopics,
      introduction: introduction,
      gender: gender,
      languages: interestLanguages,
      nationality: nation,
      nickName: nickname,
    };
    console.log('post data: ', data);
    await new RESTAPIBuilder(url, 'POST')
      .setNeedToken(true)
      .setBody(data)
      .build()
      .run()
      .then(({data}) => {
        console.log(data);
        navigation.reset({
          index: 0,
          routes: [{name: 'BottomTab'}],
        });
      })
      .catch(err => {
        console.log(err);
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
          width: '100%',
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
          {language.language == LANGUAGE.KO
            ? '관심주제를\n1개 이상 선택해 주세요.'
            : 'Select at least one\ntopic of interest.'}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.mainContainer}>
          {checkBoxValues.map((value, index) => (
            <View style={styles.checkBoxContainer} key={index}>
              <TouchableOpacity
                style={
                  checkedBoxes.includes(value)
                    ? styles.selected
                    : styles.imageContainer
                }
                onPress={() => toggleCheckbox(value)}>
                <Image
                  source={images[index]}
                  style={styles.image}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={styles.buttonText}>{value}</Text>
            </View>
          ))}
        </View>
        {checkedBoxes.length > 0 ? (
          <TouchableOpacity
            style={styles.nextButton1}
            onPress={settingComplete}>
            <Text
              style={{
                color: '#FFFFFF',

                fontSize: height * 18,
                fontWeight: '600',
              }}>
              설정완료
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
              설정완료
            </Text>
          </View>
        )}
      </ScrollView>
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
    marginTop: height * 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  checkBoxContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: width * 5,
    width: '30%',
    marginBottom: height * 25,
  },
  imageContainer: {
    width: width * 80,
    height: height * 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    borderColor: '#9BD23C',
    borderWidth: 6,
    width: width * 100,
    height: height * 100,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 90,
    height: height * 90,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    marginTop: height * 5,
    color: '#303030',

    fontSize: height * 16,
    fontWeight: '500',
  },
  nextButton1: {
    marginTop: height * 20,
    marginBottom: height * 50,
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
    marginTop: height * 20,
    marginBottom: height * 50,
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

export default InterestTopicSettingPage;
