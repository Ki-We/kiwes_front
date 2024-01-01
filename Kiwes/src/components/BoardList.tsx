import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RESTAPIBuilder } from '../utils/restapiBuilder';
import { apiServer } from '../utils/metaData';
import { View } from 'native-base';

interface BoardPost {
  locationsKeyword: string;
  clubId: string;
  title: string;
  thumbnailImage: string;
  date: string;
  heart: boolean;
  languages: string[];
}

const BoardList = ({url}:any) => {
  // const url =`${apiServer}/api/v1/heart/club_list`;
  const [posts, setPosts] = useState<BoardPost[]>([]);
  useEffect(() => {
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

    fetchData();
  }, []);

  const toggleLike = (id: String) => {
    setPosts(
      posts.map(post =>
        post.clubId === id ? {...post, liked: !post.heart} : post,
      ),
    );
  };

  return (

    <FlatList
      data={posts}
      keyExtractor={item => item.clubId}
      renderItem={({item}) => (
      <TouchableOpacity style={styles.clubContainer}>
        <Image source={{uri: item.thumbnailImage}} style={styles.imageContainer} />

        <View style={styles.textContainer}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.date}</Text>
            <Text>{item.locationsKeyword}</Text>
            <Text>{item.languages}</Text>
          </View>

         
        </View>
        <TouchableOpacity style={styles.heartContainer} onPress={() => toggleLike(item.clubId)}>
            <Icon name={item.heart ? 'heart' : 'heart-o'} size={25} color="#58C047" />
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
    width: 120,
    height: 100,
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
    fontWeight :'bold',
  },
});
export default BoardList;