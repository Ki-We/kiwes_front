import React from 'react';
import {View, Text} from 'react-native';

const ClubApproval = ({route}: any) => {
  const {clubId} = route.params;
  return (
    <View>
      <Text> club_id: {clubId}</Text>
    </View>
  );
};

export default ClubApproval;
