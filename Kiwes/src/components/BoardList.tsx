import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RESTAPIBuilder } from '../utils/restapiBuilder';
import { apiServer } from '../utils/metaData';

interface BoardPost {
  locationsKeyword: string;
  clubId: string;
  title: string;
  thumbnailImage: string;
  date: string;
  heart: boolean;
  languages: string[];
}

const BoardList = ({url}:any, {navigation}: any) => {
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
        <TouchableOpacity onPress={() => {navigation.navigate('ClubPage', { club_id: item.clubId });}}>
          <Image source={{uri: item.thumbnailImage}} style={{width: '100%', height: 200}} />
          <Text>{item.title}</Text>
          <Text>{item.date}</Text>
          <Text>{item.locationsKeyword}</Text>
          <Text>{item.languages}</Text>
          <TouchableOpacity onPress={() => toggleLike(item.clubId)}>
          <Icon name={item.heart ? 'heart' : 'heart-o'} size={25} color="#58C047" />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    />
  );
};

export default BoardList;