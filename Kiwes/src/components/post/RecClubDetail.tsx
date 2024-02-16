import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Text from '@components/atoms/Text';

const RecClubDetail = ({title, date, location, languages}: any) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(prev => !prev);
  };

  return (
    <View style={styles.recommendedGroupsContainer}>
      <View style={styles.roundedRectangle}>
        <View style={styles.groupContent}>
          <Image
            source={require('../../assets/images/jejuImg.png')}
            style={styles.groupImage}
          />
          <View style={styles.textContent}>
            <Text style={styles.groupTitle}>{title}</Text>
            <Text style={styles.groupDetail}>{date}</Text>
            <Text style={styles.groupDetail}>{location}</Text>
            <Text style={styles.groupDetail}>{languages.join(', ')}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.RHeartContainer} onPress={toggleLike}>
          <Icon
            name={isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={isLiked ? 'green' : '#58C047'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  recommendedGroupsContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  roundedRectangle: {
    width: '100%',
    height: 130,
    marginTop: 10,
    marginBottom: 50,
    backgroundColor: 'rgba(255, 253, 141, 0.3)',
    borderRadius: 30,
    borderColor: '#DADADA',
    borderWidth: 1,
  },
  groupContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupImage: {
    borderRadius: 10,
    width: 150,
    height: 100,
    marginLeft: 10,
    marginBottom: -50,
  },
  textContent: {
    marginLeft: 10,
  },
  groupTitle: {
    color: '#303030',
    fontSize: 16,
    right: 5,
    bottom: -11,
  },
  groupDetail: {
    color: '#303030',
    fontSize: 12,
    left: 10,
    bottom: -20,
  },
  RHeartContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
};

export default RecClubDetail;
