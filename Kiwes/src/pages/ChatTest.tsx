import React, {useState} from 'react';
import {Chat} from '../utils/commonInterface';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {height, width} from '../global';
import ChatBubbleSystem from './ChatBubbleSystem';
import ChatBubbleMine from './ChatBubbleMine';
import ChatBubbleOther from './ChatBubbleOther';
import {KeyboardAvoidingView} from 'react-native';
import backIcon from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export function ChatTest({navigation}: any) {
  const [keyboard, setKeyboard] = useState(false);
  const [messages, setMessages] = useState<Chat[]>(
    [
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
    ].reverse(),
  );
  const DATA_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const [displayData, setDisplayData] = useState(
    messages.slice(0, DATA_PER_PAGE * page),
  );

  const loadMoreData = () => {
    console.log('loadMoreData');
    const nextPage = page + 1;
    setDisplayData(messages.slice(0, DATA_PER_PAGE * nextPage));
    setPage(nextPage);
  };

  const renderItem = ({item}: any) => {
    const message = item;
    // 내 id가 2라는 가정
    if (message.userId == 0)
      return (
        <View style={styles.chatBubble}>
          <ChatBubbleSystem chat={message} />
        </View>
      );
    else if (message.userId == 2) {
      return (
        <View style={styles.chatBubble}>
          <ChatBubbleMine chat={message} />
        </View>
      );
    } else {
      const writer = '(알수없음)';
      return (
        <View style={styles.chatBubble}>
          <ChatBubbleOther writer={writer} chat={message} color={'#3196E8'} />
        </View>
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
          style={{flex: 1}}>
          <FlatList
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
          <TextInput placeholder={'Add Message'} />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
