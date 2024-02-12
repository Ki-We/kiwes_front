import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';
import {apiServer} from '../../utils/metaData';
import {height, width} from '../../global';
import {ClubMemberApprovalRequestEach} from '../../utils/commonInterface';
import {FlatList} from 'react-native-gesture-handler';
import ApprovalModal from './ApprovalModal';
import NothingShow from '../NothingShow';

const ClubApproval = ({route, navigation}: any) => {
  const {clubId} = route.params;
  const navigateToProile = (item: any) => {
    navigation.navigate('MyPage', {memberId: item.memberId});
  };
  const [members, setMembers] = useState<ClubMemberApprovalRequestEach[]>([]);
  const [member, setMember] = useState<ClubMemberApprovalRequestEach>();
  const [modalVisible, setModalVisible] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [modaltype, setModaltype] = useState('승인');

  const handleOpenAcceptModal = ({item}: any) => {
    setModalVisible(true);
    setMember(item);
    setModaltype('승인');
  };
  const handleOpenRefuseModal = ({item}: any) => {
    setModalVisible(true);
    setMember(item);
    setModaltype('거절');
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleAcceptClub = async ({data}) => {
    try {
      await new RESTAPIBuilder(
        `${apiServer}/api/v1/club/application/${clubId.clubId}/${data}`,
        'PUT',
      )
        .setNeedToken(true)
        .build()
        .run();
      fetchMembers();
    } catch (err) {
      console.log(err);
    }
  };
  const handleRefuseClub = async ({data}) => {
    try {
      await new RESTAPIBuilder(
        `${apiServer}/api/v1/club/application/${clubId.clubId}/${data}`,
        'DELETE',
      )
        .setNeedToken(true)
        .build()
        .run();
      fetchMembers();
    } catch (err) {
      console.log(err);
    }
  };
  const fetchData = async () => {
    try {
      const response = await new RESTAPIBuilder(
        `${apiServer}/api/v1/club/approval/my-club/waiting/${clubId.clubId}`,
        'GET',
      )
        .setNeedToken(true)
        .build()
        .run();
      if (!response.data) {
        setIsEmpty(false);
        return;
      }
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMembers = async () => {
    const newMembers = await fetchData();
    setMembers(newMembers);
    if (newMembers.length === 0) {
      setIsEmpty(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchMembers();
      return () => {
        fetchMembers();
      };
    }, []),
  );
  return (
    <>
      {!isEmpty ? (
        Nothing({text: '승인 신청자가 아직 없어요!'}, {title: clubId.title})
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}> {clubId.title}</Text>
          <FlatList
            data={members}
            keyExtractor={item => item.memberId}
            style={{flex: 1}}
            renderItem={({item}) => (
              <View style={styles.memberContainer}>
                <View>
                  <TouchableOpacity style={styles.profilContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        navigateToProile({item});
                      }}>
                      <Image
                        source={{
                          uri:
                            'https://kiwes2-bucket.s3.ap-northeast-2.amazonaws.com/profileimg/' +
                            item.profileImg +
                            '.jpg',
                        }}
                        style={styles.image}
                      />
                    </TouchableOpacity>

                    <View>
                      <Text style={styles.text}>{item.nickname}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      {
                        handleOpenAcceptModal({item});
                      }
                    }}>
                    <Text style={styles.button}> 승인 </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      {
                        handleOpenRefuseModal({item});
                      }
                    }}>
                    <Text style={styles.button}> 거절 </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <ApprovalModal
            isVisible={modalVisible}
            onClose={handleCloseModal}
            member={member}
            exitClub={
              modaltype === '승인' ? handleAcceptClub : handleRefuseClub
            }
            modaltype={modaltype}
          />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  memberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  profilContainer: {
    flexDirection: 'row',
  },
  image: {
    width: width * 35,
    height: height * 35,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: 3,
    margin: 10,
  },
  text: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: width * 16,
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: width * 16,
    margin: 10,
  },
  button: {
    color: '#58C047',
    borderColor: '#58C047',
    borderWidth: 1,
    borderRadius: 15,
    padding: 4,
    paddingHorizontal: 7,
    marginBottom: 5,
    marginHorizontal: 3,
  },
});
const Nothing = ({text}: {text: string}, {title}: {title: string}) => {
  return (
    <>
      <Text style={styles.title}> {title}</Text>
      <NothingShow title={text} styleKiwe={styleKiwe} />
    </>
  );
};
const styleKiwe = StyleSheet.create({
  image: {
    margin: 10,
    height: height * 300,
  },
  text: {
    fontSize: height * 20,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: 3,
  },
});
export default ClubApproval;
