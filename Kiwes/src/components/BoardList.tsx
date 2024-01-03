import React, {useCallback, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import {apiServer} from '../utils/metaData';
import {useFocusEffect} from '@react-navigation/native';
import {BoardPost} from '../utils/commonInterface';
import {languageMap} from '../utils/languageMap';
import Icon from 'react-native-vector-icons/Ionicons';
const BoardList = ({url, navigateToClub}) => {
  const screenHeight = Dimensions.get('window').height;
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const fetchData = async () => {
    try {
      const response = await new RESTAPIBuilder(url, 'GET')
        .setNeedToken(true)
        .build()
        .run();
      setPosts(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => {
        fetchData();
      };
    }, []),
  );

  const toggleLike = async (id: String) => {
    const post = posts.find(post => post.clubId === id);
    if (!post) {
      return;
    }

    // Update state
    const updatedPosts = posts.map(post =>
      post.clubId === id ? {...post, heart: !post.heart} : post,
    );
    setPosts(updatedPosts);
    try {
      const updatedPost = updatedPosts.find(post => post.clubId === id);
      const apiUrl = `${apiServer}/api/v1/heart/${id}`;
      const response = await new RESTAPIBuilder(
        apiUrl,
        updatedPost.heart ? 'PUT' : 'DELETE',
      )
        .setNeedToken(true)
        .build()
        .run();

      if (response.data == undefined) {
        throw new Error('Failed to update heart status');
      }
    } catch (err) {
      console.error(err);
      // If API call fails, revert state
      setPosts(
        posts.map(post =>
          post.clubId === id ? {...post, heart: post.heart} : post,
        ),
      );
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.clubId}
      onScroll={event => {
        // 스크롤 위치를 얻습니다.
        let scrollPosition = event.nativeEvent.contentOffset.y;
        if (scrollPosition < 0) {
          scrollPosition = 0;
        }
        // 아래 코드는 스크롤 값(coursor)입니다.
        // const scrollRatio = Math.round((scrollPosition / screenHeight) * 10);
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
              <View style={styles.infoContainer} >
              <Icon name="calendar-outline" />
              <Text style={styles.info}>{item.date}</Text>
              </View>
              <View style={styles.infoContainer} >
              <Icon name="map-outline" />
              <Text style={styles.info}>{item.locationsKeyword}</Text>
              </View>
              <View style={styles.infoContainer} >
              <Icon name="globe-outline"/>
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
              name={item.heart ? 'heart' : 'heart-outline'}
              size={25}
              color="#58C047"
            />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    />
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
    height: 97  ,
    borderRadius: 30,
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
  },
  infoContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  info:{
    marginLeft:5,
  },
});
export default BoardList;
