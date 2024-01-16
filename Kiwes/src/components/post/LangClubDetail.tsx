import React, { useState } from 'react';
import RoundBtn from '../atoms/roundBtn';
import { StyleSheet, View } from 'react-native';
import { height, width } from '../../global';
import { langList } from '../../utils/utils';
import Swiper from 'react-native-swiper';

export default function LangClubDetail({ post, setPost, navigation }: any) {
  const [selectedLang, setSelectedLang] = useState<String[]>(post?.languages || []);

  const checkLang = () => {
    if (selectedLang.length >= 1) return false;
    return true;
  };

  const onPressEvent = (lang: String) => {
    if (selectedLang.includes(lang)) {
      var s = selectedLang.filter(function (item) {
        return item !== lang;
      });
      setSelectedLang(s);
      setPost({ ...post, languages: s });
      return;
    }
    if (checkLang()) {
      setSelectedLang([...selectedLang, lang]);
      setPost({ ...post, languages: [...selectedLang, lang] });
    }
  };

  const splitIndex = Math.ceil(langList.length / 2);
  const firstRowLangList = langList.slice(0, splitIndex);
  const secondRowLangList = langList.slice(splitIndex);

  const renderPaginationRect = (index: number, total: number, context: any) => {
    return (
      <View style={styles.paginationContainer}>
        <View style={styles.paginationRect}>
          {[...Array(total)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.paginationRectItem,
                i === index ? styles.paginationRectActive : null,
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.text}></View>
      <Swiper
        loop={false}
        showsPagination={true}
        index={0}
        style={styles.swiper}
        renderPagination={renderPaginationRect}>
        <View style={styles.container}>
          {firstRowLangList.map(({ key, text }, i) => (
            <RoundBtn
              key={`lang_${i}`}
              text={text}
              isSelect={selectedLang.includes(key)}
              onPress={() => {
                onPressEvent(key);
                navigation.navigate('CategoryClub', { selectedLang: text });
              }}
            />
          ))}
        </View>
        <View style={styles.container}>
          {secondRowLangList.map(({ key, text }, i) => (
            <RoundBtn
              key={`lang_${i}`}
              text={text}
              isSelect={selectedLang.includes(key)}
              onPress={() => {
                onPressEvent(key);
                navigation.navigate('CategoryClub', { selectedLang: text });
              }}
            />
          ))}
        </View>
      </Swiper>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: width * 20,
  },
  text: {
    marginLeft: width * 20,
    color: '#ADADAD',
    marginBottom: height * 15,
  },
  swiper: {
    height: 200,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationRect: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationRectItem: {
    width: 20,
    height: 5,
    backgroundColor: '#DADADA',
    marginHorizontal: -1,
    borderRadius: 5,
    top: 15,
  },
  paginationRectActive: {
    backgroundColor: '#9BD23C',
  },
  highlight: {
    color: '#3DBE14',
  },
  selectedCategory: {
    backgroundColor: '#9BD23C',
  },
});
