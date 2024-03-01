import React, {useCallback, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Text from '@components/atoms/Text';
import {width, height} from '../global';
import {apiServer} from '../utils/metaData';
import {ClubInfo} from '../utils/commonInterface';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {useFocusEffect} from '@react-navigation/native';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import {ScrollView} from 'react-native-gesture-handler';

export function ChatMain({navigation}: any) {
  const [roomList, setRoomList] = useState<ClubInfo[]>([]);
  useFocusEffect(
    useCallback(() => {
      initialize();
    }, []),
  );
  const initialize = async () => {
    const url = `${apiServer}/api/v1/club/approval/my-club`;
    const result = await new RESTAPIBuilder(url, 'GET')
      .setNeedToken(true)
      .build()
      .run()
      .catch(err => console.log(err));

    if (result) {
      console.log(result.data);
      setRoomList(result.data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        // translucent={true}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>CHAT</Text>
      </View>
      {roomList.length > 0 ? (
        <>
          <View style={styles.notificationContainer}>
            <Text style={styles.alert}>!</Text>
            <Text style={styles.notification}>
              지정된 모임 날짜 14일 후에는 채팅방이 자동으로 삭제됩니다
            </Text>
          </View>
          <ScrollView>
            {roomList.map((club: ClubInfo, index) => {
              return (
                <View key={index} style={styles.chatList}>
                  <TouchableOpacity
                    style={styles.title}
                    onPress={() => {
                      navigation.navigate('ChatRoom', {clubId: club.clubId});
                    }}>
                    <Text style={styles.chatListText} numberOfLines={1}>
                      {club.title}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.peopleCount}>
                    <FontAwesomeIcon icon={faUser} size={25} color="black" />
                    <Text style={styles.peopleCountText}>
                      {club.currentPeople}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Image
            source={require('../../assets/images/soSad.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.chatroomContainerText}>채팅 내역이 없습니다</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  header: {
    marginTop: height * 14,
    marginLeft: 10,
    paddingTop: height * 10,
    paddingLeft: width * 10.5,
    height: height * 54,
  },
  headerText: {
    color: '#303030',
    fontSize: height * 24,
    // font-style: normal,
    fontWeight: '700',
  },
  chatroomContainer: {
    height: height * 620,
    backgroundColor: '#58C047',
    borderBottomColor: '#C0C0C0',
    borderBottomWidth: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height: DeviceHeight - height * 200,
    // backgroundColor: '#58C047',
    borderBottomColor: '#C0C0C0',
    borderBottomWidth: 2,
    paddingBottom: height * 100,
  },
  notificationContainer: {
    flexDirection: 'row',
    marginTop: height * 16,
    paddingVertical: height * 5,
    paddingLeft: 5,
    paddingRight: 5,
    height: 'auto',
    borderTopColor: '#C0C0C0',
    borderBottomColor: '#C0C0C0',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  alert: {
    marginLeft: 0,
    marginRight: width * 4,
    color: '#58C047',

    fontSize: height * 17,
    fontWeight: 'bold',
  },
  notification: {
    color: '#58C047',
    fontSize: height * 14,
    fontWeight: '600',
  },
  image: {
    width: width * 171,
    height: height * 240,
  },
  chatroomContainerText: {
    color: '#303030',
    fontSize: height * 16,
    // font-style: normal,
    fontWeight: '600',
  },
  chatList: {
    padding: 20,
    flexDirection: 'row',
  },
  title: {
    width: width * 290,
  },
  chatListText: {
    marginRight: width * 20,
    color: '#303030',
    fontSize: height * 16,
    fontWeight: '600',
  },
  peopleCount: {
    flexDirection: 'row',
  },
  peopleCountText: {
    marginLeft: 15,
    color: '#3DBE14',

    fontSize: height * 16,
    fontWeight: '600',
  },
  bottomNavigate: {
    flexDirection: 'row',
    width: '100%',
    // height: height * 64,
    paddingTop: height * 10,
    // justifyContent: 'space-around',
    // paddingHorizontal: 20,
    paddingVertical: 10,
    // backgroundColor: '#0785F2',
  },
  contentContainer: {
    width: '100%',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButton: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ChatMain;
