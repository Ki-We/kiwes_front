import React from 'react';
import {View, Text} from 'react-native';

const ProfilePage = ({route}: any) => {
  const {memberId} = route.params;
  return (
    <View>
      <Text> memberId: {memberId}</Text>
    </View>
  );
};

export default ProfilePage;
