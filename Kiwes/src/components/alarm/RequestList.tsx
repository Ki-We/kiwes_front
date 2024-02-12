import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {apiServer} from '../../utils/metaData';
import {SafeAreaView} from 'react-native-safe-area-context';
import {height, width} from '../../global';
import ApprovalRequst from './ApprovalRequst';
import NothingShow from '../NothingShow';

const url = `${apiServer}/api/v1/club/approval/my-own-club?cursor=`;

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
            Nothing={Nothing}
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
    fontSize: width * 16,
    fontWeight: '600',
    flex: 0.06,
    marginLeft: width * 20,
    marginTop: height * 15,
  },
  retriveContainer: {
    flexDirection: 'row',
    flex: 0.1,
    marginLeft: width * 20,
    marginTop: height * 10,
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
    height: height * 300,
  },
  text: {
    fontSize: height * 16,
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: 3,
  },
});
export default RequestList;
