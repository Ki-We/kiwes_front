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
} from 'react-native';
import Swiper from 'react-native-swiper';
import LangClubDetail from '../components/post/LangClubDetail';
import Icon from 'react-native-vector-icons/Ionicons';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import {apiServer} from '../utils/metaData';
import ClubListDetail from '../components/club/ClubListDetail';
import { langList } from '../utils/utils';
import { Dimensions } from 'react-native';

const categoriesImg = require('../../assets/images/category01.png');
const bannerUrl = `${apiServer}/api/v1/banner`;
const popularUrl = `${apiServer}/api/v1/club/popular`;
const url = `${apiServer}/api/v1/club/info/detail/1`;

export function Home({navigation}: any) {
  const bannerRef = useRef(null);
  const popularGroupsRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState();

  const [popularClubLikes, setPopularClubLikes] = useState({});
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
    } catch (error) {
      console.error('Error fetching popular clubs:', error);
    }
  };

  useEffect(() => {
    fetchPopularClubs();
  }, []);

  const [banners, setBanners] = useState<Banner[]>([]);

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
  const handleBannerPress = (id, imageUrl) => {
    navigation.navigate('Event', {eventId: id, imageUrl: imageUrl});
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

  const togglePopularClubLike = (clubId: number) => {
    setPopularClubLikes(prevLikes => ({
      ...prevLikes,
      [clubId]: !prevLikes[clubId],
    }));
  };

  const navigateToClubDetail = (clubId): any => {
    navigation.navigate('ClubDetail', {selectedCategory: clubId});
  };

  const renderLanguages = (languages) => {
    return (
      <View style={styles.overlayContainer}>
        {languages.map((language, index) => {
          const languageUtil = langList.find(item => item.key === language);
          return (
            <Text key={index} style={styles.overlayText}>
              {languageUtil ? languageUtil.text : 'Unknown'}
            </Text>
          );
        })}
      </View>
    );
  };

  renderClubLanguages = (languages) => {
    return (
      <View style={styles.infoContainer}>
        {languages.map((language, index) => {
          const languageUtil = langList.find(item => item.key === language);
          return (
            <Text key={index} style={styles.groupDetail}>
              {languageUtil ? languageUtil.text : 'Unknown'}
            </Text>
          );
        })}
      </View>
    );
  };

  const convertDate = (dateString: string): string => {
    const dateParts = dateString.split('-');
    const year = dateParts[0].substring(2);
    const month = dateParts[1];
    const day = dateParts[2];
    return `${year}.${month}.${day}`;
  };

  const RecommendedGroup = ({
    title,
    date,
    locationKeyword,
    languages,
    clubId,
    navigation,
    image,
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
                source={image}
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
                <Text style={styles.groupDetail}>{locationKeyword}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Icon
                  name="globe"
                  size={14}
                  color={'rgba(0, 0, 0, 0.7)'}
                  style={styles.icon}
                />
              <Text>{languages}</Text>
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
            {banners.map((banner, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleBannerPress(banner.id, banner.imageUrl)}>
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
          onIndexChanged={(index: number) => setCurrentPage(index)}
          ref={popularGroupsRef}>
          {popularClubs.map((club: any, index: number) => (
            <TouchableOpacity key={index} onPress={() => navigateToClubDetail(club.clubId)}>
              <View style={styles.popularGroupSlide}>
                <View style={styles.imageContainer}>
                <Image
                source={{ uri: club.thumbnailImage }}
                style={styles.popularGroupsImage}
                resizeMode="cover"
              />
              <Image source={require('../../assets/images/basicProfileImage.png')} style={styles.titleImage} />
                  <View style={styles.overlayContainer}>
                  <Text style={styles.overlayText1}>{club.title}</Text>
                    <View style={styles.overlayTextContainer}>
                      <Text style={styles.overlayText}>{convertDate(club.date)}</Text>
                      <View style={styles.overlayTextContainer2}>
                        <Text style={styles.overlayText2}>{club.locationKeyword}</Text>
                      </View>
                      <Text>{renderLanguages(club.languages)}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.PHeartContainer}
                    onPress={() => togglePopularClubLike(club.clubId)}>
                    <Icon
                      name={popularClubLikes[club.clubId] ? 'heart' : 'heart-outline'}
                      size={24}
                      color={popularClubLikes[club.clubId] ? 'green' : '#58C047'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
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
            {popularClubs.map((club: any, index: number) => (
              <View key={index}>
                <RecommendedGroup
                  image={{ uri: club.thumbnailImage }}
                  title={club.title}
                  date={convertDate(club.date)}
                  locationKeyword={club.locationKeyword}
                  languages={renderClubLanguages(club.languages)}
                  clubId={club.clubId}
                  navigation={navigation}
                />
              </View>
            ))}
          </Swiper>
          <View style={[styles.paginationInfo, {marginBottom: 40}]}>
            <Text style={styles.paginationText}>
              Page {currentPage + 1} of {RecommendedGroup.length}
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
    top: 5,
  },
  PHeartContainer: {
    position: 'absolute',
    top: 15,
    right: 10,
  },
  RHeartContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  titleImage: {
    width: 50,
    height: 50,
    top: -340,
    left: 10,
  },
  overlayTextContainer2: {
    marginVertical: 5,
  },
  overlayContainer: {
    position: 'absolute',
    top: 180,
    left: -260,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  overlayText: {
    width: 65,
    textAlign: 'center',
    color: '#303030',
    fontSize: 13,
    borderRadius: 30,
    backgroundColor: '#B4DD6D',
  },
  overlayText2: {
    width: 65,
    textAlign: 'center',
    color: '#303030',
    fontSize: 13,
    borderRadius: 30,
    backgroundColor: '#FFFFD8',
  },
  overlayText1: {
    width: 300,
    top: -220,
    left: 170,
    textAlign: 'left',
    color: 'white',
    fontSize: 16,
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
