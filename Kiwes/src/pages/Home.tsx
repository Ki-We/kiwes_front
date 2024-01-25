import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';

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
import LangClubDetail from '../components/post/LangClubDetail';
import Icon from 'react-native-vector-icons/Ionicons';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import {apiServer} from '../utils/metaData';
import ClubListDetail from '../components/club/ClubListDetail';

const categoriesImg = require('../../assets/images/category01.png');
const noticeBannerImg = require('../../assets/images/nbanner.png');
const bannerUrl = `${apiServer}/api/v1/banner`;
const popularUrl = `${apiServer}/api/v1/club/popular`;
const url = `${apiServer}/api/v1/club/info/detail/1`;

export function Home({navigation}: any) {
  const bannerRef = useRef(null);
  const popularGroupsRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  interface Banner {
    type: string;
    imageUrl: string;
    url: string;
    id: number;
  }
  const [popularClubs, setPopularClubs] = useState([]);

  const fetchPopularClubs = async () => {
    try {
      const response = await new RESTAPIBuilder(
        `${apiServer}/api/v1/club/popular`,
        'GET',
      )
        .setNeedToken(true)
        .build()
        .run();
      setPopularClubs(response.data);
      console.log('popular API Response:', response.data);
      // if (response.status === 200) {
      //   setPopularClubs(response.data);
      // } else {
      //   console.error('Failed to fetch popular clubs:', response);
      // }
    } catch (error) {
      console.error('Error fetching popular clubs:', error);
    }
  };

  useEffect(() => {
    fetchPopularClubs();
  }, []);

  const [banners, setBanners] = useState<Banner[]>([]);

  // const handleCategoryPress = (category: string) => {
  //   const updatedCategories = selectedCategories.includes(category)
  //     ? selectedCategories.filter(item => item !== category)
  //     : [...selectedCategories, category];

  //   setSelectedCategories(updatedCategories);

  //   const postData = {
  //     sortedBy: updatedCategories,
  //   };

  //   const categoryUrl = `${apiServer}/api/v1/club/category`;

  //   new RESTAPIBuilder(categoryUrl, 'POST')
  //     .setNeedToken(true)
  //     .setBody({clubSortRequestDto: postData})
  //     .build()
  //     .run()
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  const fetchData = async (num: number) => {
    try {
      const response = await new RESTAPIBuilder(url, 'GET')
        .setNeedToken(true)
        .build()
        .run();
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const fetchBanners = async () => {
    try {
      const response = await new RESTAPIBuilder(bannerUrl, 'GET')
        .setNeedToken(true)
        .build()
        .run();
      console.log('Banner API Response:', response.data);
      setBanners(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchBanners();
  }, []);
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchAndSetData = async () => {
    try {
      const newData = await fetchData();
      console.log(newData);
      if (newData && newData.baseInfo) {
        setData(newData);
        console.log(newData.baseInfo);
        console.log(newData.baseInfo.title);
      } else {
        console.error('Data or baseInfo is undefined in the response.');
      }
    } catch (err) {
      console.log(err);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchAndSetData();
      return () => {};
    }, []),
  );
  const handleBannerPress = id => {
    navigation.navigate('Event', {eventId: id});
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userData');
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const [popularGroupImages, setPopularGroupImages] = useState([
    {image: categoriesImg, isLiked: false},
    {image: categoriesImg, isLiked: false},
    {image: categoriesImg, isLiked: false},
    {image: categoriesImg, isLiked: false},
    {image: categoriesImg, isLiked: false},
  ]);

  const togglePopularGroupLike = (index: number) => {
    const updatedPopularGroupImages = [...popularGroupImages];
    updatedPopularGroupImages[index].isLiked =
      !updatedPopularGroupImages[index].isLiked;
    setPopularGroupImages(updatedPopularGroupImages);
  };

  const navigateToClubDetail = (clubId): any => {
    navigation.navigate('ClubDetail', {selectedCategory: clubId});
  };

  const RecommendedGroup = ({
    title,
    date,
    location,
    languages,
    clubId,
    navigation,
  }: any) => {
    const [isLiked, setIsLiked] = useState(false);
    const toggleLike = () => {
      setIsLiked(prev => !prev);
    };
    return (
      <TouchableOpacity onPress={() => navigateToClubDetail(clubId)}>
        <View style={styles.recommendedGroupsContainer}>
          <View style={styles.roundedRectangle}>
            <View style={styles.groupContent}>
              <Image
                source={require('../../assets/images/jejuImg.png')}
                style={styles.groupImage}
              />
              <View style={styles.textContent}>
                <View style={styles.infoContainer}>
                  <Text style={styles.groupTitle}>{title}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Icon
                    name="calendar-outline"
                    size={14}
                    color={'rgba(0, 0, 0, 0.7)'}
                    style={styles.icon}
                  />
                  <Text style={styles.groupDetail}>{date}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Icon
                    name="location-outline"
                    size={14}
                    color={'rgba(0, 0, 0, 0.7)'}
                    style={styles.icon}
                  />
                  <Text style={styles.groupDetail}>{location}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Icon
                    name="globe"
                    size={14}
                    color={'rgba(0, 0, 0, 0.7)'}
                    style={styles.icon}
                  />
                  <Text style={styles.groupDetail}>{languages.join(', ')}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.RHeartContainer}
                onPress={toggleLike}>
                <Icon
                  name={isLiked ? 'heart' : 'heart-outline'}
                  size={24}
                  color={isLiked ? 'green' : '#58C047'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const recommendedGroups = [
    {
      key: '1',
      title: '제주도 여행 같이 가요~!',
      date: '23.03.03',
      location: '제주도',
      languages: ['English', '한국어'],
    },
    {
      key: '2',
      title: '강원도 여행 같이 가요~!',
      date: '23.03.03',
      location: '제주도',
      languages: ['English', '한국어'],
    },
    {
      key: '3',
      title: '부산 여행 같이 가요~!',
      date: '23.03.03',
      location: '제주도',
      languages: ['English', '한국어'],
    },
    {
      key: '4',
      title: '서울 여행 같이 가요~!',
      date: '23.03.03',
      location: '제주도',
      languages: ['English', '한국어'],
    },
    {
      key: '5',
      title: '여수 여행 같이 가요~!',
      date: '23.03.03',
      location: '제주도',
      languages: ['English', '한국어'],
    },
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
  const renderPopularGroupItem = (imageSource: any, clubId: number) => (
    <TouchableOpacity onPress={() => navigateToClubDetail(clubId)}>
      <View key={index} style={styles.popularGroupSlide}>
        <View style={styles.imageContainer}>
          <Image source={imageSource.image} style={styles.popularGroupsImage} />
          <View style={styles.overlayContainer}>
            <Text style={styles.overlayText1}>
              저랑 K팝 얘기 할 친구 찾아요
            </Text>
            <View style={styles.overlayTextContainer}>
              <Text style={styles.overlayText}>23.03.12</Text>
              <View style={styles.overlayTextContainer2}>
                <Text style={styles.overlayText2}>Sinchon</Text>
              </View>
              <Text style={styles.overlayText}>English</Text>
            </View>
          </View>
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
    </TouchableOpacity>
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
            {banners.map((banner, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleBannerPress(banner.id)}>
                <View>
                  <Image
                    source={{uri: banner.url}}
                    style={styles.bannerImage}
                  />
                </View>
              </TouchableOpacity>
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
          onIndexChanged={index => setCurrentPage(index)}
          ref={popularGroupsRef}>
          {popularClubs.map((club, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() => navigateToClubDetail(club.clubId)}>
                <View style={styles.popularGroupSlide}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{uri: club.thumbnailImage}}
                      style={styles.popularGroupsImage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </Swiper>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>카테고리별 모임</Text>
          <View style={styles.sectionContent}>
            <ClubListDetail type="category" navigation={navigation} />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>언어별 모임</Text>
          <View style={styles.sectionContent}>
            <ClubListDetail type="language" navigation={navigation} />
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
            onIndexChanged={index => setCurrentPage(index)}
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
          <View style={[styles.paginationInfo, {marginBottom: 40}]}>
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
    marginBottom: -7,
  },
  textContent: {
    marginLeft: 10,
  },
  groupTitle: {
    color: '#303030',
    fontSize: 16,
    right: 10,
    bottom: -25,
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
  overlayTextContainer2: {
    marginVertical: 5,
  },
  overlayContainer: {
    position: 'absolute',
    top: 240,
    left: -260,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  overlayText: {
    width: 70,
    textAlign: 'center',
    color: '#303030',
    fontSize: 14,
    borderRadius: 30,
    backgroundColor: '#B4DD6D',
  },
  overlayText2: {
    width: 70,
    textAlign: 'center',
    color: '#303030',
    fontSize: 14,
    borderRadius: 30,
    backgroundColor: '#FFFFD8',
  },
  overlayText1: {
    width: 300,
    top: -230,
    left: 70,
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
  infoContainer: {
    top: -20,
    left: 20,
  },
  icon: {
    top: 35,
    left: -15,
  },
});

export default Home;
