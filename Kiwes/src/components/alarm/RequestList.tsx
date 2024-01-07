import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {apiServer} from '../../utils/metaData';
import {SafeAreaView} from 'react-native-safe-area-context';
import {width} from '../../global';
import ApprovalRequst from './ApprovalRequst';

const url = `${apiServer}/api/v1/club/approval/my-club?cursor=1`;

const RequestList = ({navigation}: any) => {
  const navigateToRequestList = (clubId: any) => {
    navigation.navigate('ClubApproval', {clubId: clubId});
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>내 모임</Text>
        <SafeAreaView style={{flex: 1}}>
          <ApprovalRequst
            url={url}
            navigateToRequestList={navigateToRequestList}
          />
        </SafeAreaView>
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
  retriveContainer: {
    flexDirection: 'row',
    flex: 0.1,
    marginLeft: 20,
    marginTop: 10,
  },
  retrive: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'Pretendard-Bold',
    fontSize: width * 14,
  },
});
export default RequestList;
