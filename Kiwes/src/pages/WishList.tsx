import React from 'react';
import {SafeAreaView} from 'react-native';
import BoardList from '../components/BoardList';
import { apiServer } from '../utils/metaData';

export function WishList({navigation}: any) {
  const url =`${apiServer}/api/v1/heart/club_list`;
  return (
    <SafeAreaView>
      <BoardList url={url} navigation ={navigation} />
    </SafeAreaView>
  );
}

export default WishList;
