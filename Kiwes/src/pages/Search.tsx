import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchHeader from '../components/search/SearchHeader';
import {apiServer} from '../utils/metaData';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import {SafeAreaView} from 'react-native-safe-area-context';
import BoardList from '../components/BoardList';
import {useEffect, useState} from 'react';
import InitSearch from '../components/search/initSerch';
import {Image, StyleSheet, Text, View} from 'react-native';
import {width} from '../global';
import ListComponent from '../components/atoms/ListComponent';

export default function Search({navigation}: any) {
  const [init, setInit] = useState(true);
  const [searchKeyward, SetSearchKeyward] = useState();
  const [recommand, setRecommand] = useState([]);
  let url = `${apiServer}/api/v1/search?keyword=${searchKeyward}&cursor=`;
  const doSearch = async (search: String) => {
    SetSearchKeyward(search);
    setInit(false);
    let temp = await AsyncStorage.getItem('search');
    const keywords = temp ? JSON.parse(temp) : [];
    const first = keywords.shift();
    keywords.unshift(first);

    if (first == search) {
      return;
    }
    if (keywords.length > 2) {
      keywords.pop();
    }
    await AsyncStorage.setItem('search', JSON.stringify([search, ...keywords]));
  };
  const getRecommand = async () => {
    const url = `${apiServer}/api/v1/club/popular`;
    const {data} = await new RESTAPIBuilder(url, 'GET')
      .setNeedToken(true)
      .build()
      .run()
      .catch(err => {
        console.log('err4 : ', err);
      });
    setRecommand(data.slice(2));
  };
  const navigateToClub = (clubId: any) => {
    navigation.navigate('ClubPage', {clubId: clubId});
  };
  useEffect(() => {
    getRecommand();
  }, []);
  // eslint-disable-next-line react/no-unstable-nested-components
  const Nothing = () => {
    return (
      <View style={styles.container}>
        <View>
          <Image
            source={{
              uri: 'https://kiwes2-bucket.s3.ap-northeast-2.amazonaws.com/main/noSearch.png',
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.recommandContainer}>
          <Text style={styles.title}>추천 모임</Text>
          {recommand.map((r, i) => (
            <ListComponent
              key={`recommand_${i}`}
              item={r}
              navigateToClub={navigateToClub}
              posts={recommand}
              setPosts={setRecommand}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <>
      <SearchHeader navigation={navigation} doSearch={doSearch} />
      {init ? (
        <InitSearch doSearch={doSearch} navigateToClub={navigateToClub} />
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <BoardList
            url={url}
            navigateToClub={navigateToClub}
            Nothing={Nothing}
          />
        </SafeAreaView>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    aspectRatio: 1,
    width: '60%',
    marginTop: 10,
    marginBottom: 30,
    marginRight: 5,
  },
  recommandContainer: {
    marginLeft: 15,
    alignSelf: 'stretch',
  },
  title: {
    color: '#000000',
    fontFamily: 'Pretendard',
    fontSize: width * 15,
    fontWeight: '700',
  },
});
