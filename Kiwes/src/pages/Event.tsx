import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const Event = ({ route }: any) => {
  const { eventId, imageUrl } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.eventImage} />}
      <Text style={styles.color}>{eventId}</Text>
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
    zIndex: 1,
    width: windowWidth,
    height: 900,
    resizeMode: 'cover',
  },
  color: {
    color: 'white',
  },
});

export default Event;
