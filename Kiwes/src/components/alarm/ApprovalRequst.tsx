import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {ClubApprovalRequest} from '../../utils/commonInterface';
import {apiServer} from '../../utils/metaData';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';

const ApprovalRequst = ({fetchData, navigateToRequestList}) => {
  const screenHeight = Dimensions.get('window').height;
  const [posts, setPosts] = useState<ClubApprovalRequest[]>([]);
  const [cursor, setCursor] = useState(1);
  const [last, setLast] = useState(1);
  const fetchLast = async () => {
    try {
      const response = await new RESTAPIBuilder(
        `${apiServer}/api/v1/club/approval/my-club/get-last`,
        'GET',
      )
        .setNeedToken(true)
        .build()
        .run();
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
  const setLastId = async () => {
    const lastId = await fetchLast();
    setLast(lastId);
  };
  const fetchPosts = async () => {
    const newPosts = await fetchData({cursor});
    setPosts(newPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, [cursor]);
  useFocusEffect(
    useCallback(() => {
      setLastId();
      return () => {};
    }, []),
  );

  return (
    <>
      <FlatList
        data={posts}
        keyExtractor={item => item.clubId}
        style={{flex: 1}}
        onScroll={event => {
          const scrollPosition = event.nativeEvent.contentOffset.y;
          if (scrollPosition <= 0) {
            console.log('리스트의 맨 위에 도달했습니다.');
            setCursor(prevCursor => Math.max(prevCursor - 1, 1)); // cursor의 최소값을 1로 설정
          }
        }}
        onEndReached={() => {
          console.log('리스트의 끝에 도달했습니다.');
          // if (cursor < last - 6) {
          //   setCursor(prevCursor => prevCursor + 1);
          // }
        }}
        onEndReachedThreshold={0.5}
        renderItem={({item}) => (
          <View style={styles.requestContainer}>
            <View style={styles.textContainer}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.infoContainer}>
                  <Icon
                    name="people-outline"
                    size={24}
                    color={'#rgba(0, 0, 0, 1)'}
                  />
                  <Text style={styles.info}>{item.currentPeople}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.heartContainer}
              onPress={() => {
                navigateToRequestList(item.clubId);
              }}>
              <Text style={styles.button}> 보기 </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  );
};
const styles = StyleSheet.create({
  requestContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  heartContainer: {
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.7)',
    marginBottom: 18,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
  },
  info: {
    fontSize: 20,
    marginLeft: 10,
    color: '#58C047',
  },

  button: {
    color: 'rgba(0, 0, 0, 0.8)',
    borderColor: 'rgba(0, 0, 0, 0.8)',
    borderWidth: 1,
    borderRadius: 15,
    padding: 4,
    paddingHorizontal: 12,
    marginBottom: 5,
  },
});
export default ApprovalRequst;
