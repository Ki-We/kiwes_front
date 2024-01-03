import React from 'react';
import {View, Text} from 'react-native';

const ClubPage = ({route}: any) => {
  const {clubId} = route.params;
  return (
    <View>
      <Text> club_id: {clubId}</Text>
    </View>
  );
};

export default ClubPage;
