import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  NativeModules,
  Platform,
} from 'react-native';
import Text from '@components/atoms/Text';
import optionIcon from 'react-native-vector-icons/SimpleLineIcons';
import backIcon from 'react-native-vector-icons/Ionicons';
import exitIcon from 'react-native-vector-icons/MaterialIcons';
import banIcon from 'react-native-vector-icons/FontAwesome';
import kickIcon from 'react-native-vector-icons/FontAwesome6';
import sendIcon from 'react-native-vector-icons/Feather';
import {width, height} from '../global';
import Modal from 'react-native-modal';
import {io} from 'socket.io-client';
import ErrorModal from '../components/errorModal';
import KickModal from '../components/kickedOutModal';
import ExitModal from '../components/exitModal';
import ExitFailModal from '../components/exitFailModal';

import {apiServer, chatServer} from '../utils/metaData';
import ChatBubbleOther from './ChatBubbleOther';
import ChatBubbleMine from './ChatBubbleMine';
import ChatBubbleSystem from './ChatBubbleSystem';
import {ScrollView} from 'react-native-gesture-handler';
import {Chat, ClubMember, ClubSimpleData} from '../utils/commonInterface';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChessKing, faUser} from '@fortawesome/free-solid-svg-icons';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
// import {Buffer} from 'buffer';

const initUser = {
  nickName: '',
  id: 1,
};

interface KickedUser {
  isVisible: boolean;
  id: number;
  name: string;
}
const initKickedUser = {
  isVisible: false,
  id: 0,
  name: '',
};
const {StatusBarManager} = NativeModules;

