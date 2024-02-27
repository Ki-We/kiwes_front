import React, {useState, useEffect} from 'react';
import Text from '@components/atoms/Text';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import {apiServer} from '../utils/metaData';
import {useClipboard} from '@react-native-clipboard/clipboard';
import {LANGUAGE, categoryIcon, categoryList, langList} from '../utils/utils';
import {height, width} from '../global';
import ClubDetailSettingModal from '../components/clubdetail/ClubDetailSettingModal';
import {renderLocationDetail} from '../components/clubdetail/renderLocationDetail';
import {RootState} from '@/slice/RootReducer';
import {useSelector} from 'react-redux';

const ClubDetail = ({route, navigation, type}: any) => {
  const language = useSelector((state: RootState) => state.language);
  const {clubId} = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [isJoined, setIsJoined] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShareVisible, setisShareVisible] = useState(false);

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isMoreModalVisible, setIsMoreModalVisible] = useState(false);
  const [isJoinBtnVisible, setJoinBtnVisible] = useState(false);

  const [currentParticipants, setCurrentParticipants] = useState(0);
  const [maxParticipants, setMaxParticipants] = useState(5);

  const [recruitmentComplete, setRecruitmentComplete] = useState(false);

  const [clubInfo, setClubInfo] = useState(null);
  const [NickName, setNickNameInfo] = useState(null);
  const [setString, setClipboardString] = useClipboard();

  const image = {
    share: require('../../assets/images/share.png'),
    more: require('../../assets/images/more.png'),
    korean: require('../../assets/images/korean.png'),
    foreigner: require('../../assets/images/foreigner.png'),
  };

  const copyToClipboard = () => {
    const clubURL = 'https://kiwes.com/club';
    setClipboardString(clubURL);
    setisShareVisible(true);

    setTimeout(() => {
      setisShareVisible(false);
    }, 2000);
  };

  const closeModal = () => {
    setisShareVisible(false);
  };

  const fetchClubDetail = async clubId => {
    try {
      const response = await new RESTAPIBuilder(
        `${apiServer}/api/v1/club/info/detail/${clubId}`,
        'GET',
      )
        .setNeedToken(true)
        .build()
        .run();
      console.log(response.data);
      setClubInfo(response.data);
      setLikeCount(response.data.baseInfo.heartCount);
      setIsLiked(response.data.isHeart);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching club detail:', error);
    }
  };

  useEffect(() => {
    console.log('clubId useEffect');
    fetchClubDetail(clubId);
  }, [clubId]);

  useEffect(() => {
    console.log('nickname, clubinfo useeffect');
    if (
      NickName &&
      clubInfo &&
      NickName.nickName === clubInfo.memberInfo.hostNickname
    ) {
      setIsAdminMode(true);
    } else {
      setIsAdminMode(false);
    }
  }, [NickName, clubInfo]);

  const fetchNickName = async () => {
    try {
      const response = await new RESTAPIBuilder(`${apiServer}/mynick`, 'GET')
        .setNeedToken(true)
        .build()
        .run();
      setNickNameInfo(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error 닉네임:', error);
    }
  };

  useEffect(() => {
    fetchNickName(NickName);
  }, []);

  const isApproval = () => {
    if (!clubInfo) {
      return null;
    }
    const approvalStatus = clubInfo.isApproval;
    console.log('approvalStatus:', approvalStatus);
    return approvalStatus;
  };

  const isRecruitmentComplete = () => {
    if (!clubInfo) {
      return false;
    }
    const {memberInfo, baseInfo} = clubInfo;
    const totalParticipants =
      memberInfo.koreanCount + memberInfo.foreignerCount;
    const maxParticipants = memberInfo.maxPeople;
    const isDeadlinePassed = checkRecruitmentDate(baseInfo.dateInfo);

    return totalParticipants >= maxParticipants || isDeadlinePassed;
  };

  const toggleJoin = async () => {
    fetchClubDetail(clubId);
    try {
      if (clubInfo.isApproval) {
        const response = await new RESTAPIBuilder(
          `${apiServer}/api/v1/club/application/${clubId}`,
          'DELETE',
        )
          .setNeedToken(true)
          .build()
          .run();
        setIsJoined(false);
        setCurrentParticipants(prevCount => prevCount - 1);
      } else {
        const response = await new RESTAPIBuilder(
          `${apiServer}/api/v1/club/application/${clubId}`,
          'POST',
        )
          .setNeedToken(true)
          .build()
          .run();
        isApproval();
        setIsJoined(true);
        setCurrentParticipants(prevCount => prevCount + 1);
      }
      fetchClubDetail(clubId);
    } catch (error) {
      console.error('Error while joining club:', error);
    }
  };
  useEffect(() => {
    if (isJoined) {
      setIsModalVisible(true);
      setTimeout(() => {
        setIsModalVisible(false);
      }, 1500);
    }
  }, [isJoined]);

  const toggleMoreModal = () => {
    setIsMoreModalVisible(prev => !prev);
  };

  const DeleteClub = async () => {
    try {
      await new RESTAPIBuilder(
        `${apiServer}/api/v1/club/article/${clubId}`,
        'DELETE',
      )
        .setNeedToken(true)
        .build()
        .run();
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error 닉네임:', error);
    }
  };

  const navigateToCorrection = () => {
    navigation.navigate('CorrectionPage', {baseInfo: clubInfo.baseInfo});
  };
  const navigateToReviewPage = () => {
    navigation.navigate('ReviewPage', {clubId: clubId});
  };
  const navigateToQnAPage = () => {
    navigation.navigate('QnAPage', {clubId: clubId});
  };
  const navigateToProfile = (memberId: any) => {
    console.log(memberId);
    if (memberId !== 0) {
      navigation.navigate('OtherUserPage', {memberId: memberId});
    }
  };
  const toggleLike = async () => {
    try {
      setIsLiked(prev => !prev);
      setLikeCount(prevCount => (isLiked ? prevCount - 1 : prevCount + 1));
      const apiUrl = `${apiServer}/api/v1/heart/${clubId}`;
      await new RESTAPIBuilder(apiUrl, !isLiked ? 'PUT' : 'DELETE')
        .setNeedToken(true)
        .build()
        .run();
    } catch (err) {
      console.error(err);
    }
  };
  const renderClubDetail = () => {
    if (!clubInfo) {
      return null;
    }
    const baseInfo = clubInfo.baseInfo;
    return (
      <View>
        <Text style={styles.titleText}>{baseInfo.title}</Text>
        <View style={styles.content}>
          <TouchableOpacity onPress={toggleLike}>
            <Icon
              name={isLiked ? 'heart' : 'heart-outline'}
              size={25}
              color="#58C047"
              style={styles.heartIcon}
            />
          </TouchableOpacity>
          <Text style={styles.likeCount}>{likeCount}</Text>
        </View>
        {renderBtn(baseInfo.tags)}
        <View style={styles.sectionContainer}>
          {renderSection('모임 날짜', baseInfo.date)}
          {renderSection('모집 마감', baseInfo.dueTo)}
          {renderSection('인당 예상비용', `₩${baseInfo.cost.toLocaleString()}`)}
          {renderSection('성별', baseInfo.gender)}
        </View>
        <View style={styles.sectionLocationContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>장소</Text>
            <View
              style={[
                styles.roundedBox,
                {
                  width:
                    baseInfo.locationKeyword.length >= 6
                      ? width * 250
                      : width * 70,
                },
              ]}>
              <Text style={styles.sectionText}>{baseInfo.locationKeyword}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderClubContent = () => {
    if (!clubInfo) {
      return null;
    }
    const baseInfo = clubInfo.baseInfo;
    return (
      <>
        <Text style={styles.clubInfoText}>{baseInfo.content}</Text>
      </>
    );
  };

  const renderHostDetail = () => {
    if (!clubInfo) {
      return null;
    }
    const memberInfo = clubInfo.memberInfo;

    return (
      <View style={styles.hostContainer}>
        <View style={styles.profileContainer}>
          <View>
            <Text style={styles.hostTitle}>호스트 정보</Text>
            <View style={styles.profileDefault}>
              <TouchableOpacity
                onPress={() => {
                  navigateToProfile(clubInfo.memberInfo.hostId);
                }}>
                <Image
                  source={{uri: clubInfo.memberInfo.hostThumbnailImage}}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
              <Text style={styles.profileText}>{memberInfo.hostNickname}</Text>
            </View>
          </View>

          <View style={styles.participantContainer}>
            <Text style={styles.hostText}>참가 인원</Text>
            <View style={styles.participantItem}>
              <Image source={image.korean} style={styles.imageMargin} />
              <Text style={styles.participantText}>
                {memberInfo.koreanCount}{' '}
              </Text>
              <Image source={image.foreigner} />
              <Text style={styles.participantText1}>
                {memberInfo.foreignerCount}
              </Text>
            </View>
            <View style={styles.limitItem}>
              <Text style={styles.hostText}>모집 인원</Text>
              <Text style={styles.participantText2}>
                {memberInfo.maxPeople > 100 ? '99+' : memberInfo.maxPeople}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const checkRecruitmentDate = dateInfo => {
    const currentDate = new Date();
    const dueToDate = new Date(dateInfo[1]);
    return currentDate > dueToDate;
  };

  useEffect(() => {
    console.log('clubinfo useeffect');
    if (clubInfo) {
      checkRecruitmentDate(clubInfo.baseInfo.dateInfo);
    }
  }, [clubInfo]);

  const renderJoinButton = () => {
    if (!clubInfo) {
      return null;
    }

    const approvalStatus = isApproval();
    let buttonStyle, buttonText, onPressFunction;

    if (isAdminMode) {
      return null;
    }
    if (approvalStatus == true) {
      buttonStyle = styles.cancelButton;
      buttonText = '참여 취소';
      onPressFunction = toggleJoin;
    } else {
      if (isRecruitmentComplete()) {
        buttonStyle = styles.cancelButton;
        buttonText = '모집 마감';
        onPressFunction = null;
      } else {
        buttonStyle = styles.joinButton;
        buttonText = '참여하기';
        onPressFunction = toggleJoin;
      }
    }

    return (
      <TouchableOpacity style={buttonStyle} onPress={onPressFunction}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };

  const renderSection = (title, text) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.roundedBox}>
        <Text style={styles.sectionText}>{text}</Text>
      </View>
    </View>
  );

  const renderTag = (key: string, type: string, index: number) => {
    let text = 'UNDEFINED';
    if (type == 'category') {
      const category = categoryList.find(c => c.key === key);
      text = category ? category.simple : 'UNDEFINED';
    } else {
      const lang = langList.find(c => c.key === key);
      text = lang ? lang.text : 'UNDEFINED';
    }

    return (
      <View key={`${type}-${index}`} style={styles.tag2}>
        {type == 'category' && (
          <Image
            resizeMode="contain"
            source={categoryIcon[key]}
            style={styles.image}
          />
        )}
        <Text style={styles.tagText}>{text}</Text>
      </View>
    );
  };

  const renderBtn = (tags: string[]) => {
    return (
      <View style={styles.tagContainer2}>
        {tags.map((tag, index) => {
          return renderTag(tag, index === 0 ? 'category' : 'lang', index);
        })}
      </View>
    );
  };

  const renderQaItem = () => {
    if (!clubInfo || !clubInfo.qnas) {
      return null;
    }
    return (
      <View>
        {clubInfo.qnas.map((qna, index1) => (
          <View key={index1} style={styles.qaItem}>
            <TouchableOpacity
              onPress={() => navigateToProfile(qna.questionerId)}>
              <Image
                source={{uri: qna.questionerImageUrl}}
                key={qna.questionerImageUrl}
                style={styles.qaProfileImage}
              />
            </TouchableOpacity>
            <View style={styles.qaContent}>
              <Text style={styles.qaNickname} key={qna.questionerNickname}>
                {qna.questionerNickname}
              </Text>
              <Text style={styles.qaText} key={qna.questionContent}>
                {qna.questionContent}
              </Text>
              <Text style={styles.qaDateTime} key={qna.questionDate}>
                {qna.questionDate}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderReviewItem = () => {
    if (!clubInfo || !clubInfo.reviews) {
      return null;
    }
    return (
      <View>
        {clubInfo.reviews.map((review, index) => (
          <View key={index} style={styles.qaItem}>
            <TouchableOpacity
              onPress={() => navigateToProfile(review.reviewerId)}
              key={review.reviewerId}>
              <Image
                source={{uri: review.reviewerImageUrl}}
                key={review.reviewerImageUrl}
                style={styles.qaProfileImage}
              />
            </TouchableOpacity>
            <View style={styles.qaContent}>
              <Text style={styles.qaNickname} key={review.reviewerNickname}>
                {review.reviewerNickname}
              </Text>
              <Text style={styles.qaText} key={review.reviewContent}>
                {review.reviewContent}
              </Text>
              <Text style={styles.qaDateTime} key={review.reviewDate}>
                {review.reviewDate}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={height * 30} color="#303030" />
        </TouchableOpacity>
        <View style={styles.headerPart}>
          {/* <TouchableOpacity
            onPress={() => {
              copyToClipboard();
            }}
            style={styles.iconContainer}>
            <Image source={image.share} />
          </TouchableOpacity> */}
          {isAdminMode && (
            <TouchableOpacity
              onPress={() => setIsMoreModalVisible(true)}
              style={styles.iconContainer}>
              <Image source={image.more} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ClubDetailSettingModal
        isVisible={isMoreModalVisible}
        onClose={toggleMoreModal}
        navigateToCorrection={navigateToCorrection}
        DeleteClub={DeleteClub}
      />
      <View>
        {clubInfo && (
          <Image
            source={{uri: clubInfo.baseInfo.thumbnailImageUrl}}
            style={styles.clubImage}
          />
        )}
      </View>

      <View style={styles.sectionContainer}>{renderClubDetail()}</View>
      {renderHostDetail()}
      <View style={styles.clubInfoContainer}>
        <Text style={styles.clubInfoTitle}>모임 소개</Text>
        {renderClubContent()}
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.clubInfoTitle}>장소</Text>
        {clubInfo && renderLocationDetail(clubInfo.baseInfo)}
      </View>
      <View style={styles.qnaContainer}>
        <Text style={styles.clubInfoTitle}>Q&A</Text>
        {renderQaItem()}
        <TouchableOpacity onPress={navigateToQnAPage}>
          <Text style={styles.seeAllButton}>
            {language.language == LANGUAGE.KO
              ? 'Q&A 모두 보기'
              : 'View all Q&A'}{' '}
            &gt;
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.reviewContainer}>
        <Text style={styles.clubInfoTitle}>후기</Text>
        {renderReviewItem()}
        <TouchableOpacity onPress={navigateToReviewPage}>
          <Text style={styles.seeAllButton}>
            {language.language == LANGUAGE.KO
              ? '후기 모두 보기'
              : 'View all Reviews'}{' '}
            &gt;
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.joinContainer}>{renderJoinButton()}</View>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {language.language == LANGUAGE.KO ? (
                <>
                  <Text style={styles.greenBtn}>참여 신청</Text>
                  <Text>이 완료되었습니다!</Text>
                </>
              ) : (
                <>
                  <Text style={styles.greenBtn}>Your Request{'\n'}</Text>
                  <Text>has been completed.</Text>
                </>
              )}
            </Text>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={isShareVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              <Text style={styles.shareBold}>클립보드 저장 완료!</Text>
            </Text>
            <Text style={styles.modalText}>
              <Text style={styles.shareText}>
                친구들과 함께 모임을 즐겨보세요!
              </Text>
            </Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  clubImage: {
    width: '100%',
    height: height * 170,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: height * 10,
    justifyContent: 'space-between',
  },
  headerPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    paddingLeft: width * 15,
    paddingHorizontal: width * 5,
  },
  content: {
    paddingHorizontal: width * 15,
    paddingBottom: height * 10,
  },
  titleText: {
    fontSize: height * 20,
    fontWeight: '600',
    color: '#303030',
    padding: height * 8,
  },

  sectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: height * 8,
    paddingHorizontal: height * 8,
  },
  sectionLocationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: height * 8,
    paddingHorizontal: height * 8,
  },
  section: {
    width: '47%',
    alignItems: 'flex-start',
    marginBottom: height * 5,
  },
  roundedBox: {
    backgroundColor: '#F0F0F0',
    width: width * 70,
    height: height * 30,
    alignItems: 'center',
    borderRadius: 20,
    marginTop: height * -25,
    flexWrap: 'nowrap',
    marginLeft: width * 90,
  },
  sectionTitle: {
    color: '#303030',
    fontSize: height * 12,
    fontWeight: '600',
    marginTop: height * 10,
  },
  sectionText: {
    fontSize: height * 11,
    fontWeight: 400,
    color: '#303030',
    marginTop: height * 7,
  },
  likeCount: {
    fontSize: height * 15,
    fontWeight: '600',
    marginLeft: width * 30,
    marginTop: height * -24,
    color: '#303030',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 40,
  },

  // 여기부터
  hostContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    padding: height * 13,
  },
  hostTitle: {
    color: '#303030',
    fontSize: height * 12,
    fontWeight: '600',
  },
  profileDefault: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 10,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: width * 50,
    height: height * 50,
    borderRadius: 50,
  },
  profileText: {
    marginLeft: width * 5,
    fontSize: height * 14,
    color: '#303030',
    fontWeight: '500',
    width: width * 120,
  },
  participantContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: width * 5,
  },
  participantText: {
    fontSize: height * 16,
    color: '#808080',
    fontWeight: '600',
  },
  participantText1: {
    fontSize: height * 16,
    color: '#808080',
    fontWeight: '600',
  },
  participantText2: {
    fontSize: height * 16,
    color: '#808080',
    alignItems: 'flex-end',
    fontWeight: '600',
    textAlign: 'right',
  },
  hostText: {
    color: '#303030',
    fontSize: height * 12,
    fontWeight: '600',
    marginBottom: height * 3,
  },
  limitItem: {
    color: '#303030',
    marginTop: height * 15,
  },
  // 여기까지
  clubInfoContainer: {
    padding: height * 13,
  },
  clubInfoTitle: {
    color: '#303030',
    fontSize: height * 12,
    fontWeight: '600',
    marginBottom: height * 10,
  },
  clubInfoText: {
    color: '#303030',
    fontSize: height * 13,
    fontWeight: '500',
    backgroundColor: '#F8F8F8',
    borderRadius: 30,
    padding: height * 13,
  },
  locationContainer: {
    paddingTop: height * 18,
    padding: height * 7,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    marginTop: 15,
    padding: height * 13,
  },
  clubLocationText: {
    color: '#303030',
    fontSize: height * 16,
    fontWeight: 'bold',
    width: width * 326,
    marginBottom: height * 20,
    marginLeft: width * 28,
  },
  locationImage: {
    marginLeft: width * 30,
    marginBottom: height * 20,
  },
  qnaContainer: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    padding: height * 13,
  },
  qaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 10,
  },
  qaProfileImage: {
    width: width * 40,
    height: height * 40,
    borderRadius: 20,
    marginRight: width * 10,
    marginTop: height * -15,
  },
  qaContent: {
    flex: 1,
  },
  qaText: {
    fontSize: height * 13,
    color: '#303030',
    marginBottom: 5,
  },
  qaDateTime: {
    fontSize: height * 10,
    fontWeight: '400',
    color: '#888888',
  },
  qaNickname: {
    fontSize: height * 14,
    color: '#303030',
    fontWeight: '500',
    marginBottom: height * 3,
  },
  seeAllButton: {
    fontSize: height * 12,
    fontWeight: '600',
    color: '#303030',
    marginBottom: height * 15,
  },
  reviewContainer: {
    padding: height * 13,
  },
  joinButton: {
    width: width * 110,
    height: height * 50,
    backgroundColor: '#58C047',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 10,
  },
  cancelButton: {
    width: width * 110,
    height: height * 50,
    backgroundColor: '#AFAFAF',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 10,
  },
  buttonText: {
    color: 'white',
    fontSize: height * 20,
    fontWeight: '600',
  },
  joinContainer: {
    alignItems: 'center',
    marginBottom: height * 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: width * 300,
    padding: height * 40,
    alignItems: 'center',
  },
  modalText: {
    fontSize: height * 16,
    fontWeight: 'bold',
    color: '#303030',
    textAlign: 'center',
  },
  greenBtn: {
    fontSize: height * 16,
    fontWeight: 'bold',
    color: '#58C047',
  },
  shareBold: {
    fontSize: height * 16,
    fontWeight: 'bold',
    color: '#58C047',
  },
  shareText: {
    fontSize: height * 14,
    color: '#303030',
  },
  moreModalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: width * 100,
    padding: height * 10,
    alignItems: 'center',
    marginTop: height * -530,
    marginLeft: 'auto',
    marginRight: 10,
  },
  tagWrapper: {
    marginRight: width * 5,
  },
  tagContainer2: {
    marginLeft: width * 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag2: {
    flexDirection: 'row',
    height: height * 35,
    borderColor: '#9BD23C',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 20,
    paddingHorizontal: width * 8,
    marginRight: width * 10,
  },
  tagText: {
    color: '#303030',
    paddingHorizontal: width * 10,
    paddingVertical: height * 5,
  },
  locationTitleText: {
    fontSize: height * 16,
    fontWeight: 'bold',
    color: '#303030',
  },
  locationText: {
    fontSize: height * 13,
    fontWeight: '500',
    color: '#8A8A8A',
  },
  mapContainer: {
    marginTop: height * 10,
    borderWidth: 4,
    borderColor: '#9BD23C',
    borderRadius: 30,
    overflow: 'hidden',
  },
  image: {
    marginRight: width * 3,
    width: width * 16,
    height: width * 16,
  },
  imageMargin: {
    marginRight: 1,
  },
});

export default ClubDetail;
