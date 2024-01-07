import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';
import {apiServer} from '../../utils/metaData';
import {width} from '../../global';
import {ClubMemberApprovalRequestEach} from '../../utils/commonInterface';
import {FlatList} from 'react-native-gesture-handler';
import ApprovalModal from './ApprovalModal';

const ClubApproval = ({route}: any) => {
  const {clubId} = route.params;

  const [members, setMembers] = useState<ClubMemberApprovalRequestEach[]>([]);
  const [member, setMember] = useState<ClubMemberApprovalRequestEach>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modaltype, setModaltype] = useState('승락');

  const handleOpenAcceptModal = ({item}: any) => {
    setModalVisible(true);
    setMember(item);
    setModaltype('승락');
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
                <Image source={{uri: item.profileImg}} style={styles.image} />
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
                <Text style={styles.button}> 승락 </Text>
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
        exitClub={modaltype === '승락' ? handleAcceptClub : handleRefuseClub}
        modaltype={modaltype}
      />
    </View>
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
    width: 35,
    height: 35,
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
export default ClubApproval;
