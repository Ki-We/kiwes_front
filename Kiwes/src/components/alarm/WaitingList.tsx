import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {apiServer} from '../../utils/metaData';
import {SafeAreaView} from 'react-native-safe-area-context';
import {width} from '../../global';
import BoardList from '../BoardList';

const url = `${apiServer}/api/v1/club/approval/my-waitings?cursor=1`;

const WatingList = ({navigation, navigateToClub}: any) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>대기중인 모임</Text>
        <SafeAreaView style={{flex: 1}}>
          <BoardList url={url} navigateToClub={navigateToClub} />
        </SafeAreaView>
        <TouchableOpacity
          style={styles.retriveContainer}
          onPress={() => {
            navigation.navigate('RequestList');
          }}
        />
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
export default WatingList;
