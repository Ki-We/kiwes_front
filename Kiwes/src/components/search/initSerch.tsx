import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SearchBtn from './searchBtn';
import {height, width} from '../../global';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';
import {apiServer} from '../../utils/metaData';

export default function InitSearch({doSearch}: any) {
  const [keywords, setKeywords] = useState([]);
  const [popular, setPopular] = useState([]);
  const getKeywords = async () => {
    let temp = await AsyncStorage.getItem('search');
    if (!temp) return;
    const k = JSON.parse(temp);
    setKeywords(k);
  };
  const removeKeyword = async () => {
    await AsyncStorage.removeItem('search');
    setKeywords([]);
  };
  const getPopular = async () => {
    const url = `${apiServer}/api/v1/search/popular`;
    const {data} = await new RESTAPIBuilder(url, 'GET')
      .setNeedToken(true)
      .build()
      .run()
      .catch(err => {
        console.log('err2 :', err);
      });
    setPopular(data);
  };
  useEffect(() => {
    getKeywords();
    getPopular();
  }, []);
  return (
    <>
      <View style={styles.conatiner}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>최근 검색어</Text>
          <TouchableOpacity onPress={removeKeyword}>
            <Text style={styles.btn}>지우기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.keywordContainer}>
          {keywords.map((keyword, i) => (
            <SearchBtn
              key={`keyword_${i}`}
              text={keyword}
              onPress={() => {
                doSearch(keyword);
              }}
            />
          ))}
        </View>
      </View>
      <View style={styles.conatiner}>
        <Text style={styles.title}>인기 검색어</Text>
        <View style={styles.popularContainer}>
          <View>
            {popular.slice(0, 3).map((p, i) => (
              <Pressable key={`popular_l_${i}`} onPress={() => doSearch(p)}>
                <Text style={styles.popular}>
                  {i + 1}
                  {'           '}
                  {p}
                </Text>
              </Pressable>
            ))}
          </View>
          <View>
            {popular.slice(3).map((p, i) => (
              <Pressable key={`popular_r_${i}`} onPress={() => doSearch(p)}>
                <Text style={styles.popular}>
                  {i + 4}
                  {'           '}
                  {p}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  conatiner: {
    margin: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#8A8A8A',
  },
  btn: {
    color: '#303030',
  },
  keywordContainer: {
    flexDirection: 'row',
    marginTop: height * 15,
  },
  popularContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingLeft: width * 10,
    paddingRight: width * 90,
  },
  popular: {
    color: '#303030',
    marginTop: height * 15,
  },
});
