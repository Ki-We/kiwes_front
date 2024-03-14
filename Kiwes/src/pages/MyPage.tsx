import React, {useCallback, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import BoardList from '../components/BoardList';
import NothingShow from '../components/NothingShow';
import ReviewBubble from './ReviewBubble';
import {apiServer} from '../utils/metaData';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import {useFocusEffect} from '@react-navigation/native';
import {ParticipatedClubInfo, ReviewList} from '../utils/commonInterface';
import {width, height, DeviceWidth} from '../global';
import ProfileSettingIcon from 'react-native-vector-icons/SimpleLineIcons';
import SettingIcon from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Text from '@components/atoms/Text';

export function MyPage({navigation}: any) {
  const [myPageInfo, setMyPageInfo] = useState([]);
  const [participatedClub, setParticipatedClub] = useState<
    ParticipatedClubInfo[]
  >([]);
  // const [myOwnClub, setMyOwnClub] = useState<OwnClubInfo[]>([]);
  const [reviewList, setReviewList] = useState<ReviewList[]>([]);
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await initialize();
      };
      fetchData();
    }, []),
  );

  const urlOwn = `${apiServer}/api/v1/club/approval/host-club-detail/${myPageInfo.id}?cursor=`;
  const Nothing = ({text}: {text: string}) => {
    return <NothingShow title={text} styleKiwe={styleKiwe} />;
  };
  const styleKiwe = StyleSheet.create({
    image: {
      height: height * 250,
    },
    text: {
      fontSize: height * 15,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 1)',
      margin: 10,
    },
  });

  const navigateToClub = (clubId: any) => {
    navigation.navigate('ClubDetail', {clubId: clubId});
  };
  const initialize = async () => {
    const url = `${apiServer}/mypage`;
    const {data} = await new RESTAPIBuilder(url, 'GET')
      .setNeedToken(true)
      .build()
      .run()
      .catch(err => console.log(err));
    getParticipatedClubInfo(data.id);
    getReview(data.id);
    setMyPageInfo(data);
  };
  const getParticipatedClubInfo = async (id: number) => {
    console.log('Mypage : ', myPageInfo);
    const url = `${apiServer}/api/v1/club/approval/my-club-image/${id}`;
    const {data} = await new RESTAPIBuilder(url, 'GET')
      .setNeedToken(true)
      .build()
      .run()
      .catch(err => console.log(err));
    console.log('participate : ', data);
    setParticipatedClub(data);
  };

  const getReview = async (id: number) => {
    const url = `${apiServer}/api/v1/review/${id}`;
    const {data} = await new RESTAPIBuilder(url, 'GET')
      .setNeedToken(true)
      .build()
      .run()
      .catch(err => console.log(err));
    console.log('review : ', data);
    setReviewList(data);
  };
  ///////////////////////////////////////////////////////// middle Tab
  const [selectedOption, setOption] = useState('참여 모임');
  const handleOptionSelection = option => {
    setOption(option);
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

              fontSize: height * 15,
              fontWeight: '600',
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

              fontSize: height * 15,
              fontWeight: '600',
            }}>
            {option}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
  ///////////////////////////////////////////////////////////////// ownClub

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileImageSettingPage');
          }}>
          <Text>프로필 설정 </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NationSettingPage');
          }}>
          <Text> 기본 설정</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ChatTest');
          }}>
          <Text> 채팅 설정</Text>
        </TouchableOpacity>
        <ProfileSettingIcon.Button
          backgroundColor="#FFFFFF"
          iconStyle={{marginRight: 0, padding: 0}}
          borderRadius={3}
          name="pencil"
          color="#303030"
          size={25}
          onPress={() => {
            navigation.navigate('ProfileSettingPage', {
              thumbnailImage: myPageInfo.profileImage,
              myIntroduction: myPageInfo.introduction,
            });
            console.log(myPageInfo.profileImage);
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
            source={{
              uri:
                myPageInfo.profileImage ||
                'https://kiwes2-bucket.s3.ap-northeast-2.amazonaws.com/profileimg/profile.jpg',
            }}
            style={styles.image}
            resizeMode="cover"
          />
          {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* <TouchableOpacity
            onPress={() => {
              console.log(myPageInfo.profileImage);
            }}>
            <Text>dfdf</Text>
          </TouchableOpacity> */}
          {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}
        </View>
        <View style={{marginTop: height * 15}}>
          <Text style={styles.nickNameText}>{myPageInfo.nickname}</Text>
        </View>
        <View
          style={{
            marginVertical: height * 3,
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View style={{marginRight: 10}}>
            {myPageInfo.nationality === 'KOREA' ? (
              <Image
                source={require('../../assets/images/korean.png')}
                style={styles.icon}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require('../../assets/images/foreigner.png')}
                style={styles.icon}
                resizeMode="contain"
              />
            )}
          </View>
          <View>
            <Text style={styles.profileText}>만&nbsp;{myPageInfo.age}세</Text>
          </View>
          <View
            style={{
              marginLeft: 10,
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            {myPageInfo.gender === 'MALE' ? (
              <Icon name="symbol-male" size={15} color="#000" />
            ) : (
              <Icon name="symbol-female" size={15} color="#000" />
            )}
          </View>
        </View>
        <View style={{width: width * 250}}>
          <Text style={styles.introductionText}>{myPageInfo.introduction}</Text>
        </View>
      </View>
      <View style={styles.optionGroup}>
        {optionButton('참여 모임')}
        {optionButton('개설 모임')}
        {optionButton('후기')}
      </View>
      {selectedOption === '참여 모임' ? (
        <>
          {participatedClub.length === 0 ? (
            <View
              style={{
                paddingTop: height * 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/soSad.png')}
                style={{height: height * 250}}
                resizeMode="contain"
              />
              <Text style={styleKiwe.text}>조회 가능한 모임이 없어요!</Text>
            </View>
          ) : (
            <ScrollView>
              <View style={styles.participatedClubIconContainer}>
                {participatedClub?.map((club: ParticipatedClubInfo, index) => {
                  return (
                    <View key={index}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                          navigation.navigate('ClubDetail', {
                            clubId: club.clubId,
                          });
                        }}>
                        <Image
                          source={{uri: club.thumbnailImage}}
                          style={styles.participatedClubIcon}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          )}
        </>
      ) : selectedOption === '개설 모임' ? (
        <View>
          <View style={{height: height * 375}}>
            <BoardList
              url={urlOwn}
              navigateToClub={navigateToClub}
              Nothing={Nothing}
            />
          </View>
        </View>
      ) : (
        <>
          {reviewList.length === 0 ? (
            <View
              style={{
                paddingTop: height * 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/soSad.png')}
                style={{height: height * 250}}
                resizeMode="contain"
              />
              <Text style={styleKiwe.text}>조회 가능한 후기가 없어요!</Text>
            </View>
          ) : (
            <ScrollView>
              <View style={{marginBottom: 20}}>
                {reviewList?.map((review: ReviewList, index) => {
                  return (
                    <View key={index}>
                      <ReviewBubble
                        reviewList={review}
                        navigation={navigation}
                      />
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          )}
        </>
      )}
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
    width: width * 120,
    height: height * 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80,
  },
  icon: {
    width: width * 20,
    height: height * 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nickNameText: {
    color: '#303030',

    fontSize: height * 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  profileText: {
    color: '#303030',

    fontSize: height * 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  introductionText: {
    color: '#303030',

    fontSize: height * 13,
    fontWeight: '400',
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
  participatedClubIconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // alignItems: 'center',
  },
  participatedClubIcon: {
    // backgroundColor: '#303030',
    marginBottom: 2,
    marginHorizontal: 1,
    width: DeviceWidth / 3 - 2,
    height: height * 120,
  },
});

export default MyPage;
