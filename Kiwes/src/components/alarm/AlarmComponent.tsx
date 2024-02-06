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
                  <Image source={{uri: item.imageUrl}} style={styles.image} />
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
  },
  alarmContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
  },
  image: {
    width: width * 35,
    height: height * 35,
    borderRadius: 20,
    marginRight: 10,
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
    fontSize: width * 12,
    flexShrink: 1,
  },
  timeContainer: {
    marginLeft: 40,
  },
  time: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: width * 12,
  },
});
export default AlarmComponent;
