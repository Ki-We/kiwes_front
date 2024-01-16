import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import LangClubDetail from '../components/post/LangClubDetail';
import CategoryClubDetail from '../components/post/CategoryClubDetail';
import Icon from 'react-native-vector-icons/Ionicons';

const categoriesImg = require('../../assets/images/category01.png');
const noticeBannerImg = require('../../assets/images/nbanner.png');

export function Home({ navigation }: any) {
  const bannerRef = useRef(null);
  const popularGroupsRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleBannerPress = () => {
    navigation.navigate('Event');
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userData');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const banners = [
    { key: '1', image: noticeBannerImg },
    { key: '2', image: noticeBannerImg },
  ];

  const [popularGroupImages, setPopularGroupImages] = useState([
    { image: categoriesImg, isLiked: false },
    { image: categoriesImg, isLiked: false },
    { image: categoriesImg, isLiked: false },
    { image: categoriesImg, isLiked: false },
    { image: categoriesImg, isLiked: false },
  ]);

  const togglePopularGroupLike = (index: number) => {
    const updatedPopularGroupImages = [...popularGroupImages];
    updatedPopularGroupImages[index].isLiked = !updatedPopularGroupImages[index].isLiked;
    setPopularGroupImages(updatedPopularGroupImages);
  };

  const handlePopularGroupPress = (index: number) => {
    console.log(`Clicked on popular group at index ${index}`);
  };

  const renderRecommendedGroupItem = ({ item }: any) => (
    <RecommendedGroup
      title={item.title}
      date={item.date}
      location={item.location}
      languages={item.languages}
    />
  );

  const navigateToClubDetail = (title, date, location, languages) => {
    navigation.navigate('ClubDetail', { title, date, location, languages });
  };

  const RecommendedGroup = ({ title, date, location, languages, navigation }: any) => {
    const [isLiked, setIsLiked] = useState(false);
    const toggleLike = () => {
      setIsLiked((prev) => !prev);
    };
    return (
      <TouchableOpacity onPress={() => navigateToClubDetail(title, date, location, languages)}>
        <View style={styles.recommendedGroupsContainer}>
          <View style={styles.roundedRectangle}>
            <View style={styles.groupContent}>
              <Image source={require('../../assets/images/jejuImg.png')} style={styles.groupImage} />
              <View style={styles.textContent}>
                <Text style={styles.groupTitle}>{title}</Text>
                <Text style={styles.groupDetail}>{date}</Text>
                <Text style={styles.groupDetail}>{location}</Text>
                <Text style={styles.groupDetail}>{languages.join(', ')}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.RHeartContainer} onPress={toggleLike}>
              <Icon name={isLiked ? 'heart' : 'heart-outline'} size={24} color={isLiked ? 'green' : '#58C047'} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const recommendedGroups = [
    { key: '1', title: '제주도 여행 같이 가요~!', date: '23.03.03', location: '제주도', languages: ['English', '한국어'] },
    { key: '2', title: '강원도 여행 같이 가요~!', date: '23.03.03', location: '제주도', languages: ['English', '한국어'] },
    { key: '3', title: '부산 여행 같이 가요~!', date: '23.03.03', location: '제주도', languages: ['English', '한국어'] },
    { key: '4', title: '서울 여행 같이 가요~!', date: '23.03.03', location: '제주도', languages: ['English', '한국어'] },
    { key: '5', title: ' 여행 같이 가요~!', date: '23.03.03', location: '제주도', languages: ['English', '한국어'] },
  ];

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

  const renderFlatListItem = ({ item, index }: any) => (
    <RecommendedGroup
      title={item.title}
      date={item.date}
      location={item.location}
      languages={item.languages}
    />
  );

  const renderPopularGroupItem = (imageSource: any, index: number) => (
    <View key={index} style={styles.popularGroupSlide}>
      <View style={styles.imageContainer}>
        <Image source={imageSource.image} style={styles.popularGroupsImage} />
        <View style={styles.PHeartContainer}>
          <TouchableOpacity onPress={() => togglePopularGroupLike(index)}>
            {imageSource.isLiked ? (
              <Icon name="heart" size={24} color="green" />
            ) : (
              <Icon name="heart-outline" size={24} color="#58C047" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

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
          autoplayTimeout={6}
          showsPagination={true}
          renderPagination={renderPagination}
          onIndexChanged={(index) => setCurrentPage(index)}
          ref={popularGroupsRef}>
          {popularGroupImages.map((image, index) => renderPopularGroupItem(image, index))}
        </Swiper>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>카테고리별 모임</Text>
          <View style={styles.sectionContent}>
            <CategoryClubDetail post={{ categories: [] }} setPost={() => {}} navigation={navigation} />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>언어별 모임</Text>
          <View style={styles.sectionContent}>
            <LangClubDetail post={{ languages: [] }} setPost={() => {}} navigation={navigation} />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>추천 모임</Text>
          <Swiper
            style={styles.wrapper2}
            loop={true}
            autoplay={true}
            autoplayTimeout={6}
            showsPagination={true}
            renderPagination={renderPagination}
            onIndexChanged={(index) => setCurrentPage(index)}
            ref={popularGroupsRef}>
            {recommendedGroups.map((item, index) => (
              <View key={index}>
                <RecommendedGroup
                  title={item.title}
                  date={item.date}
                  location={item.location}
                  languages={item.languages}
                />
              </View>
            ))}
          </Swiper>
          <View style={[styles.paginationInfo, { marginBottom: 40 }]}>
            <Text style={styles.paginationText}>
              Page {currentPage + 1} of {recommendedGroups.length}
            </Text>
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
  wrapper2: {
    height: 180,
    marginBottom: -20,
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
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 15,
  },
  imageContainer: {
    position: 'relative',
  },
  PHeartContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  RHeartContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default Home;
