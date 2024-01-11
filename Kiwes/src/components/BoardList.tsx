import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import {apiServer} from '../utils/metaData';
import {BoardPost} from '../utils/commonInterface';
import {languageMap} from '../utils/languageMap';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {height} from '../global';
const BoardList = ({url, data, navigateToClub}: any) => {
  const [posts, setPosts] = useState<BoardPost[]>(data || []);
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

  return (
    <>
      <FlatList
        data={posts}
        keyExtractor={item => item.clubId}
        style={{flex: 1}}
        onScroll={event => {
          const contentHeight = event.nativeEvent.contentSize.height; // 스크롤 뷰의 전체 높이
          const scrollViewHeight = event.nativeEvent.layoutMeasurement.height; // 스크롤 뷰의 뷰포트 높이
          const scrolledOffset = event.nativeEvent.contentOffset.y; // 현재 스크롤 위치
          let newScrollPosition =
            scrolledOffset / (contentHeight - scrollViewHeight);
          newScrollPosition = Math.round(newScrollPosition * height * 10);
          if (newScrollPosition > 100 && isMore) {
            setCursor(prevCursor => prevCursor + 1);
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
                <Text style={styles.title}>{item.title}</Text>
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
                    name="map-outline"
                    size={14}
                    color={'#rgba(0, 0, 0, 0.7)'}
                  />
                  <Text style={styles.info}>{item.locationKeyword}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Icon
                    name="globe-outline"
                    size={14}
                    color={'#rgba(0, 0, 0, 0.7)'}
                  />
                  <Text style={styles.info}>
                    {item.languages
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
    </>
  );
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
    width: 122,
    height: 97,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: 3,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  info: {
    color: 'rgba(0, 0, 0, 0.8)',
    marginLeft: 5,
  },
});
export default BoardList;
