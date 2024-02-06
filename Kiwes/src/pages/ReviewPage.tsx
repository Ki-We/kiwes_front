import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ReviewList from '../components/clubdetail/ReviewList';

const ReviewPage = ({route, navigation}) => {
  const {clubId} = route.params;
  const navigateToProile = (memberId: any) => {
    navigation.navigate('MyPage', {memberId: memberId});
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon name="arrow-back" size={30} color="#303030" />
        </TouchableOpacity>
        <Text style={styles.headerText}>후기</Text>
      </View>
      <ReviewList clubId={clubId} navigateToProile={navigateToProile} />
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
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  backArrow: {
    fontSize: 20,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#303030',
    marginLeft: 150,
  },
});
export default ReviewPage;
