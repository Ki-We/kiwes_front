import React from 'react';
import {SafeAreaView} from 'react-native';
import BoardList from '../components/BoardList';
import { apiServer } from '../utils/metaData';
import { NativeBaseProvider } from 'native-base';

export function WishList({navigation}: any) {
  const url =`${apiServer}/api/v1/heart/club_list`;
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <BoardList url={url} />
      </SafeAreaView> 
    </NativeBaseProvider>
  );
}

export default WishList;
