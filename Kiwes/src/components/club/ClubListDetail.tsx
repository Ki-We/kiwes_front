import React from 'react';
import RoundCategory from '../atoms/roundCategory';
import {StyleSheet, View} from 'react-native';
import {width} from '../../global';
import {categoryList, langList} from '../../utils/utils';
import Swiper from 'react-native-swiper';
import RoundBtn from '../atoms/roundBtn';

export default function ClubListDetail({type, navigation}: any) {
  const swiperHeight = type == 'category' && width < 0.97 ? 200 : 150;
  const allList = type == 'category' ? categoryList : langList;
  const splitIndex = Math.ceil(allList.length / 2);
  const secondRowCategoryList = allList.slice(splitIndex);
  const firstRowCategoryList = allList.slice(0, splitIndex);

  const renderPaginationRect = (index: number, total: number) => {
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

  const handlePress = (key: string) => {
    type == 'category'
      ? navigation.navigate('ClubCategory', {
          selectedItem: key,
        })
      : navigation.navigate('ClubLanguage', {
          selectedItem: key,
        });
  };

  const renderBtn = (key: string, text: string) => {
    return type == 'category' ? (
      <RoundCategory
        id={key}
        isSelect={false}
        onPress={() => handlePress(key)}
      />
    ) : (
      <RoundBtn
        text={text}
        isSelect={false}
        onPress={() => {
          handlePress(key);
        }}
      />
    );
  };
  let style = styles.container2;
  if (type == 'category') {
    style = width < 0.97 ? styles.container_small : styles.container;
  }
  return (
    <>
      <Swiper
        loop={false}
        showsPagination={true}
        index={0}
        style={{height: swiperHeight}}
        renderPagination={renderPaginationRect}>
        <View style={style}>
          {firstRowCategoryList.map(({key, text}, i) => (
            <View key={`first_${i}`}>{renderBtn(key, text)}</View>
          ))}
        </View>
        <View style={style}>
          {secondRowCategoryList.map(({key, text}, i) => (
            <View key={`second${i}`}>{renderBtn(key, text)}</View>
          ))}
        </View>
      </Swiper>
    </>
  );
}

const styles = StyleSheet.create({
  container_small: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 3,
    marginTop: 10,
    paddingHorizontal: 30,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: width * 12,
  },
  container2: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: width * 12,
  },
  swiper: {
    height: 150,
  },
  paginationContainer: {
    marginTop: -20,
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
