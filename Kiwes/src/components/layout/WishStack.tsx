import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WishList from '../../pages/WishList';
import ClubPage from '../../pages/ClubPage';

const WishStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="WishPage"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="WishPage" component={WishList} />
      <Stack.Screen name="ClubPage" component={ClubPage} />
    </Stack.Navigator>
  );
};

export default WishStack;
