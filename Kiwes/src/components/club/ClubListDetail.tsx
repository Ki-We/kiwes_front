import React from 'react';
import RoundCategory from '../atoms/roundCategory';
import {StyleSheet, View} from 'react-native';
import {width} from '../../global';
import {categoryList, langList} from '../../utils/utils';
import Swiper from 'react-native-swiper';
import RoundBtn from '../atoms/roundBtn';

export default function ClubListDetail({type, navigation}: any) {
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
        text={text}
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
  return (
    <>
      <Swiper
        loop={false}
        showsPagination={true}
        index={0}
        style={styles.swiper}
        renderPagination={renderPaginationRect}>
        <View style={styles.container}>
          {firstRowCategoryList.map(({key, text}, i) => (
            <View key={`first_${i}`}>{renderBtn(key, text)}</View>
          ))}
        </View>
        <View style={styles.container}>
          {secondRowCategoryList.map(({key, text}, i) => (
            <View key={`second${i}`}>{renderBtn(key, text)}</View>
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
