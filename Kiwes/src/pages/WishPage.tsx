import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import BoardList from '../components/BoardList';
import {apiServer} from '../utils/metaData';
import {width, height} from '../global';
import Icon from 'react-native-vector-icons/Ionicons';
const url = `${apiServer}/api/v1/heart/club_list?cursor=1`;
const WishPage = ({navigation}: any) => {
  const navigateToClub = (clubId: any) => {
    navigation.navigate('ClubPage', {clubId: clubId});
  };

  const navigateToAlarm = () => {
    navigation.navigate('AlarmPage');
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>WISH</Text>
          <TouchableOpacity style={styles.alarm} onPress={navigateToAlarm}>
            <Icon name="notifications-outline" size={29} />
          </TouchableOpacity>
        </View>
        <SafeAreaView style={{flex: 1}}>
          <BoardList url={url} navigateToClub={navigateToClub} />
        </SafeAreaView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginTop: height * 14,
    marginLeft: 10,
    paddingTop: height * 10,
    paddingLeft: width * 10.5,
    height: height * 54,
  },
  headerText: {
    flex: 1,
    color: '#303030',
    fontFamily: 'Pretendard-Bold',
    fontSize: width * 24,
    fontWeight: '600',
  },
  alarm: {
    marginRight: 10,
  },
});
export default WishPage;
