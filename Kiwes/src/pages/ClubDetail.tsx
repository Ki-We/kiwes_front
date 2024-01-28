import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import { RESTAPIBuilder } from '../utils/restapiBuilder';
import { apiServer } from '../utils/metaData';
import { Clipboard } from 'react-native';
import { categoryList } from '../utils/utils';
import { langList } from '../utils/utils';
import { GOOGLE_WEB_API_KIEY } from '../utils/googleConfig';

const ClubDetail = ({ route, navigation }) => {
  const { selectedCategory } = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [isJoined, setIsJoined] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isMoreModalVisible, setIsMoreModalVisible] = useState(false);

  const [currentParticipants, setCurrentParticipants] = useState(0);
  const [maxParticipants, setMaxParticipants] = useState(5);

  const [isRecruitmentComplete, setIsRecruitmentComplete] = useState(false);

  const [clubInfo, setClubInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const image = {
    share: require('../../assets/images/share.png'),
    more: require('../../assets/images/more.png'),
    korean: require('../../assets/images/korean.png'),
    foreigner: require('../../assets/images/foreigner.png'),
  };

  const copyToClipboard = () => {
    const clubURL = 'https://kiwes.com/club';
    Clipboard.setString(clubURL);
    alert('친구들과 함께 모임을 즐겨보세요!');
  };

  const fetchClubDetail = async (clubId) => {
    try {
      const response = await new RESTAPIBuilder(`${apiServer}/api/v1/club/info/detail/${clubId}`, 'GET')
        .setNeedToken(true)
        .build()
        .run();
        setClubInfo(response.data);
        console.log("글 상세 API Response:", response.data);
    } catch (error) {
      console.error('Error fetching club detail:', error);
    }
  };
  
  useEffect(() => {
    fetchClubDetail(selectedCategory);
  }, [selectedCategory]);

  const toggleJoin = () => {
    if (currentParticipants < maxParticipants && !isRecruitmentComplete) {
      setIsJoined((prev) => !prev);

      if (!isJoined) {
        setCurrentParticipants((prevCount) => prevCount + 1);

        setIsModalVisible(true);
        setTimeout(() => {
          setIsModalVisible(false);
        }, 1500);
      }
    } else {
      if (isRecruitmentComplete) {
        alert('이미 참여 인원이 모두 찼습니다.');
        setTimeout(() => {
          setIsRecruitmentComplete(true);
        }, 0);
      }
    }
  };
  const toggleMode = () => {
    setIsAdminMode((prev) => !prev);
  };
  const toggleMoreModal = () => {
    setIsMoreModalVisible((prev) => !prev);
  };
  const navigateToReviewPage = () => {
    navigation.navigate('ReviewPage', { clubId: selectedCategory });
  };
  const navigateToQnAPage = () => {
    navigation.navigate('QnAPage', { clubId: selectedCategory });
  };
  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
  };
  const renderTags = (tags) => {
    return (
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>{tag}</Text>
        ))}
      </View>
    );
  };
  const renderClubDetail = () => {
    if (!clubInfo) {
      return null;
    }
    const baseInfo = clubInfo.baseInfo; 
    return (
      <>
        <Text style={styles.titleText}>{baseInfo.title}</Text>
        {renderTags(baseInfo.tags)}
        <View style={styles.sectionContainer}>
          {renderSection('모임 날짜', baseInfo.date)}
          {renderSection('모임 마감', baseInfo.dueTo)}
          {renderSection('인당 예상비용', baseInfo.cost)}
          {renderSection('성별', baseInfo.gender)}
          {renderSection('장소', baseInfo.locationKeyword)}
        </View>
      </>
    );
  };
  const renderLocationDetail = () => {
    if (!clubInfo) {
      return null;
    }  
    const baseInfo = clubInfo.baseInfo;
    return (
      <View style={styles.locationContent}>
        <Text style={styles.locationTitleText}>{baseInfo.locationKeyword}</Text>
        <Text style={styles.locationText}>{baseInfo.location}</Text>
        <View style={styles.mapContainer}>
        <WebView
        source={{
          html: `
            <div style="display: flex; justify-content: center; padding">
              <iframe
                width="920"
                height="300"
                frameborder="0"
                style="border: 4px solid #9BD23C; border-radius: 60px;"
                src="https://www.google.com/maps/embed/v1/view?key=${GOOGLE_WEB_API_KIEY}&center=${baseInfo.latitude},${baseInfo.longitude}&zoom=15"
                allowfullscreen
              ></iframe>
            </div>
          `,
        }}
        style={{ flex: 1, height: 140 }}/>
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
        <Text style={styles.hostTitle}>호스트 정보</Text>
        <View style={styles.profileContainer}>
          <Image source={{ uri: clubInfo.memberInfo.hostThumbnailImage }} style={styles.profileImage} />
          <Text style={styles.profileText}>{memberInfo.hostNickname}</Text>
          <View style={styles.participantContainer}>
            <View style={styles.participantItem}>
              <Image source={image.korean} style={styles.participantImage} />
              <Text style={styles.participantText}>{memberInfo.koreanCount}</Text>
            </View>
            <View style={styles.participantItem}>
            <Text style={styles.hostText}>참가 인원</Text>
              <Image
                source={image.foreigner}
                style={styles.participantImage}
              />
              <Text style={styles.participantText}>{memberInfo.foreignerCount}</Text>
            </View>
            <View style={styles.limitItem}>
              <Text style={styles.limitText}>모집 인원</Text>
              <Text style={styles.participantText}>{memberInfo.maxPeople}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const renderJoinButton = () => {
    let buttonStyle, buttonText, onPressFunction;
    if (isRecruitmentComplete) {
      buttonStyle = styles.cancelButton;
      buttonText = '모집 마감';
      onPressFunction = null;
    } else if (isJoined) {
      buttonStyle = styles.cancelButton;
      buttonText = '참여 취소';
      onPressFunction = toggleJoin;
    } else if (currentParticipants < maxParticipants) {
      buttonStyle = styles.joinButton;
      buttonText = '참여하기';
      onPressFunction = toggleJoin;
    } else {
      buttonStyle = styles.cancelButton;
      buttonText = '이미 참여 인원이 모두 찼습니다.';
      onPressFunction = null;
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
  const renderQaItem = () => {
    if (!clubInfo || !clubInfo.qnas) {
      return null;
    }
    return clubInfo.qnas.map((qna, index) => (
      <View key={index} style={styles.qaItem}>
        <Image source={{ uri: qna.questionerImageUrl }} style={styles.qaProfileImage} />
        <View style={styles.qaContent}>
          <Text style={styles.qaNickname}>{qna.questionerNickname}</Text>
          <Text style={styles.qaText}>{qna.questionContent}</Text>
          <Text style={styles.qaDateTime}>{qna.questionDate}</Text>
        </View>
      </View>
    ));
  };
  const renderReviewItem = () => {
    if (!clubInfo || !clubInfo.reviews) {
      return null;
    }
    return clubInfo.reviews.map((review, index) => (
      <View key={index} style={styles.qaItem}>
        <Image source={{ uri: review.reviewerImageUrl }} style={styles.qaProfileImage} />
        <View style={styles.qaContent}>
          <Text style={styles.qaNickname}>{review.reviewerNickname}</Text>
          <Text style={styles.qaText}>{review.reviewContent}</Text>
          <Text style={styles.qaDateTime}>{review.reviewDate}</Text>
        </View>
      </View>
    ));
  };
  
  const renderMoreModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isMoreModalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.moreModalContent}>
          <TouchableOpacity onPress={() => null}>
            <Text style={styles.moreModalText}>수정</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => null}>
            <Text style={styles.moreModalText}>삭제</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMoreModal}>
            <Text style={styles.moreModalText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#303030" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { copyToClipboard(); }}>
          <Image source={image.share} style={styles.share} />
          </TouchableOpacity>
          {isAdminMode && (
            <TouchableOpacity onPress={toggleMoreModal} style={styles.moreContainer}>
              <Image source={image.more} style={styles.more} />
            </TouchableOpacity>
          )}
      </View>
      {renderMoreModal()}
      <View style={styles.imageContent}>
      <TouchableOpacity onPress={toggleMode} style={styles.toggleButtonContainer}>
            <Text style={styles.toggleButton}>
              {isAdminMode ? 'User Mode' : 'Admin Mode'}
            </Text>
          </TouchableOpacity>
        {clubInfo && (
          <Image source={{ uri: clubInfo.baseInfo.thumbnailImageUrl }} style={styles.clubImage} />
        )}
      </View>
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
        <Text style={styles.sectionText}>{selectedCategory}</Text>
        <View style={styles.sectionContainer}>
        {renderClubDetail()}
        </View>
        {renderHostDetail()}
        <View style={styles.clubInfoContainer}>
          <Text style={styles.clubInfoTitle}>모임 소개</Text>
          {renderClubContent()}
        </View>
        <View style={styles.locationContainer}>
          <Text style={styles.clubInfoTitle}>장소</Text>
          {renderLocationDetail()}
        </View>
        <View style={styles.qnaContainer}>
  <Text style={styles.clubInfoTitle}>Q&A</Text>
  {renderQaItem()}
  <TouchableOpacity onPress={navigateToQnAPage}>
    <Text style={styles.seeAllButton}>Q&A 모두 보기 ></Text>
  </TouchableOpacity>
</View>
<View style={styles.reviewContainer}>
  <Text style={styles.clubInfoTitle}>후기</Text>
  {renderReviewItem()}
  <TouchableOpacity onPress={navigateToReviewPage}>
    <Text style={styles.seeAllButton}>후기 모두 보기 ></Text>
  </TouchableOpacity>
</View>
        <View style={styles.joinContainer}>
        {renderJoinButton()}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              <Text style={styles.greenBtn}>참여 신청</Text>이 완료되었습니다!
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
    height: 180,
    resizeMode: 'cover',
  },
  share: {
    marginLeft: 300,
    marginTop: -10,
  },
  more: {
    marginLeft: 380,
    marginTop: -25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
  },
  imageContent: {
    top: 50,
  },
  content: {
    zIndex: 1,
    position: 'absolute',
    marginTop: 280,
    padding: 13,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#303030',
    marginTop: 30,
    marginBottom: 70,
    padding: 8,
  },
  sectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
  section: {
    width: '48%',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  roundedBox: {
    backgroundColor: '#F0F0F0',
    width: 70,
    height: 30,
    alignItems: 'center',
    borderRadius: 20,
    marginTop: -25,
    flexWrap: 'nowrap',
    marginLeft: 100,
  },
  sectionTitle: {
    color: '#303030',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  sectionText: {
    fontSize: 11,
    color: '#303030',
    marginTop: 7,
  },
  likeCount: {
    fontSize: 16,
    marginLeft: 30,
    marginTop: -25,
    color: '#303030',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  hostContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    padding: 15,
  },
  hostTitle: {
    color: '#303030',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 10,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  participantText: {
    fontSize: 14,
    color: '#303030',
    marginLeft: 7,
    fontWeight: 'bold',
  },
  profileText: {
    fontSize: 14,
    color: '#303030',
    marginLeft: 20,
    marginTop: -7,
    marginRight: 90,
    fontWeight: 'bold',
  },
  participantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -50,
  },
  hostText: {
    position: 'absolute',
    color: '#303030',
    fontSize: 14,
    top: -25,
    left: -10,
  },
  limitText: {
    color: '#303030',
    fontSize: 14,
    marginLeft: -37,
  },
  participantInfo: {
    flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'center',
  },
  limitItem: {
    marginLeft: -17,
    marginTop: 100,
    color: '#303030',
  },
  clubInfoContainer: {
    padding: 15,
  },
  clubInfoTitle: {
    color: '#303030',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clubInfoText: {
    color: '#303030',
    fontSize: 14,
    backgroundColor: '#F8F8F8',
    borderRadius: 30,
    padding: 15,
  },
  locationContainer: {
    paddingTop: 20,
    padding: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    marginTop: 15,
    padding: 15,
  },
  clubLocationText: {
    color: '#303030',
    fontSize: 16,
    fontWeight: 'bold',
    width: 326,
    marginBottom: 20,
    marginLeft: 28,
  },
  detailLocationText: {
    color: '#8A8A8A',
    fontSize: 14,
    width: 326,
    marginBottom: 18,
    marginLeft: 28,
    marginTop: -15,
  },
  locationImage: {
    marginLeft: 30,
    marginBottom: 20,
  },
  qnaContainer: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    padding: 15,
  },
  qaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  qaProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginTop: -15,
  },
  qaContent: {
    flex: 1,
  },
  qaText: {
    fontSize: 13,
    color: '#303030',
    marginBottom: 5,
  },
  qaDateTime: {
    fontSize: 12,
    color: '#888888',
  },
  qaNickname: {
    fontSize: 14,
    color: '#303030',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  seeAllButton: {
    fontSize: 14,
    color: '#303030',
    marginBottom: 15,
  },
  reviewContainer:{
    padding: 15,
  },
  joinButton: {
    width: 110,
    height: 50,
    backgroundColor: '#58C047',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    width: 110,
    height: 50,
    backgroundColor: '#AFAFAF',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  joinContainer: {
    alignItems: 'center',
    marginBottom: 10,
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
    width: 300,
    padding: 50,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#303030',
  },
  greenBtn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#58C047',
  },
  toggleButtonContainer: {
    zIndex: 1,
    position: 'absolute',
    width: 100,
    height: 30,
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 20,
    backgroundColor: 'black',
  },
  moreContainer: {
    marginLeft: 20,
    width: 100,
  },
  more: {
    marginTop: -10,
  },
  moreModalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 100,
    padding: 10,
    alignItems: 'center',
    marginTop: -530,
    marginLeft: 'auto',
    marginRight: 10,
  },
  moreModalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#303030',
    marginVertical: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: -30,
    marginRight: 230,
    padding: 5,
  },
  tag: {
    borderColor: '#9BD23C',
    borderWidth: 1,
    color: '#303030',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
  },
  locationTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#303030',
  },
  locationText: {
    fontSize: 14,
    color: '#8A8A8A',
  },
  mapContainer: {
    marginTop: 10,
  },
});

export default ClubDetail;