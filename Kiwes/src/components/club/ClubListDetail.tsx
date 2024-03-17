import React, {useState} from 'react';
import RoundCategory from '../atoms/roundCategory';
import {StyleSheet, View} from 'react-native';
import {LANGUAGE, categoryList, langList} from '../../utils/utils';
import Swiper from 'react-native-swiper';
import RoundBtn from '../atoms/roundBtn';
import {height, width} from '../../global';
import {useSelector} from 'react-redux';
import {RootState} from '@/slice/RootReducer';
import {FlatList} from 'react-native-gesture-handler';

export default function ClubListDetail({type, navigation}: any) {
  const language = useSelector((state: RootState) => state.language);
  let swiperHeight = 150;
  if (type == 'category') {
    if (language.language === LANGUAGE.EN) {
      swiperHeight += 90;
    } else if (width < 0.97) {
      swiperHeight += 50;
    }
  }
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
    style =
      width < 0.97 || language.language == LANGUAGE.EN
        ? styles.container_small
        : styles.container;
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
          {type === 'category' ? (
            firstRowCategoryList.map(({key, text}, i) => (
              <View key={`first_${i}`}>{renderBtn(key, text)}</View>
            ))
          ) : (
            <FlatList
              data={firstRowCategoryList}
              style={{height: '100%'}}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <View style={{paddingHorizontal: width * 5}}>
                  {renderBtn(item.key, item.text)}
                </View>
              )}
              numColumns={3}
            />
          )}
        </View>
        <View style={style}>
          {type === 'category' ? (
            secondRowCategoryList.map(({key, text}, i) => (
              <View key={`first_${i}`}>{renderBtn(key, text)}</View>
            ))
          ) : (
            <FlatList
              data={secondRowCategoryList}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <View style={{paddingHorizontal: width * 5}}>
                  {renderBtn(item.key, item.text)}
                </View>
              )}
              numColumns={3}
            />
          )}
          {/* <FlatList
            data={secondRowCategoryList}
            renderItem={({item}) => (
              <View>{renderBtn(item.key, item.text)}</View>
            )}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 0,
            }}
            onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
            numColumns={3}
          /> */}
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
    gap: width * 6,
    marginTop: 10,
    paddingHorizontal: 30,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: width * 12,
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: width * 12,
    minHeight: 200,
  },
  swiper: {
    height: 150,
  },
  paginationContainer: {
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
    top: height * 30,
  },
  paginationRectActive: {
    backgroundColor: '#9BD23C',
  },
});
