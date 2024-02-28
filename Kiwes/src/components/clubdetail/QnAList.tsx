import React, {useEffect, useCallback, useRef, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';
import {height, width} from '../../global';
import {QnADetail} from '../../utils/commonInterface';
import {apiServer} from '../../utils/metaData';
import sendIcon from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native';
import NothingShow from '../NothingShow';
import Text from '@components/atoms/Text';

const QnAList = ({clubId, navigateToProile}: any) => {
  const [qnas, setQnas] = useState<QnADetail[]>([]);
  const [sending, setSending] = useState('REGISTER');
  const [qnaId, setQnaId] = useState('');
  const [cursor, setCursor] = useState(0);
  const [isMore, setIsMore] = useState(true);
  const [isHost, setIsHost] = useState(false);
  const [inputText, setInputText] = useState('');

  const inputRef = useRef();

  const fetchAndSetData = async () => {
    const newData = await fetchData(cursor);
    if (newData && newData.length > 0) {
      setQnas(prevQnas => {
        const updatedQnas = prevQnas.map(prevQnas => {
          const newQna = newData.find(({qnaId}) => qnaId === prevQnas.qnaId);
          if (newQna) {
            return JSON.stringify(newQna) !== JSON.stringify(prevQnas)
              ? newQna
              : prevQnas;
          }
          return prevQnas;
        });
        const newQnasWithoutDuplicates = newData.filter(
          newQna => !prevQnas.some(prevQnas => prevQnas.qnaId === newQna.qnaId),
        );
        return [...updatedQnas, ...newQnasWithoutDuplicates];
      });
    } else {
      setIsMore(false);
    }
  };

  const fetchData = async (num: number) => {
    try {
      const url = `${apiServer}/api/v1/qna/entire/${clubId}?cursor=`;
      const response = await new RESTAPIBuilder(url + num, 'GET')
        .setNeedToken(true)
        .build()
        .run();
      setIsHost(response.data.isHost);
      console.log(response.data);
      return response.data.qnas;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  useEffect(() => {
    fetchAndSetData();
  }, [cursor]);

  useFocusEffect(
    useCallback(() => {
      setInputText('');
      setQnaId('');
      setSending('REGISTER');
      return () => {};
    }, []),
  );

  const modify = async qnaId => {
    console.log('수정');
    const content = {content: inputText};
    const urlModify = `${apiServer}/api/v1/qna/${clubId}/${qnaId}`;
    console.log(urlModify);
    try {
      await new RESTAPIBuilder(urlModify, 'PUT')
        .setNeedToken(true)
        .setBody(content)
        .build()
        .run();
      setCursor(0);
      setIsMore(true);
      fetchAndSetData();
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const deleteQuestion = async qnaId => {
    console.log('삭제');
    const urlDelete = `${apiServer}/api/v1/qna/question/${clubId}/${qnaId}`;
    console.log(urlDelete);
    try {
      await new RESTAPIBuilder(urlDelete, 'DELETE')
        .setNeedToken(true)
        .build()
        .run();
      const updatedAnswer = qnas.map(qna =>
        qna.qnaId === qnaId
          ? {
              ...qna,
              isAuthorOfQuestion: false,
              isDeleted: 'YES',
              questionContent: '삭제된 질문입니다.',
            }
          : qna,
      );
      setQnas(updatedAnswer);
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const deleteAnswer = async qnaId => {
    console.log('삭제');
    const urlDelete = `${apiServer}/api/v1/qna/answer/${clubId}/${qnaId}`;
    try {
      await new RESTAPIBuilder(urlDelete, 'DELETE')
        .setNeedToken(true)
        .build()
        .run();
      const updatedAnswer = qnas.map(qna =>
        qna.qnaId === qnaId ? {...qna, isAnswered: 'NO'} : qna,
      );
      setQnas(updatedAnswer);
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const register = async () => {
    console.log('register');
    const content = {content: inputText};
    const urlreRegister = `${apiServer}/api/v1/qna/question/${clubId}`;
    try {
      await new RESTAPIBuilder(urlreRegister, 'POST')
        .setNeedToken(true)
        .setBody(content)
        .build()
        .run();
      setCursor(0);
      setIsMore(true);
      setInputText('');
      setSending('REGISTER');
      fetchAndSetData();
    } catch (err) {
      console.log(err);
    }
  };

  const reply = async qnaId => {
    console.log('reply');
    console.log(inputText);
    const content = {content: inputText};
    const urlreply = `${apiServer}/api/v1/qna/answer/${clubId}/${qnaId}`;
    try {
      await new RESTAPIBuilder(urlreply, 'POST')
        .setNeedToken(true)
        .setBody(content)
        .build()
        .run();
      setCursor(0);
      setIsMore(true);
      setInputText('');
      setSending('REGISTER');
      fetchAndSetData();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      {cursor === 0 && !isMore ? (
        <NothingShow title={'작성된 문의가 없어요!'} styleKiwe={styleKiwe} />
      ) : (
        <FlatList
          data={qnas}
          style={styles.qaContainer}
          onScroll={event => {
            if (isMore) {
              const {contentSize, layoutMeasurement, contentOffset} =
                event.nativeEvent;
              const newScrollPosition = calculateScrollPosition(
                contentOffset.y,
                contentSize.height,
                layoutMeasurement.height,
              );
              if (newScrollPosition > 9) {
                setCursor(prevCursor => prevCursor + 1);
              }
            }
          }}
          renderItem={({item}) => (
            <View>
              <View style={styles.qaItem}>
                <TouchableOpacity
                  onPress={() => navigateToProile(item.questionerId)}>
                  <Image
                    source={{uri: item.questionerProfileImg}}
                    style={styles.qaProfileImage}
                  />
                </TouchableOpacity>
                <View style={styles.qaContent}>
                  <Text style={styles.qaNickname}>
                    {item.questionerNickname}
                  </Text>
                  <Text style={styles.qaText}>{item.questionContent}</Text>
                  <View style={styles.buttonContainer}>
                    <Text style={styles.qaDateTime}>
                      {item.isModified && item.isDeleted === 'NO'
                        ? '수정됨 '
                        : ''}
                      {item.qdate}
                    </Text>
                    {item.isAuthorOfQuestion && item.isDeleted === 'NO' ? (
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => {
                            console.log(item.isDeleted);
                            setQnaId(item.qnaId);
                            setSending('MODIFY');
                            setInputText(item.questionContent);
                            inputRef.current.focus();
                          }}>
                          <Text style={styles.buttonText}>수정</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            deleteQuestion(item.qnaId);
                          }}>
                          <Text style={styles.buttonText}>삭제</Text>
                        </TouchableOpacity>
                      </View>
                    ) : isHost && item.isAnswered === 'NO' ? (
                      <TouchableOpacity
                        onPress={() => {
                          setQnaId(item.qnaId);
                          setSending('REPLY');
                          setInputText('');
                          inputRef.current.focus();
                        }}>
                        <Text style={styles.buttonText}>답글 달기</Text>
                      </TouchableOpacity>
                    ) : (
                      <></>
                    )}
                  </View>
                </View>
              </View>
              {item.isAnswered === 'YES' ? (
                <View style={styles.replyItem}>
                  <TouchableOpacity
                    onPress={() => navigateToProile(item.respondentId)}>
                    <Image
                      source={{uri: item.respondentProfileImg}}
                      style={styles.qaProfileImage}
                    />
                  </TouchableOpacity>

                  <View style={styles.qaContent}>
                    <Text style={styles.qaNickname}>
                      {item.respondentNickname}
                    </Text>
                    <Text style={styles.qaText}>{item.answerContent}</Text>
                    <View style={styles.buttonContainer}>
                      <Text style={styles.qaDateTime}>
                        {item.isModified ? '수정됨 ' : ''}
                        {item.adate}
                      </Text>
                      {item.isAuthorOfAnswer ? (
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                              setQnaId(item.qnaId);
                              setSending('REPLY');
                              setInputText(item.answerContent);
                              inputRef.current.focus();
                            }}>
                            <Text style={styles.buttonText}>수정</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              deleteAnswer(item.qnaId);
                            }}>
                            <Text style={styles.buttonText}>삭제</Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <></>
                      )}
                    </View>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>
          )}
        />
      )}

      <View style={styles.inputContainer}>
        <View style={{width: '80%'}}>
          <TextInput
            style={styles.input}
            ref={inputRef}
            onChangeText={text => {
              setInputText(text);
            }}
            value={inputText}
            multiline={true}
            scrollEnabled={true}
          />
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
            onPress={() => {
              if (sending === 'REGISTER') {
                register();
              } else if (sending === 'MODIFY') {
                modify(qnaId);
              } else if (sending === 'REPLY') {
                reply(qnaId);
              }
              setQnaId('');
              setSending('REGISTER');
              setInputText('');
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const calculateScrollPosition = (offset, contentHeight, viewportHeight) => {
  return Math.floor((offset / (contentHeight - viewportHeight)) * height * 10);
};

const styles = StyleSheet.create({
  qaContainer: {
    padding: height * 20,
  },
  qaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 15,
  },
  qaProfileImage: {
    width: width * 40,
    height: height * 40,
    borderRadius: 20,
    marginRight: width * 10,
    marginTop: height * -15,
  },
  qaContent: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginRight: width * 5,
  },
  buttonText: {
    fontSize: height * 10,
    color: '#303030',
    fontWeight: '600',
    marginBottom: 2,
  },
  qaText: {
    fontWeight: '400',
    fontSize: height * 12,
    color: '#303030',
    marginBottom: 5,
  },
  qaDateTime: {
    marginRight: 5,
    fontSize: height * 10,
    fontWeight: '400',
    color: '#777788',
  },
  qaNickname: {
    fontSize: height * 14,
    color: '#303030',
    fontWeight: '500',
    marginBottom: height * 3,
  },
  replyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 15,
    marginLeft: width * 50,
  },
  inputContainer: {
    borderTopColor: '#EDEDED',
    borderTopWidth: 2,
    padding: width * 20,
    paddingRight: width * 5,
    paddingTop: height * 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#8A8A8A',
    borderRadius: 20,
    backgroundColor: '#EDEDED',
    padding: width * 5,
    paddingLeft: width * 10,
    fontSize: height * 13,
    marginTop: height * 5,
    marginBottom: height * 10,
    minHeight: height * 35,
    maxHeight: height * 180,
  },
});
const styleKiwe = StyleSheet.create({
  image: {
    marginTop: height * 20,
    height: height * 300,
  },
  text: {
    fontSize: height * 20,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 1)',
    margin: width * 10,
  },
});
export default QnAList;
