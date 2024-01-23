import React, {useCallback, useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import BoardList from '../components/BoardList';
import NothingShow from '../components/NothingShow';
import {apiServer} from '../utils/metaData';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import {useFocusEffect} from '@react-navigation/native';
import {ClubInfo, OwnClubInfo, ReviewList} from '../utils/commonInterface';
import {width, height, DeviceWidth} from '../global';
import UploadImageTest from '../components/UploadImageTest';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import ProfileSettingIcon from 'react-native-vector-icons/SimpleLineIcons';
import SettingIcon from 'react-native-vector-icons/SimpleLineIcons';

export function MyPage({navigation}: any) {
  const [myPageInfo, setMyPageInfo] = useState([]);
  const [participatedClub, setParticipatedClub] = useState<ClubInfo[]>([]);
  const [myOwnClub, setMyOwnClub] = useState<OwnClubInfo[]>([]);
  const [reviewList, setReviewList] = useState<ReviewList[]>([]);
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await initialize();
        await ParticipatedClubInfo();
        await getOwnClub();
        // await getReview();
      };

      fetchData();
    }, []),
  );

  const urlOwn = `${apiServer}/api/v1/club/approval/my-own-club?cursor=`;
  const Nothing = ({text}: {text: string}) => {
    return <NothingShow title={text} styleKiwe={styleKiwe} />;
  };
  const styleKiwe = StyleSheet.create({
    image: {
      height: height * 300,
    },
    text: {
      fontSize: height * 20,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 1)',
      margin: 10,
    },
  });

  const navigateToClub = (clubId: any) => {
    navigation.navigate('ClubPage', {clubId: clubId});
  };
  const initialize = async () => {
    const url = `${apiServer}/mypage`;
    const result = await new RESTAPIBuilder(url, 'GET')
      .setNeedToken(true)
      .build()
      .run()
      .catch(err => console.log(err));

    if (result) {
      setMyPageInfo(result.data);
      console.log(result.data);
    }
  };
  const ParticipatedClubInfo = async () => {
    const url = `${apiServer}/api/v1/club/approval/my-club?cursor=0`;
    const {data} = await new RESTAPIBuilder(url, 'GET')
      .setNeedToken(true)
      .build()
      .run()
      .catch(err => console.log(err));

    console.log('participate : ', data);
    setParticipatedClub(data);
  };
  const getOwnClub = async () => {
    const url = `${apiServer}/api/v1/club/approval/my-own-club?cursor=0`;
    const {data} = await new RESTAPIBuilder(url, 'GET')
      .setNeedToken(true)
      .build()
      .run()
      .catch(err => console.log(err));

    console.log('own : ', data);
    setMyOwnClub(data);
  };
  // const getReview = async () => {
  //   const url = `${apiServer}/api/v1/review/entire/${clubId}`;
  //   const result = await new RESTAPIBuilder(url, 'GET')
  //     .setNeedToken(true)
  //     .build()
  //     .run()
  //     .catch(err => console.log(err));

  //   if (result) {
  //     setReviewList(result.data);
  //     console.log(result.data);
  //   }
  // };
  ///////////////////////////////////////////////////////// middle Tab
  const [selectedOption, setOption] = useState('참여 모임');
  const handleOptionSelection = option => {
    setOption(option);
    // console.log(nation);
  };

  const optionButton = option => (
    <View>
      {selectedOption === option && styles.optionButton ? (
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.optionButton,
            option === '개설 모임'
              ? {borderRightWidth: 3, borderLeftWidth: 3}
              : null,
          ]}
          onPress={() => {
            handleOptionSelection(option);
          }}>
          <Text
            style={{
              color: '#303030',
              fontFamily: 'Pretendard',
              fontSize: width * 14,
              fontWeight: '800',
            }}>
            {option}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.optionButton,
            option === '개설 모임'
              ? {borderRightWidth: 3, borderLeftWidth: 3}
              : null,
          ]}
          onPress={() => handleOptionSelection(option)}>
          <Text
            style={{
              color: '#8A8A8A',
              fontFamily: 'Pretendard',
              fontSize: width * 14,
              fontWeight: '600',
            }}>
            {option}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
  /////////////////////////////////////////////////////////////////////// gridView
  const handleParticipateClubIconSelection = clubId => {
    console.log(clubId);
  };
  const participatedClubIcon = clubId => (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.optionButton}
      onPress={() => {
        handleParticipateClubIconSelection(clubId);
      }}></TouchableOpacity>
  );
  ///////////////////////////////////////////////////////////////// ownClub

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ProfileSettingIcon.Button
          backgroundColor="#FFFFFF"
          iconStyle={{marginRight: 0, padding: 0}}
          borderRadius={3}
          name="pencil"
          color="#303030"
          size={25}
          onPress={() => {
            navigation.navigate('ProfileSettingPage');
          }}
        />
        <SettingIcon.Button
          backgroundColor="#FFFFFF"
          iconStyle={{marginRight: 5, padding: 0}}
          borderRadius={3}
          name="settings"
          color="#303030"
          size={25}
          onPress={() => {
            navigation.navigate('SettingPage');
          }}
        />
      </View>
      <View style={styles.myInfoContainer}>
        <View>
          <Image
            source={{uri: myPageInfo.profileImage}}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={{marginTop: height * 15}}>
          <Text style={styles.profileText}>{myPageInfo.nickname}</Text>
        </View>
        <View style={{marginVertical: height * 3, flexDirection: 'row'}}>
          <Text style={styles.profileText}>
            {myPageInfo.nationality}&nbsp;&nbsp;
            {myPageInfo.age}&nbsp;&nbsp;
            {myPageInfo.gender}
          </Text>
        </View>
        <View style={{width: width * 250}}>
          <Text style={styles.profileText}>{myPageInfo.introduction}</Text>
        </View>
      </View>
      <View style={styles.optionGroup}>
        {optionButton('참여 모임')}
        {optionButton('개설 모임')}
        {optionButton('후기')}
      </View>
      <View style={styles.mainContainer}>
        {selectedOption === '참여 모임' ? (
          <View>
            {participatedClub?.map((club: ClubInfo) => {
              return <View>{participatedClubIcon({clubId: club.clubId})}</View>;
            })}
            <Text>참여</Text>
          </View>
        ) : selectedOption === '개설 모임' ? (
          <SafeAreaView style={{flex: 1}}>
            <BoardList
              url={urlOwn}
              navigateToClub={navigateToClub}
              Nothing={Nothing}
            />
          </SafeAreaView>
        ) : (
          // <View>
          //   <BoardList
          //     url={`${apiServer}/api/v1/heart/club_list?cursor=`}
          //     navigateToClub={navigateToClub}
          //     Nothing={Nothing}
          //   />
          // </View>
          <View>
            <Text>후기</Text>
          </View>
        )}
      </View>
      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate('Search');
        }}>
        <Text>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SettingPage');
        }}>
        <Text>Setting</Text>
      </TouchableOpacity>
      <View style={{marginTop: 100}}>
        <UploadImageTest />
      </View>
      <GooglePlacesAutocomplete
        styles={{
          textInput: {
            backgroundColor: '#F7F7F7', // 이 부분에 원하는 색상을 입력하세요.
          },
        }}
        placeholder="모임 장소를 검색해주세요"
        minLength={2}
        keyboardShouldPersistTaps={'handled'}
        fetchDetails={false}
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
        keepResultsAfterBlur={true}
        enablePoweredByContainer={false}
        onPress={(data, details = null) => {}}
        query={{
          key: 'AIzaSyBlRgYCAJwXVcFYQ2HVG1C0jBFCwwX3BDA',
          language: 'en',
        }}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: height * 5,
    marginBottom: height * 30,
  },
  myInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 25,
  },
  image: {
    width: width * 100,
    height: height * 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80,
  },
  profileText: {
    color: '#303030',
    fontFamily: 'Pretendard',
    fontSize: width * 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  optionGroup: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  optionButton: {
    borderColor: '#DADADA',
    borderBottomWidth: 3,
    width: DeviceWidth / 3,
    height: height * 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    height: height * 350,
  },
  participatedClubIcon: {
    backgroundColor: '#DADADA',
    width: DeviceWidth / 3,
    height: height * 70,
  },
});

export default MyPage;
