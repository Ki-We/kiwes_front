import React from 'react';
import {View, Text} from 'react-native';

const ProfilePage = ({route}: any) => {
  const {member_Id} = route.params;
  return (
    <View>
      <Text> memberId: {member_Id}</Text>
    </View>
  );
};

export default ProfilePage;
