import React, {useState, useRef} from 'react';
import {View, StyleSheet, TouchableHighlight, Text} from 'react-native';
import {Chat} from '../utils/commonInterface';
import MyBubbleLongpressModal from '../components/MyBubbleLongpressModal';
// import Text from '@components/atoms/Text';
import {height, DeviceHeight} from '../global';

export default function ChatBubbleMine({
  chat,
  isHost,
  noticeChat,
}: {
  chat: Chat;
  isHost: boolean;
  noticeChat: (notice: string) => void;
}) {
  const [chatBubbleData, setchatMsg] = useState(chat.msg);
  const setChatBubbleData = translatedText => {
    setchatMsg(translatedText);
  };

  const setNotification = () => {
    noticeChat(chatBubbleData);
  };

  const [modalPosition, setModalPosition] = useState({
    top: 0,
    left: 0,
  });
  const modalRef = useRef(null);

  const [isMyBubbleLongpressModal, setMyBubbleLongpressModal] = useState(false);

  const toggleMyBubbleLongpressModal = () => {
    setMyBubbleLongpressModal(!isMyBubbleLongpressModal);
  };

  const [clickedPosition, setClickedPosition] = useState({x: 0, y: 0});
  const backgroundPosition = event => {
    const {pageX, pageY} = event.nativeEvent;
    setClickedPosition({x: pageX, y: pageY});
    if (modalRef && modalRef.current) {
      modalRef.current.measure((fx, fy, width, height, px, py) => {
        if (DeviceHeight / 2 >= pageY) {
          setModalPosition({top: py + height - 5, left: px});
        } else {
          if (isHost) {
            setModalPosition({top: py - 130, left: px});
          } else {
            setModalPosition({top: py - 100, left: px});
          }
        }
        toggleMyBubbleLongpressModal();
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        ref={modalRef}
        style={styles.chat}
        onLongPress={event => {
          backgroundPosition(event);
        }}
        underlayColor={'#589947'}
        activeOpacity={1}>
        <Text style={styles.text}>{chatBubbleData}</Text>
      </TouchableHighlight>
      <View style={styles.time}>
        <Text style={styles.timeText}>{chat.time}</Text>
      </View>
      <MyBubbleLongpressModal
        isVisible={isMyBubbleLongpressModal}
        onClose={toggleMyBubbleLongpressModal}
        chatBubbleData={chatBubbleData}
        modalPosition={modalPosition}
        backgroundPosition={clickedPosition}
        setBubbleData={setChatBubbleData}
        isHost={isHost}
        setNotification={setNotification}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row-reverse',
  },
  chat: {
    marginRight: 10,
    backgroundColor: '#58C047',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7,
    maxWidth: '70%',
    borderRadius: 20,
  },
  time: {
    alignSelf: 'flex-end',
    marginRight: 5,
  },
  text: {
    color: '#FFFFFF',
    fontSize: height * 13,
    // fontWeight: '400',
    fontFamily: 'Pretendard-Regular',
  },
  timeText: {
    color: '#303030',
    fontSize: height * 10,
    fontFamily: 'Pretendard-SemiBold',
  },
});
