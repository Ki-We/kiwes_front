import {View, Text, StyleSheet} from 'react-native';
import {Chat} from '../utils/commonInterface';

export default function ChatBubbleMine({chat}: {chat: Chat}) {
  return (
    <View style={styles.container}>
      <View style={styles.chat}>
        <Text style={styles.text}>{chat.msg}</Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.timeText}>{chat.time}</Text>
      </View>
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
    backgroundColor: '#3DBE14',
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
