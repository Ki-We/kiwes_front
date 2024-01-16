import React, {useEffect, useState} from 'react';
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
import {height, width} from '../global';

const calculateScrollPosition = (offset, contentHeight, viewportHeight) => {
  return Math.floor((offset / (contentHeight - viewportHeight)) * height * 10);
};

const BoardList = ({url, navigateToClub, Nothing}: any) => {
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [cursor, setCursor] = useState(0);
  const [isMore, setIsMore] = useState(true);

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
    console.log(posts);
  }, [cursor]);

  useEffect(() => {
    setPosts([]);
    setIsMore(true);
    setCursor(0);
    fetchAndSetData();
  }, [url]);

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
  // useFocusEffect(
  //   useCallback(() => {
  //     return () => {};
  //   }, []),
  // );
  // const removeNoHeartPosts = () => {
  //   const filteredPosts = posts.filter(post => post.isHeart === 'YES');
  //   setPosts(filteredPosts);
  //   console.log(filteredPosts);
  //   console.log(posts);
  // };
  const toggleLike = async (id: String) => {
    console.log(id);
    const post = posts.find(post => post.clubId === id);
    if (!post) {
      return;
    }
    console.log(post);
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
      )}
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
    fontSize: height * 18,
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