const ChatScreen = ({navigation, route}) => {
  /* 사용 코드*/
  const [clubId, setClubId] = useState(route.params?.clubId ?? 0);
  const [clubData, setClubData] = useState<ClubSimpleData | null>(null);
  const [clubMembers, setClubMembers] = useState<any>({});
  const [user, setUser] = useState(initUser);

  const [notice, setNotice] = useState('');
  // const buffer = new Buffer(notice, 'utf-8');

  const [sendText, setSendText] = useState('');
  const [messages, setMessages] = useState<Chat[]>([
    // {
    //   userId: 0,
    //   msg: '테스트 사용자 님이 입장하셨습니다.',
    //   time: '오후 4:35',
    // },
    // {userId: 2, msg: 'hello?', time: '2023-10-13 12:58'},
    // {userId: 8, msg: ':D', time: '2023-10-13 12:58'},
    // {userId: 2, msg: 'oh hi!', time: '2023-10-13 12:58'},
    // {userId: 8, msg: ':(', time: '2023-10-13 12:59'},
    // {userId: 8, msg: ';0', time: '2023-10-13 12:59'},
    // {userId: 2, msg: ' 😁😁😁😁😁', time: '2023-10-13 12:59'},
    // {userId: 8, msg: '😁😁😁', time: '2023-10-13 12:59'},
    // {userId: 2, msg: 'hello everyone', time: '2023-10-13 13:00'},
    // {userId: 2, msg: 'listen carefully', time: '2023-10-13 13:00'},
    // {userId: 8, msg: 'wakwak', time: '2023-10-13 13:00'},
    // {userId: 8, msg: 'did fd', time: '2023-10-13 13:00'},
    // {
    //   userId: 3,
    //   msg: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
    //   time: '2023-10-13 13:01',
    // },
    // {userId: 8, msg: '귤이 두 명이면 뀰', time: '2023-10-13 13:01'},
    // {
    //   userId: 2,
    //   msg: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
    //   time: '2023-10-13 13:06',
    // },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isTextInputFocused, setTextInputFocused] = useState(false);
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const [isKickModalVisible, setKickModalVisible] = useState(false);
  const [isExitModalVisible, setExitModalVisible] = useState(false);
  const [isExitFailModalVisible, setExitFailModalVisible] = useState(false);
  const [isKickMode, setKickMode] = useState(false);

  const [kickedData, setKickedData] = useState<KickedUser>(initKickedUser);
  const socket = useRef();
  const chatScrollRef = useRef<ScrollView>(null);

  const DATA_PER_PAGE = 20;
  const [page, setPage] = useState(1);
  const [displayData, setDisplayData] = useState(
    messages.slice(0, DATA_PER_PAGE * page),
  );

  const loadMoreData = () => {
    const nextPage = page + 1;

    setDisplayData(messages.slice(0, DATA_PER_PAGE * nextPage));
    setPage(nextPage);
  };

  const [statusBarHeight, setStatusBarHeight] = useState(height);

  useEffect(() => {
    Platform.OS == 'ios' &&
      StatusBarManager.getHeight((statusBarFrameData: any) => {
        setStatusBarHeight(height + statusBarFrameData.height);
      });
  }, []);

  const initialize = async () => {
    console.log('initialize chat');
    const urlClub = `${apiServer}/api/v1/club/info/simple/${clubId}`;
    const {data} = await new RESTAPIBuilder(urlClub, 'GET')
      .setNeedToken(true)
      .build()
      .run()
      .catch(err => {
        console.log(err);
      });
    if (!data) {
      return;
    }

    setClubData(data);

    const hostData = {
      id: data.hostId,
      nickName: data.hostNickname,
      thumbnail: data.hostThumbnailImage,
    };

    let newArr: any = {};
    newArr[data.hostId] = hostData;
    data.members.forEach((m: ClubMember) => {
      newArr[m.id] = {...m};
    });
    setClubMembers(newArr);

    const urlMyInfo = `${apiServer}/myid`;
    const {data: dataMyInfo} = await new RESTAPIBuilder(urlMyInfo, 'GET')
      .setNeedToken(true)
      .build()
      .run()
      .catch(err => {
        console.log(err);
      });

    if (dataMyInfo) {
      console.log('Data My Info : ', dataMyInfo);
      setUser(dataMyInfo);
    }
  };

  useEffect(() => {
    console.log('------------------------------------');
    initialize();
    socket.current = io(chatServer);
    socket.current.on('connect', () => {
      socket.current?.emit('enter', {roomID: clubId, userId: user.id});
    });
    //////////////////////////////////////////////////////////////////// 공지
    socket.current?.on('notice', (data: any) => {
      console.log('data : ', data);
      setNotice(data.msg);
      console.log('Notice : ', data.msg);
    });
    ////////////////////////////////////////////////////////////////////

    socket.current?.on('sendMSG', data => {
      messages.unshift(data);
      setMessages(prev => {
        return [data, ...prev];
      });
      const nextPage = 1;
      // console.log(messages);
      // console.log(messages.slice(0, DATA_PER_PAGE * nextPage));
      setDisplayData(messages.slice(0, DATA_PER_PAGE * nextPage));
      setPage(nextPage);
    });
    socket.current?.on('msgList', data => {
      console.log('msgList get Data');
      const chat = data.chat;
      const reverseChat = chat.reverse();
      setMessages(reverseChat); //채팅반대로
      setDisplayData(reverseChat.slice(0, DATA_PER_PAGE * 1));
      // console.log(chat);
    });
    socket.current?.on('kickedout', data => {
      // data = {userId: 1}// 강퇴당한 사람이 1이다.
      if (data.userId == user.id) {
        // 내가 강퇴를 당했을 경우
      } else {
        setClubData(prev => {
          if (prev == null) return null;

          let members = prev?.members.filter(m => m.id != data.userId) || [];
          return {...prev, members};
        });
      }
    });
    socket.current?.on('error', data => {
      console.log('errrr');

      // 네트워크 에러
    });
    return () => {
      socket.current?.disconnect();
    };
  }, []);
  useEffect(() => {
    chatScrollRef.current?.scrollToEnd({animated: true});
  }, [messages]);
  // useEffect(() => {
  //   console.log(displayData);
  // }, [displayData]);

  const colorList = [
    '#3196E8',
    '#EB28D7',
    '#82EB2D',
    'black',
    '#ED843B',
    '#EB852D',
    '#28C5EB',
    '#9E28EB',
  ];
  const colorMap: {
    [key: string]: string;
  } = {};
  const thumbnail: {
    [key: string]: string;
  } = {};

  const sendMSG = () => {
    const newMessage = {
      msg: sendText,
      userId: user?.id,
    };
    socket.current.emit('sendMSG', newMessage);
    setSendText('');
    // Keyboard.dismiss();
  };

  const kickUser = (id: number, name: string) => {
    socket.current?.emit('kickedout', {name, userId: id});

    let members = clubData?.members.filter(m => m.id != id) || [];
    setClubData({...clubData, members});

    delete clubMembers[id];
    setClubMembers({...clubMembers});
  };

  const exitClub = async () => {
    await socket.current.emit('exit', {name: user.nickName});

    const url = `${apiServer}/api/v1/club/application/${clubId}`;
    await new RESTAPIBuilder(url, 'DELETE')
      .setNeedToken(true)
      .build()
      .run()
      .then(() => {
        navigation.pop();
      })
      .catch(err => console.log(err));
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleErrorModal = () => {
    setErrorModalVisible(!isErrorModalVisible);
  };
  const toggleKickModal = (id: number) => {
    if (id != 0)
      setKickedData({
        id,
        name: clubMembers[id].nickName,
        isVisible: !kickedData.isVisible,
      });
    else {
      setKickedData({
        ...kickedData,
        isVisible: !kickedData.isVisible,
      });
    }
  };
  const toggleExitModal = () => {
    setExitModalVisible(!isExitModalVisible);
  };
  const toggleExitFailModal = () => {
    setExitFailModalVisible(!isExitFailModalVisible);
  };
  const kickModeOn = () => {
    setKickMode(!isKickMode);
  };

  const [keyboardStatus, setKeyboardStatus] = useState('20');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('0');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('20');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const renderItem = ({item}: any) => {
    const message = item;

    if (message.userId == 0) {
      return (
        <View style={styles.chatBubble}>
          <ChatBubbleSystem chat={message} />
        </View>
      );
    } else if (message.userId === user.id) {
      return (
        <View style={styles.chatBubble}>
          <ChatBubbleMine
            chat={message}
            isHost={user.id === clubData?.hostId ? true : true}
            noticeChat={(notice: string) => setNotification(notice)}
          />
        </View>
      );
    } else {
      if (colorMap[message.userId] == undefined) {
        let num = Object.keys(colorMap).length;
        if (num == colorList.length) num = num - colorList.length;
        colorMap[message.userId] = colorList[num];
      }

      let writer = '(알수없음123)';
      let thumbnail =
        'https://kiwes2-bucket.s3.ap-northeast-2.amazonaws.com/profileimg/profile.jpg';
      if (clubMembers[message.userId]) {
        writer = clubMembers[message.userId].nickName;
        thumbnail = clubMembers[message.userId].thumbnail;
      }

      return (
        <View style={styles.chatBubble}>
          <ChatBubbleOther
            writer={writer}
            chat={message}
            thumbnail={thumbnail}
            color={colorMap[message.userId]}
            isHost={user.id === clubData?.hostId ? true : true}
            noticeChat={(notice: string) => setNotification(notice)}
          />
        </View>
      );
    }
  };

  /////////////////////////////////////////////////////////////// 공지
  const setNotification = (notice: string) => {
    const newNotice = {
      msg: notice,
    };
    socket.current.emit('notice', newNotice);
  };
  ///////////////////////////////////////////////////////////////

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <backIcon.Button
          backgroundColor="#FFFFFF"
          iconStyle={{marginRight: 0, padding: 5}}
          borderRadius={3}
          name="arrow-back"
          color="#303030"
          size={25}
          onPress={() => navigation.pop()}
        />
        <Text style={styles.headerText}>{clubData?.title || '모임'}</Text>
        <optionIcon.Button
          backgroundColor="#FFFFFF"
          iconStyle={{marginRight: 0, padding: 5}}
          borderRadius={3}
          name="options-vertical"
          color="#303030"
          size={25}
          onPress={toggleModal}
        />
      </View>
      {/* ///////////////////////////////////////////////////////// 공지 */}
      <View style={styles.notice}>
        <Text
          style={{
            color: '#8A8A8A',
            fontSize: height * 18,
            fontWeight: '600',
          }}>
          공지
        </Text>
        <Text
          style={{
            color: '#303030',
            fontSize: height * 16,
            fontWeight: '600',
          }}>
          &nbsp;&nbsp;
          {notice}
          {/* {buffer.length > 46 ? notice.slice(0, 23) + '...' : notice} */}
          {/* {buffer.length} */}
        </Text>
      </View>
      {/* ///////////////////////////////////////////////////////////// */}
      <View style={styles.separator} />
      <TouchableWithoutFeedback>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={keyboardStatus}
          style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <FlatList
            // contentContainerStyle={styles.contentContainer}
            data={displayData}
            keyExtractor={(item, index) => item.msg + item.time}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.1}
            // data={messages}
            renderItem={renderItem}
            automaticallyAdjustContentInsets={false}
            inverted={true}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="never"
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
              autoscrollToTopThreshold: 80,
            }}
            automaticallyAdjustKeyboardInsets={true}
          />
          <View style={chatInputStyle.inputContainer}>
            <View style={{width: '80%'}}>
              <TextInput
                style={chatInputStyle.input}
                onChangeText={text => {
                  setSendText(text);
                }}
                value={sendText}
              />
            </View>
            <View
              style={{
                height: height * 50,
                marginLeft: 10,
              }}>
              <sendIcon.Button
                backgroundColor="#FFFFFF"
                iconStyle={{margin: 0, padding: 0}}
                name="send"
                color="#8A8A8A"
                size={height * 30}
                onPress={sendMSG}
              />
            </View>
          </View>
        </KeyboardAvoidingView>

        {/* <View style={{flex: 1}}>
        <FlatList
            // contentContainerStyle={styles.contentContainer}
            data={displayData}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.1}
            // data={messages}
            renderItem={renderItem}
            automaticallyAdjustContentInsets={false}
            inverted={true}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="never"
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
              autoscrollToTopThreshold: 80,
            }}
            automaticallyAdjustKeyboardInsets={true}
          />
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={statusBarHeight + 44}
            // keyboardVerticalOffset={150}
            style={chatInputStyle.bottomContainer}>
            <TextInput
              placeholder={'Add Message'}
              onChangeText={text => {
                setSendText(text);
              }}
              value={sendText}
            />
            {/* <TextInput
              style={chatInputStyle.input}
              placeholder={'Add Message'}
              onChangeText={text => {
                setSendText(text);
              }}
              value={sendText}></TextInput>
            <Pressable onPress={sendMSG} disabled={sendText == ''}>
              <Text style={chatInputStyle.send}>Send</Text>
            </Pressable> */}
        {/* </KeyboardAvoidingView>
        </View> */}
      </TouchableWithoutFeedback>
      {/* <TouchableWithoutFeedback>
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={true}
          ref={chatScrollRef}>
          {messages.map((message, i) => {
            if (message.userId == 0) {
              return (
                <View
                  key={`chat_${message.userId}_${i}`}
                  style={styles.chatBubble}>
                  <ChatBubbleSystem chat={message} />
                </View>
              );
            } else if (message.userId === user.id) {
              return (
                <View
                  key={`chat_${message.userId}_${i}`}
                  style={styles.chatBubble}>
                  <ChatBubbleMine chat={message} />
                </View>
              );
            } else {
              if (colorMap[message.userId] == undefined) {
                let num = Object.keys(colorMap).length;
                if (num == colorList.length) num = num - colorList.length;
                colorMap[message.userId] = colorList[num];
              }

              let writer = '(알수없음)';
              if (clubMembers[message.userId])
                writer = clubMembers[message.userId].nickName;

              return (
                <View
                  key={`chat_${message.userId}_${i}`}
                  style={styles.chatBubble}>
                  <ChatBubbleOther
                    writer={writer}
                    chat={message}
                    color={colorMap[message.userId]}
                  />
                </View>
              );
            }
          })}
        </ScrollView>
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        style={styles.bottomContainer}
        behavior="padding"
        enabled>
        <TextInput
          style={styles.input}
          placeholder={'Add Message'}
          onChangeText={text => {
            setSendText(text);
          }}
          onFocus={() => {
            chatScrollRef.current?.scrollToEnd({animated: true});
          }}
          value={sendText}></TextInput>
        <Pressable onPress={sendMSG} disabled={sendText == ''}>
          <Text style={styles.send}>Send</Text>
        </Pressable>
      </KeyboardAvoidingView> */}
      <Modal
        isVisible={isModalVisible}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
        onBackdropPress={toggleModal}
        style={styles.modal}>
        <SafeAreaView style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>대화상대</Text>
          </View>
          <ScrollView>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={styles.hostMember}
                onPress={() => {
                  toggleModal();
                  navigation.navigate('OtherUserPage', {
                    memberId: clubData?.hostId,
                  });
                }}>
                <Image
                  source={{uri: clubData?.hostThumbnailImage}}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.modalText}>{clubData?.hostNickname}</Text>
              </TouchableOpacity>
              <View style={{justifyContent: 'center', marginRight: width * 20}}>
                <FontAwesomeIcon
                  style={styles.icon}
                  icon={faChessKing}
                  size={25}
                  color={'#58C047'}
                />
              </View>
            </View>
            {clubData?.members.map((member, i) => {
              return (
                <TouchableOpacity
                  key={`member_${member.id}_${i}`}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  onPress={() => {
                    toggleModal();
                    navigation.navigate('OtherUserPage', {memberId: member.id});
                  }}>
                  <View style={styles.memberList}>
                    <Image
                      source={{uri: member.thumbnail}}
                      style={styles.image}
                      resizeMode="cover"
                    />
                    <Text style={styles.modalText}>{member.nickName}</Text>
                  </View>
                  {isKickMode == true ? (
                    <View style={styles.kickButton}>
                      <kickIcon.Button
                        backgroundColor="#FFFFFF"
                        iconStyle={{margin: 0, padding: 0}}
                        name="xmark"
                        color="#303030"
                        size={25}
                        onPress={() => {
                          toggleKickModal(member.id);
                        }}
                      />
                    </View>
                  ) : (
                    <View />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={styles.modalBottomContainer}>
            <exitIcon.Button
              // style={styles.exitButton}}
              backgroundColor="#FFFFFF"
              iconStyle={{marginRight: 0, padding: 5}}
              name="logout"
              color="#303030"
              size={25}
              onPress={
                user.id !== clubData?.hostId
                  ? toggleExitModal
                  : toggleExitFailModal
              }
            />
            {user.id === clubData?.hostId && (
              <banIcon.Button
                backgroundColor="#FFFFFF"
                iconStyle={{marginRight: 0, padding: 5}}
                name="ban"
                color="#303030"
                size={25}
                onPress={kickModeOn}
              />
            )}
          </View>
        </SafeAreaView>
      </Modal>
      <ErrorModal isVisible={isErrorModalVisible} onClose={toggleErrorModal} />
      <KickModal
        onClose={toggleKickModal}
        kickedData={kickedData}
        kickUser={kickUser}
        clubId={clubId}
      />
      <ExitModal
        isVisible={isExitModalVisible}
        onClose={toggleExitModal}
        name={user.nickName}
        exitClub={exitClub}
      />
      <ExitFailModal
        isVisible={isExitFailModalVisible}
        onClose={toggleExitFailModal}
      />
    </SafeAreaView>
  );
};

const chatInputStyle = StyleSheet.create({
  inputContainer: {
    borderTopColor: '#EDEDED',
    borderTopWidth: 2,
    padding: 20,
    paddingRight: 5,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#8A8A8A',
    borderRadius: 20,
    backgroundColor: '#EDEDED',
    padding: 5,
    paddingLeft: 10,

    fontSize: height * 13,
    fontWeight: '400',
    marginTop: 5,
    height: height * 35,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
const styles = StyleSheet.create({
  bottomContainer: {
    marginHorizontal: height * 10,
    flexDirection: 'row',
    marginBottom: height * 10,
  },
  hostMember: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: height * 17,
    paddingBottom: height * 17,
    marginLeft: width * 17,
    marginRight: width * 17,
    alignItems: 'center',
  },
  memberList: {
    paddingTop: height * 17,
    paddingBottom: height * 17,
    flexDirection: 'row',
    marginLeft: width * 17,
    alignItems: 'center',
  },
  kickButton: {
    justifyContent: 'center',
    marginRight: width * 15,
  },
  icon: {
    marginRight: width * 10,
  },
  chatBubble: {
    marginBottom: height * 15,
  },
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  separator: {
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: width * 10,
    height: height * 70,
    // marginBottom: height * 5,
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1.5,
  },
  headerText: {
    color: '#303030',
    fontSize: height * 20,
    fontWeight: '600',
  },
  notice: {
    height: height * 60,
    paddingLeft: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: width * 30,
    height: height * 30,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    alignSelf: 'flex-end',
    margin: 0,
    width: width * 310,
    backgroundColor: '#FFFFFF',
  },
  modalView: {
    flex: 1,
  },
  modalHeader: {
    height: height * 60,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: width * 22,
  },
  modalHeaderText: {
    color: '#5F5F5F',
    fontSize: height * 20,
    fontWeight: '600',
  },
  modalText: {
    color: '#303030',
    fontSize: height * 15,
    fontWeight: '600',
  },
  userListContainer: {
    height: height * 640,
  },
  modalBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ChatScreen;
