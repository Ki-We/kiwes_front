import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';
import {apiServer} from '../../utils/metaData';
import {SafeAreaView} from 'react-native-safe-area-context';
import {width} from '../../global';
import ApprovalRequst from './ApprovalRequst';

const url = `${apiServer}/api/v1/club/approval/my-club?cursor=1`;

const RequestList = ({navigation, navigateToRequestList}: any) => {
  const fetchRequest = async ({cursor}: any) => {
    try {
      console.log(`${apiServer}/api/v1/club/approval/my-club?cursor=${cursor}`);
      const response = await new RESTAPIBuilder(
        `${apiServer}/api/v1/club/approval/my-club?cursor=${cursor}`,
        'GET',
      )
        .setNeedToken(true)
        .build()
        .run();
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>내 모임</Text>
        <SafeAreaView style={{flex: 1}}>
          <ApprovalRequst
            fetchData={fetchRequest}
            navigateToRequestList={navigateToRequestList}
          />
        </SafeAreaView>
        <View style={{flex: 0.2}}></View>
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
