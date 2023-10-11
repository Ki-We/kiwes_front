import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import optionIcon from 'react-native-vector-icons/SimpleLineIcons';
import backIcon from 'react-native-vector-icons/Ionicons';
import exitIcon from 'react-native-vector-icons/MaterialIcons';
import {colors, width, height} from '../global';
import Modal from 'react-native-modal';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {io} from 'socket.io-client';
import ErrorModal from '../components/errorModal';
import KickModal from '../components/kickedOutModal';
import ExitModal from '../components/exitModal';

import axios from 'axios';
import {chatServer, jwtToken} from '../utils/metaData';
import ChatBubbleOther from './ChatBubbleOther';
import ChatBubbleMine from './ChatBubbleMine';
import ChatBubbleSystem from './ChatBubbleSystem';
import {ScrollView} from 'react-native-gesture-handler';
import {Chat, ClubSimpleData} from '../utils/commonInterface';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChessKing, faUser} from '@fortawesome/free-solid-svg-icons';

const user1 = {
  _id: 1,
  name: 'Kiwes',
};
const user2 = {
  _id: 2,
  name: 'Kiwes2',
};
const initUser = {
  nickName: '',
  id: 1,
};

const ChatScreen = ({navigation, route}) => {
  const [clubId, setClubId] = useState(route.params?.clubId ?? 0);
  const [clubData, setClubData] = useState<ClubSimpleData>();
  const [user, setUser] = useState(initUser);
  const [messages, setMessages] = useState<Chat[]>([
    {
      writer: 'system',
      msg: '테스트 사용자 님이 입장하셨습니다.',
      time: '오후 4:35',
    },
    {writer: '테스트 사용자입니다.', msg: '안녕?', time: '오후 9:55'},
    {writer: 'Kiwes', msg: 'wefwef', time: '오후 10:16'},
    {writer: 'Kiwes', msg: 'wefwef', time: '오후 10:19'},
    {writer: 'Kiwes1', msg: 'sddsfsdfsd', time: '오후 10:19'},
    {writer: 'Kiwes', msg: 'sadfsadf', time: '오후 10:19'},
    {writer: 'Kiwes1', msg: 'dwefwef', time: '오후 9:35'},
    {writer: '규리', msg: 'eeeeee', time: '오후 9:35'},
    {
      writer: '규리',
      msg: '감사합니다~ 다음 모임에 꼭 참여해주세요. 안 참여하면 아주 그냥 큰일이 벌어질 것이야. 거짓말 같지? 아니거든? 진심이거든?',
      time: '오후 9:45',
    },
    {writer: 'Kiwes2', msg: 'Bbbb', time: '오후 9:46'},
    {writer: 'Kiwes2', msg: 'EEEEE', time: '오후 9:47'},
    {writer: 'Kiwes', msg: 'efwefwef', time: '오후 9:47'},
  ]);

  const initialize = async () => {
    const result = await axios
      .get(`https://api.kiwes.org/api/v1/club/info/simple/${clubId}`, {
        headers: {Authorization: jwtToken},
      })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
    console.log(result.data);
    setClubData(result.data);

    const resultMine = await axios
      .get(`https://api.kiwes.org/myid`, {
        headers: {Authorization: jwtToken},
      })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });

    setUser(resultMine.data);
    console.log(resultMine.data);
  };
  const [isTextInputFocused, setTextInputFocused] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const [isKickModalVisible, setKickModalVisible] = useState(false);
  const [isExitModalVisible, setExitModalVisible] = useState(false);
  useEffect(() => {
    initialize();
    // 텍스트 입력 포커스 상태 변경 시 키보드 이벤트를 구독/해제합니다.
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setTextInputFocused(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setTextInputFocused(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const socket = useRef();

  useEffect(() => {
    console.log('------------------------------------');
    socket.current = io(chatServer);
    socket.current.on('connect', () => {
      console.log('connect');

      socket.current?.emit('enter', {roomID: clubId, userID: user1._id});
    });
    socket.current?.on('msgList', data => {
      const chat = data.chat;

      setMessages(chat);
      console.log('msgList : ', chat);
    });
    socket.current?.on('sendMSG', data => {
      console.log('sendMSG : ', data);
    });

    // socket.on('chat message', message => {
    //   setMessages(previousMessages =>
    //     GiftedChat.append(previousMessages, message),
    //   );
    // });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const kickUser = () => {
    socket.current.emit('kickedout', {name: user2.name});
  };

  const exitChat = () => {
    socket.current.emit('exit', {name: user1.name});
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleErrorModal = () => {
    setErrorModalVisible(!isErrorModalVisible);
  };
  const toggleKickModal = () => {
    setKickModalVisible(!isKickModalVisible);
  };
  const toggleExitModal = () => {
    setExitModalVisible(!isExitModalVisible);
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {color: 'white'},
          left: {color: 'black'},
        }}
        wrapperStyle={{
          right: {backgroundColor: '#58C047'},
          left: {backgroundColor: '#EDEDED'},
        }}
      />
    );
  };

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
      msg: '안녕?',
      time: '~~',
      writer: user?.nickName,
    };
    setMessages([...messages, newMessage]);
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{flex: 1}}>
          {messages.map((message, i) => {
            if (message.writer == 'system') {
              return (
                <View
                  key={`chat_${message.writer}_${i}`}
                  style={styles.chatBubble}>
                  <ChatBubbleSystem chat={message} />
                </View>
              );
            } else if (message.writer === user.nickName) {
              return (
                <View
                  key={`chat_${message.writer}_${i}`}
                  style={styles.chatBubble}>
                  <ChatBubbleMine chat={message} />
                </View>
              );
            } else {
              if (colorMap[message.writer] == undefined) {
                let num = Object.keys(colorMap).length;
                if (num == colorList.length) num = num - colorList.length;
                colorMap[message.writer] = colorList[num];
              }
              return (
                <View
                  key={`chat_${message.writer}_${i}`}
                  style={styles.chatBubble}>
                  <ChatBubbleOther
                    chat={message}
                    color={colorMap[message.writer]}
                  />
                </View>
              );
            }
          })}
        </ScrollView>
      </TouchableWithoutFeedback>
      {/* <Button title="error" onPress={toggleErrorModal}></Button> */}

      <Button title="aendMSG" onPress={sendMSG} />
      <Button title="df" onPress={toggleKickModal} />
      {/* <Button title="df" onPress={toggleExitModal}></Button> */}

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
            <View style={styles.memberList}>
              <FontAwesomeIcon
                style={styles.icon}
                icon={faChessKing}
                size={25}
                color={'red'}
              />
              <Text>{user.nickName}</Text>
            </View>
            {clubData?.members.map((member, i) => {
              if (colorMap[member.nickname] == undefined) {
                let num = Object.keys(colorMap).length;
                if (num == colorList.length) num = num - colorList.length;
                colorMap[member.nickname] = colorList[num];
              }
              return (
                <View
                  key={`member_${member.id}_${i}`}
                  style={styles.memberList}>
                  <FontAwesomeIcon
                    style={styles.icon}
                    icon={faUser}
                    size={25}
                    color={colorMap[member.nickname]}
                  />
                  <Text>{member.nickname}</Text>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.exitContainer}>
            <exitIcon.Button
              // style={styles.exitButton}}
              backgroundColor="#FFFFFF"
              iconStyle={{marginRight: 0, padding: 5}}
              name="logout"
              color="#303030"
              size={25}
              onPress={toggleExitModal}
            />
          </View>
        </SafeAreaView>
      </Modal>
      <ErrorModal isVisible={isErrorModalVisible} onClose={toggleErrorModal} />
      <KickModal
        isVisible={isKickModalVisible}
        onClose={toggleKickModal}
        name={user1.name}
      />
      <ExitModal
        isVisible={isExitModalVisible}
        onClose={toggleExitModal}
        name={user1.name}
        exit={exitChat}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  memberList: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 10,
  },
  chatBubble: {
    marginBottom: 20,
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
    paddingLeft: 22,
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
  exitContainer: {
    alignItems: 'flex-start',
  },
});

export default ChatScreen;
