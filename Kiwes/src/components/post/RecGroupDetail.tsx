import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';
import {apiServer} from '../../utils/metaData';
import Text from '@components/atoms/Text';

const RecGroupDetail = ({postId, navigation}: any) => {
  const [groupData, setGroupData] = useState<any>({});
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${apiServer}/api/v1/club/getClubs?cursor=0`;
      try {
        const response = await new RESTAPIBuilder(url, 'GET')
          .setNeedToken(true)
          .build()
          .run();
        setGroupData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [postId]);

  const toggleLike = () => {
    setIsLiked(prev => !prev);
  };

  const navigateToClubDetail = () => {
    navigation.navigate('ClubDetail', {
      clubData: groupData,
    });
  };

  return (
    <TouchableOpacity onPress={navigateToClubDetail}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/jejuImg.png')}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{groupData.title}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.detail}>{groupData.date}</Text>
            <Text style={styles.detail}>{groupData.location}</Text>
            <Text style={styles.detail}>{groupData.languages?.join(', ')}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.heartContainer} onPress={toggleLike}>
          <Icon
            name={isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={isLiked ? 'green' : '#58C047'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 50,
    backgroundColor: 'rgba(255, 253, 141, 0.3)',
    borderRadius: 30,
    borderColor: '#DADADA',
    borderWidth: 1,
  },
  image: {
    borderRadius: 10,
    width: 150,
    height: 100,
    marginLeft: 10,
    marginBottom: -7,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    color: '#303030',
    fontSize: 16,
    marginBottom: -25,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -20,
    marginLeft: 20,
  },
  detail: {
    color: '#303030',
    fontSize: 12,
    marginRight: 10,
  },
  heartContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default RecGroupDetail;
