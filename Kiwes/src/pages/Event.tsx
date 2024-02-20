import React from 'react';
import {View, Image, StyleSheet, Dimensions, ScrollView} from 'react-native';
import Text from '@components/atoms/Text';

const windowWidth = Dimensions.get('window').width;

const Event = ({route}: any) => {
  const {imageUrl} = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {imageUrl && <Image source={{uri: imageUrl}} style={styles.eventImage} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
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
