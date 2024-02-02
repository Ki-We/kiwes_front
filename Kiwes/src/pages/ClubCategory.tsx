import React from 'react';
import ClubList from '../components/club/ClubList';

const ClubCategory = ({navigation, route}: any) => {
  const {selectedItem} = route.params;

  return (
    <ClubList
      navigation={navigation}
      type="category"
      selectedItem={selectedItem}
    />
  );
};

export default ClubCategory;
