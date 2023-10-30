import {useState, useEffect} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TextInput,
  Text,
  Button,
  Keyboard,
} from 'react-native';

const CommentScreen = props => {
  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const [keyboardStatus, setKeyboardStatus] = useState('');

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

  return (
    <KeyboardAvoidingView
      style={styles.rootContainer}
      behavior={'padding'}
      keyboardVerticalOffset={keyboardStatus}>
      <Button title={'키보드 내리기'} onPress={hideKeyboard} />
      <View style={styles.commentArea}>
        <Text>이곳은 댓글이 보여질 공간 입니다.</Text>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="댓글을 입력해주세요"
          autoCorrect={false}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  commentArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ababab',
  },
  textInputContainer: {
    marginTop: 'auto',
    borderWidth: 1,
    borderColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  textInput: {
    width: '100%',
    fontSize: 10,
    borderWidth: 1,
    borderColor: 'pink',
  },
});

export default CommentScreen;
