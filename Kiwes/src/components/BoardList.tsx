import React, {useCallback, useState} from 'react';
import {FlatList} from 'react-native';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import {BoardPost} from '../utils/commonInterface';
import {useFocusEffect} from '@react-navigation/native';
import ListComponent from './atoms/ListComponent';
const BoardList = ({url, data, navigateToClub}: any) => {
  const [posts, setPosts] = useState<BoardPost[]>(data || []);
  const fetchData = async () => {
    if (url == '') return;
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
    }, []),
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.clubId}
      style={{flex: 1}}
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
        <ListComponent
          item={item}
          navigateToClub={navigateToClub}
          posts={posts}
          setPosts={setPosts}
        />
      )}
    />
  );
};
export default BoardList;
