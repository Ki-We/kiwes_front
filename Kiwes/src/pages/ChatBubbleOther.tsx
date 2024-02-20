// 채팅방 화면에 번역 언어 선택 및 텍스트 보여지는 새로운 모달 보이기
import React, {useState, useRef} from 'react';
import {View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import Text from '@components/atoms/Text';
import {Chat} from '../utils/commonInterface';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import OtherBubbleLongpressModal from '../components/otherBubbleLongpressModal';
import {width, height, DeviceHeight} from '../global';

export default function ChatBubbleOther({
  writer,
  chat,
  color,
  isHost,
  noticeChat,
  thumbnail,
}: {
  writer: string;
  chat: Chat;
  color: string;
  isHost: boolean;
  thumbnail: string;
  noticeChat: (notice: string) => void;
}) {
  // console.log(writer, thumbnail);
  // const [chatBubblePosition, setChatBubblePosition] = useState({x: 0, y: 0});
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
  const openOtherBubbleLongPressModal = event => {
    console.log(clickedPosition.y);
    if (modalRef && modalRef.current) {
      modalRef.current.measure((fx, fy, width, height, px, py) => {
        if (DeviceHeight / 2 >= clickedPosition.y) {
          setModalPosition({top: py + 25, left: px - 25});
        } else {
          setModalPosition({top: py - 130, left: px - 25});
        }
        console.log(modalPosition.top);
        toggleOtherBubbleLongpressModal();
      });
    }
  };

  const [isOtherBubbleLongpressModal, setOtherBubbleLongpressModal] =
    useState(false);

  const toggleOtherBubbleLongpressModal = () => {
    setOtherBubbleLongpressModal(!isOtherBubbleLongpressModal);
  };

  const [clickedPosition, setClickedPosition] = useState({x: 0, y: 0});
  const backgroundPosition = event => {
    const {pageX, pageY} = event.nativeEvent;
    setClickedPosition({x: pageX, y: pageY});
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.user}>
          <Image
            source={{uri: thumbnail}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={{position: 'relative'}}>
          <Text>{writer}</Text>
          <View style={styles.chatContainer}>
            <TouchableHighlight
              ref={modalRef}
              style={styles.chat}
              onLongPress={event => {
                backgroundPosition(event);
                openOtherBubbleLongPressModal(event);
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
          modalPosition={modalPosition}
          backgroundPosition={clickedPosition}
          setBubbleData={setChatBubbleData}
          isHost={isHost}
          setNotification={setNotification}
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
  image: {
    width: width * 30,
    height: height * 30,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#303030',
    fontSize: height * 13,
    fontWeight: '400',
  },
  timeText: {
    color: '#303030',
    fontSize: height * 10,
    fontWeight: '600',
  },
});

// 채팅방 화면에 번역 언어 선택 및 텍스트 보여지는 새로운 모달 보이기

// import React, {useState, useEffect, useRef, useCallback} from 'react';
// import {View, StyleSheet, TouchableHighlight} from 'react-native';
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
//     fontSize: 13,
//     fontWeight: '300',
//   },
//   timeText: {
//     color: 'black',
//     fontSize: 10,
//     fontWeight: '700',
//   },
// });
