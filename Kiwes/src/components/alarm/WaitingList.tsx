import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {apiServer} from '../../utils/metaData';
import {SafeAreaView} from 'react-native-safe-area-context';
import {width} from '../../global';
import BoardList from '../BoardList';

const url = `${apiServer}/api/v1/club/approval/my-waitings?cursor=`;

const WatingList = ({navigation}: any) => {
  const navigateToClub = (clubId: any) => {
    navigation.navigate('ClubPage', {clubId: clubId});
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>대기중인 모임</Text>
        <SafeAreaView style={{flex: 1}}>
          <BoardList url={url} navigateToClub={navigateToClub} />
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
});
export default WatingList;
