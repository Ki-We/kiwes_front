import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const image = {
  profileEx: require('../../assets/images/eclipse.png'),
};

const renderQaItem = (nickname, text, dateTime) => (
  <View style={styles.qaItem}>
    <Image source={image.profileEx} style={styles.qaProfileImage} />
    <View style={styles.qaContent}>
      <Text style={styles.qaNickname}>{nickname}</Text>
      <Text style={styles.qaText}>{text}</Text>
      <Text style={styles.qaDateTime}>{dateTime}</Text>
    </View>
  </View>
);

const ReviewPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#303030" />
        </TouchableOpacity>
        <Text style={styles.headerText}>후기</Text>
      </View>
      <ScrollView>
        <View style={styles.qaContainer}>
          {renderQaItem('닉네임', '안녕하세요, 구체적인 일정 알 수 있을까요?', '2024.01.16 14:30')}
          {renderQaItem('닉네임', '안녕하세요, 구체적인 일정 알 수 있을까요?', '2024.01.15 18:45')}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
  qaContainer: {
    padding: 20,
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  qaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  qaProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginTop: -15,
  },
  qaContent: {
    flex: 1,
  },
  qaText: {
    fontSize: 13,
    color: '#303030',
    marginBottom: 5,
  },
  qaDateTime: {
    fontSize: 12,
    color: '#888888',
  },
  qaNickname: {
    fontSize: 14,
    color: '#303030',
    fontWeight: 'bold',
    marginBottom: 3,
  },
};

export default ReviewPage;
