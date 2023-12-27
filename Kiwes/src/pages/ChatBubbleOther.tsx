// 채팅방 화면에 번역 언어 선택 및 텍스트 보여지는 새로운 모달 보이기
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Chat} from '../utils/commonInterface';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import OtherBubbleLongpressModal from '../components/otherBubbleLongpressModal';

export default function ChatBubbleOther({
  writer,
  chat,
  color,
}: {
  writer: string;
  chat: Chat;
  color: string;
}) {
  // const [chatBubblePosition, setChatBubblePosition] = useState({x: 0, y: 0});
  const [chatBubbleData, setchatMsg] = useState(chat.msg);
  const setChatBubbleData = translatedText => {
    setchatMsg(translatedText);
  };

  const [isOtherBubbleLongpressModal, setOtherBubbleLongpressModal] =
    useState(false);

  const toggleOtherBubbleLongpressModal = () => {
    setOtherBubbleLongpressModal(!isOtherBubbleLongpressModal);
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
    toggleOtherBubbleLongpressModal();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.user}>
          <FontAwesomeIcon
            style={styles.icon}
            icon={faUser}
            size={25}
            color={color}
          />
        </View>
        <View style={{position: 'relative'}}>
          <Text>{writer}</Text>
          <View style={styles.chatContainer}>
            <TouchableHighlight
              style={styles.chat}
              onLayout={bubbleHeight}
              onLongPress={event => {
                bubblePosition(event);
                backgroundPosition(event);
                chatBubbleLongPress();
              }}
              underlayColor={'#CCCCCC'}
              activeOpacity={1}>
              <Text style={styles.text}>{chatBubbleData}</Text>
            </TouchableHighlight>
            <View style={styles.time}>
              <Text style={styles.timeText}>{chat.time}</Text>
            </View>
          </View>
        </View>
        <OtherBubbleLongpressModal
          isVisible={isOtherBubbleLongpressModal}
          onClose={toggleOtherBubbleLongpressModal}
          chatBubbleData={chatBubbleData}
          backgroundPosition={clickedPosition}
          inBubblePosition={inBubblePosition}
          bubbleHeight={componentHeight}
          setBubbleData={setChatBubbleData}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
  },
  user: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 10,
  },
  chatContainer: {
    flexDirection: 'row',
  },
  chat: {
    // marginLeft: 35,
    marginTop: 10,
    backgroundColor: '#EDEDED',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7,
    alignSelf: 'flex-start',
    maxWidth: '70%', // You can adjust the percentage as needed
    borderRadius: 20,
  },
  time: {
    alignSelf: 'flex-end',
    marginLeft: 5,
  },
  text: {
    color: 'black',
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

// 채팅방 화면에 번역 언어 선택 및 텍스트 보여지는 새로운 모달 보이기

// import React, {useState, useEffect, useRef, useCallback} from 'react';
// import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
// import {Chat} from '../utils/commonInterface';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {faUser} from '@fortawesome/free-solid-svg-icons';
// import OtherBubbleLongpressModal from '../components/otherBubbleLongpressModal';

// export default function ChatBubbleOther({
//   writer,
//   chat,
//   color,
// }: {
//   writer: string;
//   chat: Chat;
//   color: string;
// }) {
//   // const [chatBubblePosition, setChatBubblePosition] = useState({x: 0, y: 0});
//   const [chatBubbleData, setchatMsg] = useState('');
//   const [isOtherBubbleLongpressModal, setOtherBubbleLongpressModal] =
//     useState(false);

//   const toggleOtherBubbleLongpressModal = () => {
//     setOtherBubbleLongpressModal(!isOtherBubbleLongpressModal);
//   };

//   const [componentHeight, setComponentHeight] = useState(0);
//   const bubbleHeight = event => {
//     const {height} = event.nativeEvent.layout;
//     setComponentHeight(height);
//   };

//   const [inBubblePosition, setInBubblePosition] = useState({x: 0, y: 0});
//   const bubblePosition = event => {
//     const {nativeEvent} = event;
//     const {locationX, locationY} = nativeEvent;
//     setInBubblePosition({x: locationX, y: locationY});
//   };
//   const [clickedPosition, setClickedPosition] = useState({x: 0, y: 0});
//   const backgroundPosition = event => {
//     const {pageX, pageY} = event.nativeEvent;
//     setClickedPosition({x: pageX, y: pageY});
//   };

//   const chatBubbleLongPress = (ChatMsg: string) => {
//     setchatMsg(ChatMsg);
//     toggleOtherBubbleLongpressModal();
//   };

//   return (
//     <>
//       <View style={styles.container}>
//         <View style={styles.user}>
//           <FontAwesomeIcon
//             style={styles.icon}
//             icon={faUser}
//             size={25}
//             color={color}
//           />
//         </View>
//         <View style={{position: 'relative'}}>
//           <Text>{writer}</Text>
//           <View style={styles.chatContainer}>
//             <TouchableHighlight
//               style={styles.chat}
//               onLayout={bubbleHeight}
//               onLongPress={event => {
//                 bubblePosition(event);
//                 backgroundPosition(event);
//                 chatBubbleLongPress(chat.msg);
//               }}
//               underlayColor={'#CCCCCC'}
//               activeOpacity={1}>
//               <Text style={styles.text}>{chat.msg}</Text>
//             </TouchableHighlight>
//             <View style={styles.time}>
//               <Text style={styles.timeText}>{chat.time}</Text>
//             </View>
//           </View>
//         </View>
//         <OtherBubbleLongpressModal
//           isVisible={isOtherBubbleLongpressModal}
//           onClose={toggleOtherBubbleLongpressModal}
//           chatBubbleData={chatBubbleData}
//           backgroundPosition={clickedPosition}
//           inBubblePosition={inBubblePosition}
//           bubbleHeight={componentHeight}
//         />
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     position: 'relative',
//     flexDirection: 'row',
//   },
//   user: {
//     flexDirection: 'row',
//     marginLeft: 10,
//     alignItems: 'flex-start',
//   },
//   icon: {
//     marginRight: 10,
//   },
//   chatContainer: {
//     flexDirection: 'row',
//   },
//   chat: {
//     // marginLeft: 35,
//     marginTop: 10,
//     backgroundColor: '#EDEDED',
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingTop: 7,
//     paddingBottom: 7,
//     alignSelf: 'flex-start',
//     maxWidth: '70%', // You can adjust the percentage as needed
//     borderRadius: 20,
//   },
//   time: {
//     alignSelf: 'flex-end',
//     marginLeft: 5,
//   },
//   text: {
//     color: 'black',
//     fontFamily: 'Pretendard-bold',
//     fontSize: 13,
//     fontWeight: '400',
//   },
//   timeText: {
//     color: 'black',
//     fontFamily: 'Pretendard-bold',
//     fontSize: 10,
//     fontWeight: '600',
//   },
// });
