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
import NothingShow from '../components/NothingShow';
const url = `${apiServer}/api/v1/heart/club_list?cursor=`;
const WishPage = ({navigation}: any) => {
  const navigateToClub = (clubId: any) => {
    navigation.navigate('ClubDetail', {clubId: clubId});
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
    fontSize: height * 24,
    fontWeight: '700',
  },
  alarm: {
    marginRight: 10,
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

export default WishPage;
