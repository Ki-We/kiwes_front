import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {apiServer} from '../../utils/metaData';
import {SafeAreaView} from 'react-native-safe-area-context';
import {height, width} from '../../global';
import BoardList from '../BoardList';
import NothingShow from '../NothingShow';

const url = `${apiServer}/api/v1/club/approval/my-waitings?cursor=`;

const WatingList = ({navigation}: any) => {
  const navigateToClub = (clubId: any) => {
    navigation.navigate('ClubDetail', {clubId: clubId});
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>대기중인 모임</Text>
        <SafeAreaView style={{flex: 1}}>
          <BoardList
            url={url}
            navigateToClub={navigateToClub}
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
    fontFamily: 'Pretendard-Bold',
    fontSize: width * 16,
    fontWeight: '600',
    flex: 0.06,
    marginLeft: width * 20,
    marginTop: height * 15,
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
    fontSize: height * 20,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 1)',
    margin: 10,
  },
});
export default WatingList;
