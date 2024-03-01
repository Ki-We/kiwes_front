import React, {useState, useCallback, useRef, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Text from '@components/atoms/Text';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import {apiServer} from '../utils/metaData';
import {languageMap} from '../utils/languageMap';
import ClubListDetail from '../components/club/ClubListDetail';
import {LANGUAGE, langList} from '../utils/utils';
import {height, width} from '../global';
import {setLanguage} from '@/slice/LanguageSlice';
import {language} from '@/utils/utils';
import {useSelector} from 'react-redux';

const bannerUrl = `${apiServer}/api/v1/banner`;
const url = `${apiServer}/api/v1/club/info/detail/1`;

export function Home({navigation}: any) {
  const language = useSelector((state: RootState) => state.language);
  const bannerRef = useRef(null);
  const popularGroupsRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [popularClubs, setPopularClubs] = useState([]);
  const [data, setData] = useState();
  interface Banner {
    type: string;
    imageUrl: string;
    url: string;
    id: number;
  }

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
      setBanners(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchAndSetData = async () => {
    try {
      const newData = await fetchData();
      if (newData && newData.baseInfo) {
        setData(newData);
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
  const [popularGroupImages, setPopularGroupImages] = useState([
    {image: popularGroupImages, isLiked: false},
    {image: popularGroupImages, isLiked: false},
    {image: popularGroupImages, isLiked: false},
    {image: popularGroupImages, isLiked: false},
    {image: popularGroupImages, isLiked: false},
  ]);
  const togglePopularClubLike = async (clubId: number) => {
    try {
      const updatedPosts = popularClubs.map(post =>
        post.clubId === clubId
          ? {...post, isHeart: post.isHeart === 'YES' ? 'NO' : 'YES'}
          : post,
      );
      const post = popularClubs.find(post => post.clubId === clubId);
      setPopularClubs(updatedPosts);
      const apiUrl = `${apiServer}/api/v1/heart/${clubId}`;
      await new RESTAPIBuilder(
        apiUrl,
        post.isHeart !== 'YES' ? 'PUT' : 'DELETE',
      )
        .setNeedToken(true)
        .build()
        .run();
    } catch (err) {
      console.error(err);
    }
  };

  const navigateToClubDetail = (clubId): any => {
    navigation.navigate('ClubDetail', {clubId: clubId});
  };
  renderClubLanguages = languages => {
    return (
      <View style={styles.infoContainer}>
        {languages.map((language, index) => {
          const languageUtil = langList.find(item => item.key === language);
          return (
            <React.Fragment key={index}>
              <Text style={styles.groupDetail}>
                {languageUtil ? languageUtil.text : 'Unknown'}
                {index < languages.length - 1 && <Text>, </Text>}
              </Text>
            </React.Fragment>
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

  // eslint-disable-next-line react/no-unstable-nested-components
  const RecommendedGroup = ({
    title,
    date,
    locationKeyword,
    languages,
    clubId,
    isHeart,
    image,
  }: any) => {
    const [isLiked, setIsLiked] = useState(isHeart === 'YES' ? true : false);
    const toggleLike = async () => {
      try {
        console.log('prev ' + isHeart);
        const apiUrl = `${apiServer}/api/v1/heart/${clubId}`;
        await new RESTAPIBuilder(apiUrl, !isLiked ? 'PUT' : 'DELETE')
          .setNeedToken(true)
          .build()
          .run();
        setIsLiked(prev => !prev);
        const updatedPosts = popularClubs.map(post =>
          post.clubId === clubId
            ? {...post, isHeart: post.isHeart === 'YES' ? 'NO' : 'YES'}
            : post,
        );
        setPopularClubs(updatedPosts);
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <TouchableOpacity onPress={() => navigateToClubDetail(clubId)}>
        <View style={styles.RecGroupsContainer}>
          <View style={styles.groupContent}>
            <Image source={image} style={styles.groupImage} />
            <View style={styles.textContent}>
              <View style={styles.infoContainer1}>
                <Text style={styles.groupTitle}>{title}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Icon
                  name="calendar-outline"
                  size={height * 14}
                  color={'rgba(0, 0, 0, 0.7)'}
                  style={styles.icon}
                />
                <Text style={styles.groupDetail}>{date}</Text>
              </View>
              <View style={[styles.infoContainer, {marginTop: height * -2}]}>
                <Icon
                  name="location-outline"
                  size={height * 14}
                  color={'rgba(0, 0, 0, 0.7)'}
                  style={styles.icon}
                />
                <Text style={styles.groupDetail}>{locationKeyword}</Text>
              </View>
              <View style={[styles.infoContainer, {marginTop: height * -2}]}>
                <Icon
                  name="globe"
                  size={height * 14}
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
                size={height * 26}
                color={'#58C047'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderPagination = (index: number) => {
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
        <View>
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
        </View>
        <Text style={styles.sectionTitle}>인기 모임</Text>
        <Swiper
          style={styles.wrapper1}
          loop={true}
          autoplay={true}
          autoplayTimeout={5}
          showsPagination={true}
          renderPagination={renderPagination}
          onIndexChanged={(index: number) => setCurrentPage(index)}
          ref={popularGroupsRef}>
          {popularClubs.map((club: any, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigateToClubDetail(club.clubId)}>
              <View style={styles.popularGroupSlide}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{uri: club.thumbnailImage}}
                    style={styles.popularGroupsImage}
                    resizeMode="cover"
                  />
                  <View style={styles.titleContainer}>
                    <Image
                      source={{uri: club.hostProfileImg}}
                      style={styles.titleImage}
                    />
                    <View style={styles.titleTextContainer}>
                      <Text style={styles.titleText}>{club.title}</Text>
                    </View>
                  </View>
                  <View style={styles.overlayAddInfo}>
                    <View
                      style={[styles.overlayCommonItem, styles.overlayItem1]}>
                      <Text style={styles.overlayItemText}>
                        {convertDate(club.date)}
                      </Text>
                    </View>
                    <View
                      style={[styles.overlayCommonItem, styles.overlayItem2]}>
                      <Text style={styles.overlayItemText}>
                        {club.locationKeyword}
                      </Text>
                    </View>
                    <View
                      style={[styles.overlayCommonItem, styles.overlayItem3]}>
                      <Text style={styles.overlayItemText}>
                        {languageMap[club.languages[0]]}
                        {club.languages.length > 1 &&
                          `, ${languageMap[club.languages[1]]}`}
                      </Text>
                    </View>
                    <View style={styles.overlayMaxInfo}>
                      <View
                        style={[
                          styles.overlayCommonItem1,
                          styles.overlayItem4,
                        ]}>
                        <Text style={styles.overlayItemText2}>
                          <Icon name="person-outline" size={height * 12} />{' '}
                          {club.current_max}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.PHeartContainer}
                    onPress={() => togglePopularClubLike(club.clubId)}>
                    <Icon
                      name={club.isHeart === 'YES' ? 'heart' : 'heart-outline'}
                      size={height * 26}
                      color={'#58C047'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </Swiper>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{language.language == LANGUAGE.KO ? '카테고리별 모임' : 'Category Meetups'}</Text>
          <View style={styles.sectionContent}>
            <ClubListDetail type="category" navigation={navigation} />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{language.language == LANGUAGE.KO ? '언어별 모임' : 'Language Meetups'}</Text>
          <View style={styles.sectionContent}>
            <ClubListDetail type="language" navigation={navigation} />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>추천 모임</Text>
          <Swiper
            style={styles.wrapper2}
            loop={false}
            autoplay={false}
            autoplayTimeout={6}
            showsPagination={true}
            renderPagination={renderPagination}
            onIndexChanged={index => setCurrentPage(index)}
            ref={popularGroupsRef}>
            {popularClubs.map((club: any, index: number) => (
              <View
                key={index}
                style={[styles.paginationInfo, {marginBottom: height * 40}]}>
                <RecommendedGroup
                  image={{uri: club.thumbnailImage}}
                  title={club.title}
                  date={convertDate(club.date)}
                  locationKeyword={club.locationKeyword}
                  languages={renderClubLanguages(club.languages)}
                  clubId={club.clubId}
                  index={index}
                  isHeart={club.isHeart}
                  navigation={navigation}
                />
              </View>
            ))}
          </Swiper>
          <View style={[styles.paginationInfo, {marginBottom: height * 60}]} />
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
    height: height * 180,
  },
  wrapper1: {
    height: height * 350,
    alignSelf: 'center',
    marginVertical: height * 10,
  },
  wrapper2: {
    height: height * 170,
    marginBottom: height * -10,
  },
  popularGroupSlide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  sectionContainer: {
    alignItems: 'center',
    marginTop: height * 20,
  },
  sectionContent: {
    width: '100%',
    justifyContent: 'center',
  },
  sectionTitle: {
    marginTop: height * 40,
    left: width * 15,
    fontSize: height * 16,
    color: '#303030',
    fontWeight: '600',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  popularGroupsImage: {
    width: width * 340,
    height: height * 340,
    borderRadius: 25,
    resizeMode: 'contain',
    opacity: 0.65,
  },
  categoryList: {
    marginTop: height * 15,
    width: '100%',
    paddingHorizontal: height * 10,
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
    marginHorizontal: height * 3,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: height * 15,
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
    width: width * 8,
    height: height * 8,
    borderRadius: 4,
    backgroundColor: '#DADADA',
    marginHorizontal: height * 5,
    bottom: height * -35,
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
    width: width * 20,
    height: height * 5,
    backgroundColor: '#DADADA',
    marginHorizontal: height * -1,
    borderRadius: 5,
    top: height * 15,
  },
  paginationRectActive: {
    backgroundColor: '#9BD23C',
  },
  RecGroupsContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width * 340,
    height: height * 130,
    marginTop: height * 20,
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
    borderRadius: 20,
    width: width * 130,
    height: height * 90,
    marginLeft: width * 15,
  },
  textContent: {
    marginLeft: width * 20,
  },
  groupTitle: {
    color: '#303030',
    fontSize: height * 14,
    fontWeight: '500',
    right: width * 10,
    bottom: height * -25,
  },
  groupDetail: {
    color: '#303030',
    fontSize: height * 12,
    fontWeight: '400',
    left: width * 2,
    bottom: height * -11,
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    left: width * 15,
  },
  imageContainer: {
    position: 'relative',
    top: height * 5,
  },
  PHeartContainer: {
    position: 'absolute',
    top: height * 15,
    right: width * 10,
  },
  RHeartContainer: {
    position: 'absolute',
    bottom: height * 1,
    right: width * 10,
  },
  titleContainer: {
    flexDirection: 'row',
    top: height * -325,
    left: width * 10,
    alignContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  titleImage: {
    width: width * 50,
    height: width * 50,
    borderRadius: 50,
  },
  titleTextContainer: {
    flex: 1,
    marginLeft: width * 6,
    justifyContent: 'center',
    paddingBottom: height * 8,
  },
  titleText: {
    textAlign: 'left',
    color: 'white',
    fontSize: height * 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  overlayTextContainer2: {
    marginVertical: height * 5,
  },
  overlayAddInfo: {
    position: 'absolute',
    bottom: height * 70,
    left: width * 15,
  },
  overlayMaxInfo: {
    position: 'absolute',
    flex: 1,
    top: height * 65,
    width: width * 78,
    left: width * 232,
  },
  overlayCommonItem: {
    alignSelf: 'flex-start',
    paddingHorizontal: width * 10,
    paddingVertical: height * 3,
    marginVertical: height * 3,
    borderRadius: 30,
  },
  overlayCommonItem1: {
    paddingVertical: height * 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  overlayItem1: {
    backgroundColor: '#B4DD6D',
  },
  overlayItem2: {
    backgroundColor: '#FFFFD8',
  },
  overlayItem3: {
    backgroundColor: '#B4DD6D',
  },
  overlayItem4: {
    backgroundColor: '#00000080',
  },
  overlayLanguage: {
    flexDirection: 'row',
  },
  overlayItemText: {
    color: '#303030',
    fontSize: height * 12,
    fontWeight: '500',
  },
  overlayItemText2: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: height * 15,
    fontWeight: '600',
    marginVertical: height * 1,
  },
  overlayContainer: {
    position: 'absolute',
    top: height * 180,
    left: width * -260,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 10,
  },
  overlayText2: {
    width: width * 65,
    textAlign: 'center',
    color: '#303030',
    borderRadius: 30,
    backgroundColor: '#FFFFD8',
  },
  infoContainer1: {
    top: height * -26,
    left: width * 10,
  },
  infoContainer: {
    zIndex: 1,
    top: height * -11,
    left: width * 10,
    marginVertical: height * 7,
    flexDirection: 'row',
  },
  icon: {
    top: height * 13,
    left: width * -9,
  },
});

export default Home;
