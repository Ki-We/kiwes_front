import React from 'react';
import ClubList from '../components/club/ClubList';
import {apiServer} from '../utils/metaData';

const ClubLanguage = ({navigation, route}: any) => {
  const {selectedItem} = route.params;
  const url = `${apiServer}/api/v1/heart/club_list?cursor=`;

  return (
    <ClubList
      navigation={navigation}
      type="language"
      url={url}
      selectedItem={selectedItem}
    />
  );
};

export default ClubLanguage;
