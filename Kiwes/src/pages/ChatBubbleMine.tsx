import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Chat} from '../utils/commonInterface';
import MyBubbleLongpressModal from '../components/myBubbleLongpressModal';

export default function ChatBubbleMine({chat}: {chat: Chat}) {
  const [chatBubbleData, setchatMsg] = useState(chat.msg);
  const setChatBubbleData = translatedText => {
    setchatMsg(translatedText);
  };

  const [isMyBubbleLongpressModal, setMyBubbleLongpressModal] = useState(false);

  const toggleMyBubbleLongpressModal = () => {
    setMyBubbleLongpressModal(!isMyBubbleLongpressModal);
  };

  const [componentHeight, setComponentHeight] = useState(0);
  const bubbleHeight = event => {
    const {height} = event.nativeEvent.layout;
    setComponentHeight(height);
  };

  const [inBubblePosition, setInBubblePosition] = useState({x: 0, y: 0});
  const bubblePosition = event => {
    const {nativeEvent} = event;
    const {locationX, locationY} = nativeEvent;
    setInBubblePosition({x: locationX, y: locationY});
  };
  const [clickedPosition, setClickedPosition] = useState({x: 0, y: 0});
  const backgroundPosition = event => {
    const {pageX, pageY} = event.nativeEvent;
    setClickedPosition({x: pageX, y: pageY});
  };

  const chatBubbleLongPress = () => {
    toggleMyBubbleLongpressModal();
  };
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.chat}
        onLayout={bubbleHeight}
        onLongPress={event => {
          bubblePosition(event);
          backgroundPosition(event);
          chatBubbleLongPress();
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
        backgroundPosition={clickedPosition}
        inBubblePosition={inBubblePosition}
        bubbleHeight={componentHeight}
        setBubbleData={setChatBubbleData}
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
    maxWidth: '70%', // You can adjust the percentage as needed
    borderRadius: 20,
  },
  time: {
    alignSelf: 'flex-end',
    marginRight: 5,
  },
  text: {
    color: 'white',
    fontFamily: 'Pretendard-bold',
    fontSize: 13,
    fontWeight: '400',
  },
  timeText: {
    color: 'black',
    fontFamily: 'Pretendard-bold',
    fontSize: 10,
    fontWeight: '600',
  },
});
