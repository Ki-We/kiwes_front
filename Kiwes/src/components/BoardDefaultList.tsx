import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Text from '@components/atoms/Text';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import {apiServer} from '../utils/metaData';
import {BoardPost} from '../utils/commonInterface';
import {languageMap} from '../utils/languageMap';
import Icon from 'react-native-vector-icons/Ionicons';
import {height, width} from '../global';
import NothingDefault from './NothingDefault';
import {useFocusEffect} from '@react-navigation/native';

const BoardDefaultList = ({navigateToClub, fetchData, selected, data}: any) => {
  const [posts, setPosts] = useState<BoardPost[]>(data);
  const [cursor, setCursor] = useState(0);
  const [isMore, setIsMore] = useState(true);

  useEffect(() => {
    fetchNewData();
  }, [cursor, selected]);
  useEffect(() => {
    setCursor(0);
  }, [selected]);

  const fetchNewData = async () => {
    const data = await fetchData(cursor);
    if (data && data.length > 0) {
      if (cursor > 0) {
        setPosts(prevPosts => {
          const updatedPosts = prevPosts.map(prevPost => {
            const newPost = data.find(({clubId}) => clubId === prevPost.clubId);
            if (newPost) {
              return JSON.stringify(newPost) !== JSON.stringify(prevPost)
                ? newPost
                : prevPost;
            }
            return prevPost;
          });
          const newPostsWithoutDuplicates = data.filter(
            newPost =>
              !prevPosts.some(prevPost => prevPost.clubId === newPost.clubId),
          );
          return [...updatedPosts, ...newPostsWithoutDuplicates];
        });
      } else setPosts(data);

      setIsMore(true);
    } else setIsMore(false);
  };

  const toggleLike = async (id: String) => {
    const post = posts.find(post => post.clubId === id);
    if (!post) {
      return;
    }
    // Update state
    const updatedPosts = posts.map(post =>
      post.clubId === id
        ? {...post, isHeart: post.isHeart === 'YES' ? 'NO' : 'YES'}
        : post,
    );
    setPosts(updatedPosts);
    try {
      const updatedPost = updatedPosts.find(post => post.clubId === id);
      const apiUrl = `${apiServer}/api/v1/heart/${id}`;
      await new RESTAPIBuilder(
        apiUrl,
        updatedPost.isHeart === 'YES' ? 'PUT' : 'DELETE',
      )
        .setNeedToken(true)
        .build()
        .run();
    } catch (err) {
      console.error(err);
      setPosts(
        posts.map(post =>
          post.clubId === id ? {...post, heart: post.isHeart} : post,
        ),
      );
    }
  };
  useFocusEffect(
    useCallback(() => {
      setIsMore(true);
      refreshData();
      return () => {};
    }, [selected]),
  );
  const refreshData = async () => {
    let newData: BoardPost[] = [];
    for (let i = 0; i <= cursor; i++) {
      const data = await fetchData(i);
      newData = [...newData, ...data];
    }
    if (newData && newData.length > 0) {
      setPosts(newData);
    }
  };
  return (
    <>
      {cursor === 0 && !isMore ? (
        <NothingDefault text="조회 가능한 모임이 없어요!" />
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
            <TouchableOpacity
              style={styles.clubContainer}
              onPress={() => {
                navigateToClub(item.clubId);
              }}>
              <Image
                source={{uri: item.thumbnailImage}}
                style={styles.imageContainer}
              />

              <View style={styles.textContainer}>
                <View>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View style={styles.infoContainer}>
                    <Icon
                      name="calendar-outline"
                      size={14}
                      color={'#rgba(0, 0, 0, 0.7)'}
                    />
                    <Text style={styles.info}>{item.date}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Icon
                      name="location-outline"
                      size={14}
                      color={'#rgba(0, 0, 0, 0.7)'}
                    />
                    <Text style={styles.info}>{item.location}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Icon
                      name="globe-outline"
                      size={14}
                      color={'#rgba(0, 0, 0, 0.7)'}
                    />
                    <Text style={styles.info}>
                      {item.languages &&
                        item.languages
                          .map(code => languageMap[code] || code)
                          .join(', ')}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.heartContainer}
                onPress={() => toggleLike(item.clubId)}>
                <Icon
                  name={item.isHeart === 'YES' ? 'heart' : 'heart-outline'}
                  size={25}
                  color="#58C047"
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </>
  );
};
const calculateScrollPosition = (offset, contentHeight, viewportHeight) => {
  return Math.floor((offset / (contentHeight - viewportHeight)) * height * 10);
};
const styles = StyleSheet.create({
  clubContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    marginLeft: 10,
    marginRight: 10,
  },
  imageContainer: {
    width: width * 120,
    height: height * 94,
    borderRadius: 20,
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
    fontSize: height * 16,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: height * 10,
  },
  infoContainer: {
    paddingBottom: height * 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  info: {
    fontWeight: '400',
    fontSize: height * 11,
    color: 'rgba(0, 0, 0, 0.8)',
    marginLeft: width * 10,
  },
});
export default BoardDefaultList;
