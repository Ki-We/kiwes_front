import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Pressable,
  NativeModules,
  Platform,
} from 'react-native';
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
import {faBan, faChessKing, faUser} from '@fortawesome/free-solid-svg-icons';
import {RESTAPIBuilder} from '../utils/restapiBuilder';

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

  const [sendText, setSendText] = useState('');
  const [messages, setMessages] = useState<Chat[]>([
    {
      userId: 0,
      msg: '테스트 사용자 님이 입장하셨습니다.',
      time: '오후 4:35',
    },
    {userId: 2, msg: 'hello?', time: '2023-10-13 12:58'},
    {userId: 8, msg: ':D', time: '2023-10-13 12:58'},
    {userId: 2, msg: 'oh hi!', time: '2023-10-13 12:58'},
    {userId: 8, msg: ':(', time: '2023-10-13 12:59'},
    {userId: 8, msg: ';0', time: '2023-10-13 12:59'},
    {userId: 2, msg: ' 😁😁😁😁😁', time: '2023-10-13 12:59'},
    {userId: 8, msg: '😁😁😁', time: '2023-10-13 12:59'},
    {userId: 2, msg: 'hello everyone', time: '2023-10-13 13:00'},
    {userId: 2, msg: 'listen carefully', time: '2023-10-13 13:00'},
    {userId: 8, msg: 'wakwak', time: '2023-10-13 13:00'},
    {userId: 8, msg: 'did fd', time: '2023-10-13 13:00'},
    {
      userId: 3,
      msg: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
      time: '2023-10-13 13:01',
    },
    {userId: 8, msg: '귤이 두 명이면 뀰', time: '2023-10-13 13:01'},
    {
      userId: 2,
      msg: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
      time: '2023-10-13 13:06',
    },
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
  const [statusBarHeight, setStatusBarHeight] = useState(height);
  useEffect(() => {
    Platform.OS == 'ios' &&
      StatusBarManager.getHeight((statusBarFrameData: any) => {
        setStatusBarHeight(height + statusBarFrameData.height);
      });
  }, []);

  const initialize = async () => {
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

    console.log(data);
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
      console.log(dataMyInfo);
      setUser(dataMyInfo);
    }
  };

  useEffect(() => {
    console.log('------------------------------------');
    initialize();

    socket.current = io(chatServer);
    socket.current.on('connect', () => {
      console.log('connect');

      socket.current?.emit('enter', {roomID: clubId, userId: user.id});
    });
    socket.current?.on('msgList', data => {
      const chat = data.chat;
      setMessages(chat);
    });
    socket.current?.on('sendMSG', data => {
      console.log('newMessage : ', data);
      setMessages(prev => {
        return [...prev, data];
      });
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
      console.log('error msg : ', data.msg);

      // 네트워크 에러
    });
    return () => {
      socket.current?.disconnect();
    };
  }, []);
  useEffect(() => {
    chatScrollRef.current?.scrollToEnd({animated: true});
  }, [messages]);

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

  const sendMSG = () => {
    const newMessage = {
      msg: sendText,
      userId: user?.id,
    };

    socket.current.emit('sendMSG', newMessage);

    setSendText('');
    Keyboard.dismiss();
  };

  const kickUser = (id: number, name: string) => {
    socket.current?.emit('kickedout', {name, userId: id});

    let members = clubData?.members.filter(m => m.id != id) || [];
    setClubData({...clubData, members});

    delete clubMembers[id];
    setClubMembers({...clubMembers});
  };
  /* 사용 코드 --END-- */

  // useEffect(() => {
  //   // 텍스트 입력 포커스 상태 변경 시 키보드 이벤트를 구독/해제합니다.
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     () => {
  //       setTextInputFocused(true);
  //     },
  //   );
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       setTextInputFocused(false);
  //     },
  //   );

  //   return () => {
  //     keyboardDidShowListener.remove();
  //     keyboardDidHideListener.remove();
  //   };
  // }, []);

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
        <View style={styles.chatBubble}>
          <ChatBubbleOther
            writer={writer}
            chat={message}
            color={colorMap[message.userId]}
          />
        </View>
      );
    }
  };
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
      <View style={styles.separator} />

      <TouchableWithoutFeedback>
        <View style={{flex: 1}}>
          <FlatList
            // contentContainerStyle={styles.contentContainer}
            data={messages}
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
          </KeyboardAvoidingView>
        </View>
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
              <View style={styles.hostMember}>
                <FontAwesomeIcon
                  style={styles.icon}
                  icon={faUser}
                  size={25}
                  color={colorMap[user.id]}
                />
                <Text>{clubData?.hostNickname}</Text>
              </View>
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
              if (colorMap[member.id] == undefined) {
                let num = Object.keys(colorMap).length;
                if (num == colorList.length) num = num - colorList.length;
                colorMap[member.id] = colorList[num];
              }
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    key={`member_${member.id}_${i}`}
                    style={styles.memberList}>
                    <FontAwesomeIcon
                      style={styles.icon}
                      icon={faUser}
                      size={25}
                      color={colorMap[member.id]}
                    />
                    <Text>{member.nickName}</Text>
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
                </View>
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
  input: {
    width: '70%',
    borderWidth: 1,
    borderColor: 'black',
    marginRight: width * 30,
  },
  send: {
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
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
    alignItems: 'flex-start',
  },
  memberList: {
    paddingTop: height * 17,
    paddingBottom: height * 17,
    flexDirection: 'row',
    marginLeft: width * 17,
    alignItems: 'flex-start',
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
    height: height * 25,
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1.5,
    marginBottom: height * 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: width * 10,
    height: height * 66,
  },
  headerText: {
    color: '#303030',
    fontFamily: 'Pretendard',
    fontSize: width * 20,
    fontWeight: '600',
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
    fontFamily: 'Pretendard',
    fontSize: width * 20,
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
