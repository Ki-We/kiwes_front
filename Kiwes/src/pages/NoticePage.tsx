import React from 'react';
import {View, Text} from 'react-native';

const NoticePage = ({route}: any) => {
  const {noticeId} = route.params;
  return (
    <View>
      <Text> noticeId: {noticeId}</Text>
    </View>
  );
};

export default NoticePage;
