import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WishList from '../../pages/WishList';
import ClubPage from '../../pages/ClubPage';
import BoardList from '../BoardList';

const WishStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="WishPage">
      <Stack.Screen
        name="WishPage"
        component={BoardList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ClubPage"
        component={ClubPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default WishStack;
