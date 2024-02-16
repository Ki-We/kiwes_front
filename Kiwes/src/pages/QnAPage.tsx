import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Text from '@components/atoms/Text';
import Icon from 'react-native-vector-icons/Ionicons';
import QnAList from '../components/clubdetail/QnAList';
import {height, width} from '../global';

const QnAPage = ({route, navigation}) => {
  const {clubId} = route.params;
  const navigateToProile = (memberId: any) => {
    navigation.navigate('OtherUserPage', {memberId: memberId});
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon name="arrow-back" size={30} color="#303030" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Q&A</Text>
      </View>
      <QnAList clubId={clubId} navigateToProile={navigateToProile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: width * 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  backArrow: {
    marginRight: width * 10,
  },
  headerText: {
    fontSize: height * 20,
    fontWeight: '600',
    color: '#303030',
    alignItems: 'center',
    marginHorizontal: width * 125,
  },
});
export default QnAPage;
