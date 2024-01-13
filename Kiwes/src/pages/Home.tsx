import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Swiper from 'react-native-swiper';

const categoriesImg = require('../../assets/images/category01.png');
const noticeBannerImg = require('../../assets/images/nbanner.png');

export function Home({navigation}: any) {
  const bannerRef = useRef(null);
  const popularGroupsRef = useRef(null);

  const handleBannerPress = () => {
    navigation.navigate('Event');
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userData');
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const banners = [
    {key: '1', image: noticeBannerImg},
    {key: '2', image: noticeBannerImg},
  ];

  const popularGroupImages = [categoriesImg, categoriesImg];
  const [currentPopularGroupImageIndex, setCurrentPopularGroupImageIndex] =
    useState(0);

  const changePopularGroupImage = () => {
    setCurrentPopularGroupImageIndex(prevIndex =>
      prevIndex === popularGroupImages.length - 1 ? 0 : prevIndex + 1,
    );
    popularGroupsRef.current.scrollBy(1, true);
  };

  const categories1stFloor = [
    {key: '1', name: 'K-pop'},
    {key: '2', name: '맛집/카페'},
    {key: '3', name: '스터디'},
    {key: '4', name: '여행'},
  ];

  const categories1stFloor2 = [
    {key: '1', name: '게임/보드게임'},
    {key: '2', name: '문화/전시/공연'},
    {key: '3', name: '술'},
  ];

  const categories2ndFloor = [
    {key: '5', name: '한국 문화'},
    {key: '6', name: '영화/드라마/애니'},
    {key: '7', name: '파티/클럽'},
  ];

  const categories2ndFloor2 = [
    {key: '5', name: '스포츠'},
    {key: '6', name: '공예/그림'},
    {key: '7', name: '봉사활동'},
    {key: '8', name: '기타'},
  ];

  const language1stFloor = [
    {key: '8', name: '한글'},
    {key: '9', name: 'English'},
    {key: '10', name: '日本語'},
  ];

  const language2ndFloor = [
    {key: '11', name: '中文(简体)'},
    {key: '12', name: '中文(繁體)'},
    {key: '13', name: 'Français'},
  ];

  const language1stFloor2 = [
    {key: '8', name: 'Deutsch'},
    {key: '9', name: 'Español'},
    {key: '10', name: '기타'},
  ];

  const language2ndFloor2 = [
    {key: '11', name: 'Tiếng Việt'},
    {key: '12', name: 'Pусский'},
  ];

  const [selectedCategory, setSelectedCategory] = useState('');
  const RecommendedGroup = () => {
    return (
      <View style={styles.recommendedGroupsContainer}>
        <View style={styles.roundedRectangle}>
          <View style={styles.groupContent}>
            <Image
              source={require('../../assets/images/jejuImg.png')}
              style={styles.groupImage}
            />
            <View style={styles.textContent}>
              <Text style={styles.groupTitle}>제주도 여행 같이 가요~!</Text>
              <Text style={styles.groupDetail}>23.03.03</Text>
              <Text style={styles.groupDetail}>제주도</Text>
              <Text style={styles.groupDetail}>English 한국어</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const renderCategoryPaginationRect = (
    index: number,
    total: number,
    context: any,
  ) => {
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

  const renderCategorySwiper = () => {
    return (
      <Swiper
        loop={false}
        showsPagination={true}
        height={150}
        renderPagination={renderCategoryPaginationRect}>
        <View>
          <FlatList
            data={categories1stFloor}
            renderItem={renderCategory}
            numColumns={4}
            contentContainerStyle={styles.categoryList}
            keyExtractor={item => item.key}
            columnWrapperStyle={styles.categoryColumnWrapper}
          />
          <FlatList
            data={categories2ndFloor}
            renderItem={renderCategory}
            numColumns={3}
            contentContainerStyle={styles.categoryList}
            keyExtractor={item => item.key}
            columnWrapperStyle={styles.categoryColumnWrapper}
          />
        </View>
        <View>
          <FlatList
            data={categories1stFloor2}
            renderItem={renderCategory}
            numColumns={3}
            contentContainerStyle={styles.categoryList}
            keyExtractor={item => item.key}
            columnWrapperStyle={styles.categoryColumnWrapper}
          />
          <FlatList
            data={categories2ndFloor2}
            renderItem={renderCategory}
            numColumns={4}
            contentContainerStyle={styles.categoryList}
            keyExtractor={item => item.key}
            columnWrapperStyle={styles.categoryColumnWrapper}
          />
        </View>
      </Swiper>
    );
  };
  const renderCategorySwiper2 = () => {
    return (
      <Swiper
        loop={false}
        showsPagination={true}
        height={150}
        renderPagination={renderCategoryPaginationRect}>
        <View>
          <FlatList
            data={language1stFloor}
            renderItem={renderCategory}
            numColumns={4}
            contentContainerStyle={styles.categoryList}
            keyExtractor={item => item.key}
            columnWrapperStyle={styles.categoryColumnWrapper}
          />
          <FlatList
            data={language2ndFloor}
            renderItem={renderCategory}
            numColumns={3}
            contentContainerStyle={styles.categoryList}
            keyExtractor={item => item.key}
            columnWrapperStyle={styles.categoryColumnWrapper}
          />
        </View>
        <View>
          <FlatList
            data={language1stFloor2}
            renderItem={renderCategory}
            numColumns={3}
            contentContainerStyle={styles.categoryList}
            keyExtractor={item => item.key}
            columnWrapperStyle={styles.categoryColumnWrapper}
          />
          <FlatList
            data={language2ndFloor2}
            renderItem={renderCategory}
            numColumns={4}
            contentContainerStyle={styles.categoryList}
            keyExtractor={item => item.key}
            columnWrapperStyle={styles.categoryColumnWrapper}
          />
        </View>
      </Swiper>
    );
  };
  const renderCategory = ({item}: any) => {
    const textSize = 12;
    const textLength = item.name.length;
    let itemWidth = textLength * (textSize * 1.5);

    if (textLength < 5) {
      itemWidth *= 1.7;
    }

    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          selectedCategory === item.key ? {backgroundColor: '#9BD23C'} : null,
          {width: itemWidth, height: 50},
        ]}
        onPress={() =>
          navigation.navigate('Club', {selectedCategory: item.name})
        }>
        <Text style={styles.categoryText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  // const renderBannerItem = ({ item }: any) => (
  //   <Image source={item.image} style={styles.bannerImage} />
  // );
  const renderPagination = (index: number, total: number, context: any) => {
    return (
      <View style={styles.paginationContainer}>
        <View style={styles.pagination}>
          {popularGroupImages.map((image, i) => (
            <View
              key={i}
              style={[
                styles.paginationDot,
                i === index ? styles.paginationDotActive : null,
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBannerPress}>
          <Swiper
            style={styles.wrapper}
            loop={false}
            autoplay={false}
            autoplayTimeout={5}
            showsPagination={false}
            ref={bannerRef}>
            {banners.map((item, index) => (
              <View key={index}>
                <Image source={item.image} style={styles.bannerImage} />
              </View>
            ))}
          </Swiper>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>인기 모임</Text>
        <Swiper
          style={styles.wrapper1}
          loop={true}
          autoplay={true}
          autoplayTimeout={5}
          showsPagination={true}
          renderPagination={renderPagination}
          ref={popularGroupsRef}>
          {popularGroupImages.map((image, index) => (
            <View key={index} style={styles.popularGroupSlide}>
              <Image source={image} style={styles.popularGroupsImage} />
            </View>
          ))}
        </Swiper>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>카테고리별 모임</Text>
          <View style={styles.sectionContent}>
            {renderCategorySwiper([
              categories1stFloor,
              categories1stFloor2,
              categories2ndFloor,
              categories2ndFloor2,
            ])}
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>언어별 모임</Text>
          <View style={styles.sectionContent}>
            {renderCategorySwiper2([
              language1stFloor,
              language2ndFloor,
              language1stFloor2,
              language2ndFloor2,
            ])}
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>추천 모임</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Club', {selectedCategory})}>
              <RecommendedGroup />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  wrapper: {
    height: 180,
  },
  wrapper1: {
    height: 350,
    alignSelf: 'center',
    marginTop: 10,
  },
  popularGroupSlide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  sectionContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  sectionContent: {
    width: '100%',
    alignItems: 'center',
  },
  sectionTitle: {
    marginTop: 40,
    left: 35,
    fontSize: 15,
    color: '#303030',
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  popularGroupsImage: {
    width: 350,
    height: 350,
    borderRadius: 25,
    resizeMode: 'contain',
    opacity: 0.65,
  },
  categoryList: {
    marginTop: 15,
    width: '100%',
    paddingHorizontal: 10,
  },
  categoryColumnWrapper: {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  categoryItem: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#9BD23C',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  categoryText: {
    fontSize: 12,
    color: '#303030',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DADADA',
    marginHorizontal: 5,
    bottom: -35,
  },
  paginationDotActive: {
    backgroundColor: '#9BD23C',
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
  recommendedGroupsContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  roundedRectangle: {
    width: '100%',
    height: 130,
    marginTop: 10,
    marginBottom: 50,
    backgroundColor: 'rgba(255, 253, 141, 0.3)',
    borderRadius: 30,
    borderColor: '#DADADA',
    borderWidth: 1,
  },
  groupContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupImage: {
    borderRadius: 10,
    width: 150,
    height: 100,
    marginLeft: 10,
    marginBottom: -50,
  },
  textContent: {
    marginLeft: 10,
  },
  groupTitle: {
    color: '#303030',
    fontSize: 16,
    right: 5,
    bottom: -11,
  },
  groupDetail: {
    color: '#303030',
    fontSize: 12,
    left: 10,
    bottom: -20,
  },
});

export default Home;
