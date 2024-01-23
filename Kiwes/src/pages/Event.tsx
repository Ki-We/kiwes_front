import React from 'react';
import { View,Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';

const eventImage = require('../../assets/images/event.png');
const windowWidth = Dimensions.get('window').width;

const Event = ({route}) => {
  const { eventId } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.color}>{eventId}</Text>
      {/* <Image source={eventImage} style={styles.eventImage} /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  eventImage: {
    width: windowWidth,
    height: undefined,
    aspectRatio: 16/35,
    resizeMode: 'cover',
  },
  color: {
    color: 'black',
  },
});

export default Event;
