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
import  Icon  from 'react-native-vector-icons/Ionicons';
import { RESTAPIBuilder } from '../utils/restapiBuilder';
import { apiServer } from '../utils/metaData';
import { Clipboard } from 'react-native';
import { categoryIcon, categoryList, langList } from '../utils/utils';
import { GOOGLE_WEB_API_KIEY } from '../utils/googleConfig';
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import { height, width } from '../global';
import ClubDetailSettingModal from '../components/clubdetail/ClubDetailSettingModal';
import { renderLocationDetail } from '../components/clubdetail/renderLocationDetail';

const ClubDetail = ({ route, navigation, type }: any) => {
  const { clubId } = route.params;
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
  const [NickName, setNickNameInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const allList = type == 'category' ? categoryList : langList;
  
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
    } catch (error) {
      console.error('Error fetching club detail:', error);
    }
  };
  
  useEffect(() => {
    fetchClubDetail(clubId);
  }, [clubId]);

  useEffect(() => {
    if (NickName && clubInfo && NickName.nickName === clubInfo.memberInfo.hostNickname) {
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
    fetchNickName();
  }, []);

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

const renderNickDetail = () => {
  if (!NickName) {
    return null;
  }
  return (
    <View>
      <Text style={styles.titleText}>{NickName.nickName}</Text>
      </View>
  );
};
  
  const toggleMoreModal = () => {
    setIsMoreModalVisible((prev) => !prev);
  };
  const navigateToReviewPage = () => {
    navigation.navigate('ReviewPage', { clubId: clubId });
  };
  const navigateToQnAPage = () => {
    navigation.navigate('QnAPage', { clubId: clubId });
  };
  const navigateToProile = (memberId: any) => {
    console.log(memberId);
    navigation.navigate('OtherUserPage', {memberId: memberId});
  };
  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  const renderClubDetail = () => {
    if (!clubInfo) {
      return null;
    }
    const baseInfo = clubInfo.baseInfo; 
    return (
      <View>
        <Text style={styles.titleText}>{baseInfo.title}</Text>
        {renderBtn(baseInfo.tags)}
        <View style={styles.sectionContainer}>
          {renderSection('모임 날짜', baseInfo.date)}
          {renderSection('모임 마감', baseInfo.dueTo)}
          {renderSection('인당 예상비용', baseInfo.cost)}
          {renderSection('성별', baseInfo.gender)}
          {renderSection('장소', baseInfo.locationKeyword)}
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
          <TouchableOpacity onPress={()=>{
          console.log(clubInfo.memberInfo);
            navigateToProile(clubInfo.memberInfo.hostId);}}>
          <Image source={{ uri: clubInfo.memberInfo.hostThumbnailImage }} style={styles.profileImage} />
          </TouchableOpacity>
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
              <Text style={styles.participantText1}>{memberInfo.maxPeople}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const isRecruitmentClosed = (dueTo) => {
    const currentDate = new Date();
    const dueToDate = new Date(dueTo);
    return currentDate > dueToDate;
  };

  const checkRecruitmentStatus = (dueTo) => {
    const recruitmentClosed = isRecruitmentClosed(dueTo);
    setIsRecruitmentComplete(recruitmentClosed);
  };
  
  useEffect(() => {
    if (clubInfo) {
      checkRecruitmentStatus(clubInfo.baseInfo.dueTo);
    }
  }, [clubInfo]);

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
  const renderTag = (key:string, type:string) => {
    let text = 'UNDEFINED'
    if ( type == 'category' ){ 
      const category = categoryList.find(c => c.key === key);
      text = category ? category.simple : 'UNDEFINED';
    } else {
      const lang = langList.find(c => c.key === key);
      text = lang ? lang.text : 'UNDEFINED';
    }

    return (
        <View style={styles.tag2}>
        {type=='category' && <Image
          resizeMode="contain"
          source={categoryIcon[key]}
          style={styles.image}
        />}
        <Text style={styles.tagText}>
          {text}
        </Text>
      </View>
    );
  }
const renderBtn = (tags: string[]) => {
  return (
    <View style={styles.tagContainer2}>
      {renderTag(tags[0], 'category')}
      {tags.slice(1).map((tag, index) => {return renderTag(tag, 'lang')})}
    </View>
  );
};

  const renderQaItem = () => {
    if (!clubInfo || !clubInfo.qnas) {
      return null;
    }
    return clubInfo.qnas.map((qna, index) => (
      <View key={index} style={styles.qaItem}>
        <TouchableOpacity onPress={()=>navigateToProile(qna.questionerId)}>
          <Image source={{ uri: qna.questionerImageUrl }} style={styles.qaProfileImage} />
        </TouchableOpacity>
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
        <TouchableOpacity onPress={()=>navigateToProile(review.reviewerId)}>
        <Image source={{ uri: review.reviewerImageUrl }} style={styles.qaProfileImage} />
        </TouchableOpacity>
        <View style={styles.qaContent}>
          <Text style={styles.qaNickname}>{review.reviewerNickname}</Text>
          <Text style={styles.qaText}>{review.reviewContent}</Text>
          <Text style={styles.qaDateTime}>{review.reviewDate}</Text>
        </View>
      </View>
    ));
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={height * 30} color="#303030" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { copyToClipboard(); }} style={styles.shareContainer}>
          <Image source={image.share} />
          </TouchableOpacity>
          {isAdminMode && (
          <TouchableOpacity onPress={() => setIsMoreModalVisible(true)} style={styles.moreContainer}>
            <Image source={image.more} style={styles.more} />
          </TouchableOpacity>
        )}
      </View>
      <ClubDetailSettingModal 
        isVisible={isMoreModalVisible} 
        onClose={toggleMoreModal}/>
      <View style={styles.imageContent}>
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
        <Text style={styles.sectionText}>{clubId}</Text>
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
          {renderLocationDetail(clubInfo)}
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
    height: height * 170,
    resizeMode: 'cover',
  },
  shareContainer: {
    width: 20,
    marginLeft: width * 270,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: height * 10,
    position: 'absolute',
  },
  imageContent: {
    top: height * 50,
  },
  content: {
    zIndex: 1,
    position: 'absolute',
    marginTop: height * 265,
    padding: height * 15,
  },
  titleText: {
    fontSize: height * 20,
    fontWeight: '600',
    color: '#303030',
    marginTop: height * 30,
    marginBottom: height * 50,
    padding: height * 8,
  },
  sectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: height * 8,
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
    marginTop: height * 5,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: width * 50,
    height: height * 50,
    marginLeft: width * 3,
    borderRadius: 50,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: width * 24,
  },
  participantText: {
    fontSize: height * 16,
    color: '#808080',
    marginLeft: width * 9,
    fontWeight: '600',
  },
  participantText1: {
    fontSize: height * 16,
    color: '#808080',
    marginLeft: width * -6,
    alignItems: 'flex-end',
    fontWeight: '600',
  },
  profileText: {
    fontSize: height * 14,
    color: '#303030',
    marginLeft: width * 15,
    marginTop: height * -7,
    marginRight: width * 90,
    fontWeight: '500',
    width: width * 120,
  },
  participantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * -50,
    marginLeft: width * -70,
  },
  hostText: {
    position: 'absolute',
    color: '#303030',
    fontSize: height * 12,
    fontWeight: '600',
    top: height * -25,
    left: height * -10,
  },
  limitText: {
    color: '#303030',
    fontSize: height * 12,
    fontWeight: '600',
    marginLeft: width * -35,
  },
  participantInfo: {
    flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },
  limitItem: {
    marginLeft: width * -17,
    marginTop: height * 100,
    color: '#303030',
  },
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
  reviewContainer:{
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
  },
  greenBtn: {
    fontSize: height * 16,
    fontWeight: 'bold',
    color: '#58C047',
  },
  moreContainer: {
    marginLeft: width * 20,
    width: width * 100,
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
    marginRight: width * 10
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
    overflow: 'hidden'
  },
  image: {
    marginRight: width * 3,
    width: width * 16,
    height: width * 16,
  },
});

export default ClubDetail;