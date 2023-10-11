import {View, Text, StyleSheet} from 'react-native';
import {Chat} from '../utils/commonInterface';

export default function ChatBubbleMine({chat}: {chat: Chat}) {
  return (
    <View style={styles.container}>
      <View style={styles.chat}>
        <Text style={styles.text}>{chat.msg}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  chat: {
    marginRight: 10,
    backgroundColor: '#3DBE14',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7,
    alignSelf: 'flex-end',
    maxWidth: '70%', // You can adjust the percentage as needed
    borderRadius: 20,
  },
  text: {
    color: 'white',
    fontFamily: 'Pretendard-bold',
    fontSize: 13,
    fontWeight: '400',
  },
});
