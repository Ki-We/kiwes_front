import {View, Text, StyleSheet} from 'react-native';
import {Chat} from '../utils/commonInterface';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

export default function ChatBubbleOther({
  chat,
  color,
}: {
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
          <Text>{chat.writer}</Text>
        </View>
        <View style={styles.chat}>
          <Text style={styles.text}>{chat.msg}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  user: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 10,
  },
  chat: {
    marginLeft: 35,
    backgroundColor: '#EDEDED',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7,
    alignSelf: 'flex-start',
    maxWidth: '70%', // You can adjust the percentage as needed
    borderRadius: 20,
  },
  text: {
    color: 'black',
    fontFamily: 'Pretendard-bold',
    fontSize: 13,
    fontWeight: '400',
  },
});
