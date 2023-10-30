import {View, Text, StyleSheet} from 'react-native';
import {Chat} from '../utils/commonInterface';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

export default function ChatBubbleOther({
  writer,
  chat,
  color,
}: {
  writer: string;
  chat: Chat;
  color: string;
}) {
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
            <View style={styles.chat}>
              <Text style={styles.text}>{chat.msg}</Text>
            </View>
            <View style={styles.time}>
              <Text style={styles.timeText}>{chat.time}</Text>
            </View>
          </View>
        </View>
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
