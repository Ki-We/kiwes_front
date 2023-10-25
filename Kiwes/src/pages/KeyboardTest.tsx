import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TextInput,
  Text,
  Platform,
  Button,
  Keyboard,
} from 'react-native';

const CommentScreen = props => {
  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView style={styles.rootContainer} behavior={'padding'}>
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
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'pink',
  },
});

export default CommentScreen;
