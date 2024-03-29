import React, {useState, useCallback, useRef, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Text from '@components/atoms/Text';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import {apiServer} from '../utils/metaData';
import {languageMap} from '../utils/languageMap';
import ClubListDetail from '../components/club/ClubListDetail';
import {LANGUAGE, langList} from '../utils/utils';
import {height, width} from '../global';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import {Banner} from '@/utils/commonInterface';
import {RootState} from '@/slice/RootReducer';

const bannerUrl = `${apiServer}/api/v1/banner`;

export function Home({navigation}: any) {
  const language = useSelector((state: RootState) => state.language);
  const {width: screenWidth} = Dimensions.get('window');
  const carouselRef = useRef(null);
  // const bannerRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [RecommandPage, setRecommandPage] = useState(0);
  const [popularClubs, setPopularClubs] = useState([]);
  const [recommendedClubs, setRecommendedClubs] = useState([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isUserDragging, setIsUserDragging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isUserDragging && carouselRef.current) {
        carouselRef.current.snapToNext();
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isUserDragging]);

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

  const fetchRecommendedClubs = async () => {
    try {
      const response = await new RESTAPIBuilder(
        `${apiServer}/api/v1/club/recommand`,
        'GET',
      )
        .setNeedToken(true)
        .build()
        .run();
      setRecommendedClubs(response.data);
    } catch (error) {
      console.error('Error fetching Recommended clubs:', error);
    }
  };
  useEffect(() => {
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
    fetchBanners();
  }, []);

  const handleBannerPress = (id: number, imageUrl: string) => {
    navigation.navigate('Event', {eventId: id, imageUrl: imageUrl});
  };
  const renderBannerItem = ({item, index}: {item: Banner; index: number}) => {
    return (
      <TouchableOpacity
        key={index.toString()}
        onPress={() => {
          if (item.type === 'EVENT') {
            handleBannerPress(item.id, item.imageUrl);
          }
        }}
        disabled={item.type !== 'EVENT'}>
        <Image
          source={{uri: item.url}}
          style={[styles.bannerImage, {width: screenWidth}]}
        />
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      fetchPopularClubs();
      fetchRecommendedClubs();
      return () => {};
    }, []),
  );

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
          <Image source={image} style={styles.groupImage} />
          <View style={{flexDirection: 'column'}}>
            <View style={[styles.textContainer, {width: width * 180}]}>
              <Text style={styles.groupTitle} numberOfLines={1}>
                {title}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <View style={styles.infoRecommandContainer}>
                <Icon
                  name="calendar-outline"
                  size={height * 14}
                  color={'rgba(0, 0, 0, 0.7)'}
                />
                <Text style={styles.groupDetail}>{date}</Text>
              </View>
              <View style={styles.infoRecommandContainer}>
                <Icon
                  name="location-outline"
                  size={height * 14}
                  color={'rgba(0, 0, 0, 0.7)'}
                />
                <Text style={styles.groupDetail} numberOfLines={1}>
                  {locationKeyword}
                </Text>
              </View>
              <View style={styles.infoRecommandContainer}>
                <Icon
                  name="globe"
                  size={height * 14}
                  color={'rgba(0, 0, 0, 0.7)'}
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
          {popularClubs.map((club, i) => (
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

  const renderRecommandPagination = (index: number) => {
    return (
      <View style={styles.paginationRecContainer}>
        <View style={styles.paginationRec}>
          {popularClubs.map((club, i) => (
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

  const renderPopuarItem = ({item, index}) => {
    const club = item;
    return (
      <TouchableOpacity
        style={styles.wrapper1}
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
                <Text style={styles.titleText} numberOfLines={1}>
                  {club.title}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => togglePopularClubLike(club.clubId)}>
                <Icon
                  name={club.isHeart === 'YES' ? 'heart' : 'heart-outline'}
                  size={height * 26}
                  color={'#58C047'}
                  style={styles.popHeart}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.overlayAddInfo}>
              <View style={[styles.overlayCommonItem, styles.overlayItem1]}>
                <Text style={styles.overlayItemText}>
                  {convertDate(club.date)}
                </Text>
              </View>
              <View style={[styles.overlayCommonItem, styles.overlayItem2]}>
                <Text style={styles.overlayItemText}>
                  {club.locationKeyword}
                </Text>
              </View>
              <View style={[styles.overlayCommonItem, styles.overlayItem3]}>
                <Text style={styles.overlayItemText}>
                  {languageMap[club.languages[0]]}
                  {club.languages.length > 1 &&
                    `, ${languageMap[club.languages[1]]}`}
                </Text>
              </View>
            </View>
            <View style={styles.overlayMaxInfo}>
              <View style={[styles.overlayCommonItem1, styles.overlayItem4]}>
                <Text style={styles.overlayItemText2}>
                  <Icon name="person-outline" size={height * 12} />
                  {' ' + club.current_max}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderRecommandItem = ({item, index}) => {
    const club = item;
    return (
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
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Carousel
          loop={true}
          autoplay={true}
          autoplayDelay={3000}
          autoplayInterval={5000}
          enableMomentum={true}
          layout="default"
          data={banners}
          renderItem={renderBannerItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
        />
        <Text style={styles.sectionTitle}>인기 모임</Text>
        <Carousel
          loop={true}
          autoplay={true}
          autoplayDelay={5000}
          autoplayInterval={7000}
          enableMomentum={true}
          layout={'default'}
          data={popularClubs}
          sliderWidth={width * 360}
          itemWidth={width * 360}
          renderItem={renderPopuarItem}
          onSnapToItem={index => {
            setCurrentPage(index);
          }}
          lockScrollWhileSnapping={true}
          // lockScrollTimeoutDuration={100}
        />

        {renderPagination(currentPage)}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {language.language === LANGUAGE.KO
              ? '카테고리별 모임'
              : 'Category Meetups'}
          </Text>
          <View style={styles.sectionContent}>
            <ClubListDetail type="category" navigation={navigation} />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {language.language === LANGUAGE.KO
              ? '언어별 모임'
              : 'Language Meetups'}
          </Text>
          <View style={styles.sectionContent}>
            <ClubListDetail type="language" navigation={navigation} />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>추천 모임</Text>
          <Carousel
            loop={true}
            autoplay={true}
            autoplayDelay={5000}
            autoplayInterval={7000}
            enableMomentum={true}
            layout={'default'}
            data={recommendedClubs}
            sliderWidth={width * 360}
            itemWidth={width * 360}
            renderItem={renderRecommandItem}
            onSnapToItem={index => {
              setRecommandPage(index);
            }}
            lockScrollWhileSnapping={true}
            // lockScrollTimeoutDuration={500}
          />
          {renderRecommandPagination(RecommandPage)}
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
    marginLeft: width * 10,
    height: height * 350,
    alignSelf: 'center',
    marginTop: height * 15,
  },
  popularGroupSlide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: height * 180,
    resizeMode: 'contain',
  },
  sectionContainer: {
    alignItems: 'center',
    marginTop: height * 10,
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
  paginationContainer: {
    bottom: height * 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationRecContainer: {
    bottom: height * 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationRec: {
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
  RecGroupsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width * 350,
    height: height * 130,
    marginTop: height * 20,
    backgroundColor: 'rgba(255, 253, 141, 0.3)',
    borderRadius: 30,
    borderColor: '#DADADA',
    borderWidth: 1,
  },
  groupImage: {
    borderRadius: 20,
    width: width * 130,
    height: height * 90,
    marginLeft: width * 15,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: width * 15,
  },
  groupTitle: {
    color: '#303030',
    fontSize: height * 14,
    fontWeight: '500',
    paddingTop: height * 14,
  },
  groupDetail: {
    color: '#303030',
    fontSize: height * 12,
    fontWeight: '400',
    marginLeft: width * 10,
  },
  imageContainer: {
    position: 'relative',
    top: height * 5,
  },
  RHeartContainer: {
    alignSelf: 'flex-end',
    marginBottom: height * 10,
  },
  titleContainer: {
    flexDirection: 'row',
    top: height * -330,
    width: width * 331,
    paddingHorizontal: width * 5,
    alignContent: 'space-between',
    zIndex: 0,
  },
  titleImage: {
    width: width * 50,
    height: width * 50,
    borderRadius: 50,
  },
  titleTextContainer: {
    flex: 1,
    marginLeft: width * 6,
    justifyContent: 'space-between',
    paddingBottom: height * 8,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: height * 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  popHeart: {
    alignSelf: 'flex-end',
    marginLeft: width * 15,
    marginTop: height * 8,
  },
  overlayAddInfo: {
    position: 'absolute',
    bottom: height * 70,
    left: width * 15,
  },
  overlayMaxInfo: {
    position: 'absolute',
    bottom: height * 70,
    minWidth: width * 78,
    right: width * 15,
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
  infoRecommandContainer: {
    paddingBottom: height * 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default Home;
