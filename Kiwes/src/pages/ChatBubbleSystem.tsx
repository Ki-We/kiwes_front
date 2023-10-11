import {Text, StyleSheet} from 'react-native';
import {Chat} from '../utils/commonInterface';

export default function ChatBubbleSystem({chat}: {chat: Chat}) {
  return <Text style={styles.container}>{chat.msg}</Text>;
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    color: '#616161',
    paddingTop: 3,
    paddingBottom: 3,
  },
});
