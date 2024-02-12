import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {height, width} from '../../global';

const AlarmComponent = ({item, navigateTo, navigateToProile}: any) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.alarmContainer}>
          <View>
            <TouchableOpacity onPress={navigateTo}>
              <View style={styles.textContainer}>
                <TouchableOpacity onPress={navigateToProile}>
                  <Image
                    source={{
                      uri:
                        'https://kiwes2-bucket.s3.ap-northeast-2.amazonaws.com/profileimg/' +
                        item.imageUrl +
                        '.jpg',
                    }}
                    style={styles.image}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>{item.content}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{item.createAfterHour}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingBottom: height * 20,
  },
  alarmContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: width * 25,
    height: height * 25,
    borderRadius: 20,
    marginRight: width * 15,
  },
  textContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    flex: 1,
  },
  text: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: width * 13,
    fontWeight: '400',
    flexShrink: 1,
  },
  timeContainer: {
    marginLeft: 40,
  },
  time: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: width * 13,
    fontWeight: '600',
  },
});
export default AlarmComponent;
