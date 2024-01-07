import React, {useCallback, useState} from 'react';
import {FlatList} from 'react-native';
import {BoardPost} from '../utils/commonInterface';
import {useFocusEffect} from '@react-navigation/native';
import ListComponent from './atoms/ListComponent';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
const BoardList = ({url, data, navigateToClub}: any) => {
  const [posts, setPosts] = useState<BoardPost[]>(data || []);

  const fetchData = async () => {
    if (url == '') return;
    const {data} = await new RESTAPIBuilder(url, 'GET')
      .setNeedToken(true)
      .build()
      .run()
      .catch(err => {
        console.log('err : ', err);
      });

    console.log(data);
    setPosts(data);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => {
        fetchData();
      };
    }, []),
  );

  return (
    <>
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
    </>
  );
};
export default BoardList;