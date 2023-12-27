import React, {useState, useEffect} from 'react';
import {Chat} from '../utils/commonInterface';
import {
  Keyboard,
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
  TouchableHighlight,
  
} from 'react-native';
import {height, width} from '../global';
import ChatBubbleSystem from './ChatBubbleSystem';
import ChatBubbleMine from './ChatBubbleMine';
import ChatBubbleOther from './ChatBubbleOther';
import {KeyboardAvoidingView} from 'react-native';
import backIcon from 'react-native-vector-icons/Ionicons';
import sendIcon from 'react-native-vector-icons/Feather';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export function ChatTest({navigation}: any) {
  const [keyboard, setKeyboard] = useState(false);
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
    {
      userId: 8,
      msg: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
      time: '2023-10-13 13:06',
    },
  ]);

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
    // 내 id가 2라는 가정
    if (message.userId == 0) {
      return (
        <View style={styles.chatBubble}>
          <ChatBubbleSystem chat={message} />
        </View>
      );
    } else if (message.userId == 2) {
      return (
        <View style={styles.chatBubble}>
          <ChatBubbleMine chat={message} />
        </View>
      );
    } else {
      const writer = '(알수없음)';
      return (
        <TouchableOpacity
          style={styles.chatBubble}
          onLongPress={() => Alert.alert('Title', 'Long press detected')}>
          <ChatBubbleOther writer={writer} chat={message} color={'#3196E8'} />
        </TouchableOpacity>
      );
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
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
        <Text>채팅테스트</Text>
      </View>
      <TouchableWithoutFeedback style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={keyboardStatus}
          style={{flex: 1, backgroundColor: '#FFFFFF'}}>
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
          {/* <FlatList
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
          /> */}
          <View style={styles.inputContainer}>
            <View style={{width: '80%'}}>
              <TextInput style={styles.input} />
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
                onPress={() => navigation.pop()}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    // width: '80%',
    borderWidth: 1,
    borderColor: '#8A8A8A',
    borderRadius: 20,
    backgroundColor: '#EDEDED',
    padding: 5,
    paddingLeft: 10,
    fontSize: 13,
    marginTop: 5,
    height: height * 35,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: width * 10,
    height: height * 66,
  },
  chatBubble: {
    marginBottom: height * 15,
  },
});

export default ChatTest;
