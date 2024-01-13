import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {ClubApprovalRequest} from '../../utils/commonInterface';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';
import {height} from '../../global';

const calculateScrollPosition = (offset, contentHeight, viewportHeight) => {
  return Math.floor((offset / (contentHeight - viewportHeight)) * height * 10);
};
const ApprovalRequst = ({url, navigateToRequestList, Nothing}: any) => {
  const [posts, setPosts] = useState<ClubApprovalRequest[]>([]);
  const [cursor, setCursor] = useState(0);
  const [isMore, setIsMore] = useState(true);
  const setData = async () => {
    if (url === '' || posts.length === 0) {
      return;
    }
    setPosts(await fetchData(0));
  };
  const fetchAndSetData = async () => {
    const newData = await fetchData(cursor);
    if (newData && newData.length > 0) {
      setPosts(prevPosts => {
        const newPostsWithoutDuplicates = newData.filter(
          newPost =>
            !prevPosts.some(prevPost => prevPost.clubId === newPost.clubId),
        );
        return [...prevPosts, ...newPostsWithoutDuplicates];
      });
    } else {
      setIsMore(false);
    }
  };
  useEffect(() => {
    fetchAndSetData();
  }, [cursor]);

  const fetchData = async (num: number) => {
    try {
      console.log(url + cursor);
      const response = await new RESTAPIBuilder(url + num, 'GET')
        .setNeedToken(true)
        .build()
        .run();
      return response.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  useFocusEffect(
    useCallback(() => {
      setData();
      return () => {};
    }, []),
  );
  return (
    <>
      {cursor === 0 && !isMore ? (
        Nothing({text: '조회 가능한 모임이 없어요!'})
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item => item.clubId}
          style={{flex: 1}}
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
            <View style={styles.requestContainer}>
              <View style={styles.textContainer}>
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={styles.infoContainer}>
                    <Icon
                      name="people-outline"
                      size={24}
                      color={'#rgba(0, 0, 0, 1)'}
                    />
                    <Text style={styles.info}>{item.currentPeople}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.heartContainer}
                onPress={() => {
                  navigateToRequestList({
                    clubId: item.clubId,
                    title: item.title,
                  });
                }}>
                <Text style={styles.button}> 보기 </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  requestContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  heartContainer: {
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.7)',
    marginBottom: 18,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
  },
  info: {
    fontSize: 20,
    marginLeft: 10,
    color: '#58C047',
  },

  button: {
    color: 'rgba(0, 0, 0, 0.8)',
    borderColor: 'rgba(0, 0, 0, 0.8)',
    borderWidth: 1,
    borderRadius: 15,
    padding: 4,
    paddingHorizontal: 12,
    marginBottom: 5,
  },
});
export default ApprovalRequst;
