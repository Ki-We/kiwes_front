import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {apiServer} from '../../utils/metaData';
import {SafeAreaView} from 'react-native-safe-area-context';
import {height, width} from '../../global';
import Icon from 'react-native-vector-icons/Ionicons';

import BoardList from '../BoardList';
import ApprovalRequst from './ApprovalRequst';
import NothingShow from '../NothingShow';

const approvalUrl = `${apiServer}/api/v1/club/approval/simple/approval?cursor=`;
const watinglUrl = `${apiServer}/api/v1/club/approval/simple/wating?cursor=`;

const ApprovalList = ({navigation}: any) => {
  const navigateToRequestList = (clubId: any) => {
    navigation.navigate('ClubApproval', {clubId: clubId});
  };
  const navigateToClub = (clubId: any) => {
    navigation.navigate('ClubDetail', {clubId: clubId});
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>승인 요청</Text>
        <SafeAreaView style={{flex: 0.34}}>
          <ApprovalRequst
            url={approvalUrl}
            navigateToRequestList={navigateToRequestList}
            Nothing={Nothing}
          />
        </SafeAreaView>
        <TouchableOpacity
          style={styles.retriveContainer}
          onPress={() => {
            navigation.navigate('RequestList');
          }}>
          <Text style={styles.retrive}>내 모임 모두 보기</Text>
          <Icon
            name="chevron-forward-outline"
            size={18}
            color="#rgba(0, 0, 0, 1)"
          />
        </TouchableOpacity>
        <Text style={styles.title}>승인 대기</Text>
        <SafeAreaView style={{flex: 0.37}}>
          <BoardList
            url={watinglUrl}
            navigateToClub={navigateToClub}
            Nothing={Nothing}
          />
        </SafeAreaView>
        <TouchableOpacity
          style={styles.retriveContainer}
          onPress={() => {
            navigation.navigate('WatingList');
          }}>
          <Text style={styles.retrive}>대기중인 모임 모두 보기</Text>
          <Icon
            name="chevron-forward-outline"
            size={18}
            color="#rgba(0, 0, 0, 1)"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'Pretendard-Bold',
    fontSize: width * 18,
    flex: 0.06,
    marginLeft: 20,
    marginTop: 15,
  },
  ListContainer: {
    flex: 0.34,
  },
  retriveContainer: {
    flexDirection: 'row',
    flex: 0.1,
    marginLeft: 20,
    marginTop: 20,
  },
  retrive: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'Pretendard-Bold',
    fontSize: width * 14,
  },
});

const Nothing = ({text}: {text: string}) => {
  return <NothingShow title={text} styleKiwe={styleKiwe} />;
};
const styleKiwe = StyleSheet.create({
  image: {
    height: height * 170,
  },
  text: {
    fontSize: height * 15,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: 3,
  },
});

export default ApprovalList;
