import React, {useEffect, useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';
import {height} from '../../global';
import {ReviewDetail} from '../../utils/commonInterface';
import {apiServer} from '../../utils/metaData';
import sendIcon from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native';
import NothingShow from '../NothingShow';
import {ScrollView} from 'react-native-gesture-handler';
import ReivewErrorModal from './ReivewErrorModal';

const ReviewList = ({clubId}: any) => {
  const url = `${apiServer}/api/v1/review/entire/${clubId}?cursor=`;
  const [reviews, setReviews] = useState<ReviewDetail[]>([]);
  const [sending, setSending] = useState('REVIEW');
  const [reviewId, setReviewId] = useState('');
  const [cursor, setCursor] = useState(0);
  const [isMore, setIsMore] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [inputText, setInputText] = useState('');

  const inputRef = useRef();

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const fetchAndSetData = async () => {
    const newData = await fetchData(cursor);
    if (newData && newData.length > 0) {
      setReviews(prevReviews => {
        const updatedReviews = prevReviews.map(prevReviews => {
          const newReview = newData.find(
            ({reviewId}) => reviewId === prevReviews.reviewId,
          );
          if (newReview) {
            return JSON.stringify(newReview) !== JSON.stringify(prevReviews)
              ? newReview
              : prevReviews;
          }
          return prevReviews;
        });
        const newReviewsWithoutDuplicates = newData.filter(
          newReview =>
            !prevReviews.some(
              prevReviews => prevReviews.reviewId === newReview.reviewId,
            ),
        );
        return [...updatedReviews, ...newReviewsWithoutDuplicates];
      });
    } else {
      setIsMore(false);
    }
  };

  const fetchData = async (num: number) => {
    try {
      const response = await new RESTAPIBuilder(url + num, 'GET')
        .setNeedToken(true)
        .build()
        .run();
      setIsHost(response.data.isHost);
      return response.data.reviews;
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
      setReviewId('');
      setSending('REVIEW');
      return () => {};
    }, []),
  );

  const modify = async reviewId => {
    console.log('수정');
    console.log(reviewId);
    const content = {content: inputText};
    const urlModify = `${apiServer}/api/v1/review/${clubId}/${reviewId}`;
    try {
      await new RESTAPIBuilder(urlModify, 'put')
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

  const deleteReview = async reviewId => {
    console.log('삭제');
    const urlDelete = `${apiServer}/api/v1/review/${clubId}/${reviewId}`;
    try {
      await new RESTAPIBuilder(urlDelete, 'DELETE')
        .setNeedToken(true)
        .build()
        .run();
      setCursor(0);
      setIsMore(true);
      const newReviews = reviews.filter(review => review.reviewId !== reviewId);
      setReviews(newReviews);
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const review = async () => {
    console.log('review');
    const content = {content: inputText};
    const urlreView = `${apiServer}/api/v1/review/${clubId}`;
    try {
      await new RESTAPIBuilder(urlreView, 'POST')
        .setNeedToken(true)
        .setBody(content)
        .build()
        .run();
      setCursor(0);
      setIsMore(true);
      setInputText('');
      setSending('REVIEW');
      fetchAndSetData();
    } catch (err) {
      setModalVisible(true);
      console.log(err);
    }
  };

  const replyReview = async reviewId => {
    console.log('replyReview');
    console.log(inputText);
    const content = {content: inputText};
    const urlreView = `${apiServer}/api/v1/review/reply/${clubId}/${reviewId}`;
    try {
      await new RESTAPIBuilder(urlreView, 'POST')
        .setNeedToken(true)
        .setBody(content)
        .build()
        .run();
      setCursor(0);
      setIsMore(true);
      setInputText('');
      setSending('REVIEW');
      fetchAndSetData();
    } catch (err) {
      console.log(err);
    }
  };
  const modifyNdelete = item => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setReviewId(item.reviewId);
            setSending('MODIFY');
            setInputText(item.reviewContent);
            inputRef.current.focus();
          }}>
          <Text style={styles.buttonText}>수정</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            deleteReview(item.reviewId);
          }}>
          <Text style={styles.buttonText}>삭제</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      {cursor === 0 && !isMore ? (
        <ScrollView>
          <NothingShow title={'작성된 후기가 없어요!'} styleKiwe={styleKiwe} />
        </ScrollView>
      ) : (
        <FlatList
          data={reviews}
          // keyExtractor={item => item.reviewId}
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
                <Image
                  source={{uri: item.reviewerProfileImg}}
                  style={styles.qaProfileImage}
                />
                <View style={styles.qaContent}>
                  <Text style={styles.qaNickname}>{item.reviewerNickname}</Text>
                  <Text style={styles.qaText}>{item.reviewContent}</Text>
                  <View style={styles.buttonContainer}>
                    <Text style={styles.qaDateTime}>
                      {item.isModified ? '수정됨 ' : ''}
                      {item.reviewDate}
                    </Text>
                    {item.isAuthorOfReview ? (
                      modifyNdelete(item)
                    ) : isHost && !item.respondentId ? (
                      <TouchableOpacity
                        onPress={() => {
                          setReviewId(item.reviewId);
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
              {item.respondentId ? (
                <View style={styles.replyItem}>
                  <Image
                    source={{uri: item.respondentProfileImg}}
                    style={styles.qaProfileImage}
                  />
                  <View style={styles.qaContent}>
                    <Text style={styles.qaNickname}>
                      {item.respondentNickname}
                    </Text>
                    <Text style={styles.qaText}>{item.replyContent}</Text>
                    <View style={styles.buttonContainer}>
                      <Text style={styles.qaDateTime}>
                        {item.isModified ? '수정됨 ' : ''}
                        {item.reviewDate}
                      </Text>
                      {item.isAuthorOfReply ? modifyNdelete(item) : <></>}
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
              if (sending === 'REVIEW') {
                review();
              } else if (sending === 'MODIFY') {
                modify(reviewId);
              } else if (sending === 'REPLY') {
                replyReview(reviewId);
              }
              setReviewId('');
              setSending('REVIEW');
              setInputText('');
            }}
          />
        </View>
      </View>
      <ReivewErrorModal isVisible={modalVisible} onClose={handleCloseModal} />
    </KeyboardAvoidingView>
  );
};

const calculateScrollPosition = (offset, contentHeight, viewportHeight) => {
  return Math.floor((offset / (contentHeight - viewportHeight)) * height * 10);
};

const styles = StyleSheet.create({
  qaContainer: {
    padding: 20,
  },
  qaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  qaProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginTop: -15,
  },
  qaContent: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginRight: 5,
  },
  buttonText: {
    fontSize: 12,
    color: '#303030',
    marginBottom: 2,
  },
  qaText: {
    fontSize: 13,
    color: '#303030',
    marginBottom: 5,
  },
  qaDateTime: {
    marginRight: 5,
    fontSize: 12,
    color: '#777788',
  },
  qaNickname: {
    fontSize: 14,
    color: '#303030',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  replyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 50,
  },
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
    borderWidth: 1,
    borderColor: '#8A8A8A',
    borderRadius: 20,
    backgroundColor: '#EDEDED',
    padding: 5,
    paddingLeft: 10,
    fontSize: 13,
    marginTop: 5,
    marginBottom: 10,
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
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 1)',
    margin: 10,
  },
});
export default ReviewList;
