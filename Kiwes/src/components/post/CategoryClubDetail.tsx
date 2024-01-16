import React, {useState} from 'react';
import RoundCategory from '../atoms/roundCategory';
import {StyleSheet, View} from 'react-native';
import {width} from '../../global';
import {categoryList} from '../../utils/utils';
import Swiper from 'react-native-swiper';

export default function CategoryClubDetail({post, setPost, navigation}: any) {
  const [category, setCategory] = useState(post.category);

  const splitIndex = Math.ceil(categoryList.length / 2);
  const firstRowCategoryList = categoryList.slice(splitIndex);
  const secondRowCategoryList = categoryList.slice(0, splitIndex);

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
      <Swiper
        loop={false}
        showsPagination={true}
        index={0}
        style={styles.swiper}
        renderPagination={renderPaginationRect}
      >
        <View style={styles.container}>
          {firstRowCategoryList.map(({ key, text }, i) => (
            <RoundCategory
              key={`category_${i}`}
              text={text}
              isSelect={category === key}
              onPress={() => {
                setCategory(key);
                setPost({ ...post, category: key });
                navigation.navigate('CategoryClub', { selectedCategory: text });
              }}
            />
          ))}
        </View>
        <View style={styles.container}>
          {secondRowCategoryList.map(({ key, text }, i) => (
            <RoundCategory
              key={`category_${i}`}
              text={text}
              isSelect={category === key}
              onPress={() => {
                setCategory(key);
                setPost({ ...post, category: key });
                navigation.navigate('CategoryClub', { selectedCategory: text });
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
  swiper: {
    height: 170,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 20,
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
});
