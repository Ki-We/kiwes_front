import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../pages/Home';
import Event from '../../pages/Event';
import ClubCategory from '../../pages/ClubCategory';
import ClubDetail from '../../pages/ClubDetail';
import ReviewPage from '../../pages/ReviewPage';
import {Image} from 'react-native';
import ClubLanguage from '../../pages/ClubLanguage';

const CustomHeader = () => (
  <Image
    source={require('../../../assets/images/logo.png')}
    style={{width: 130, height: 60}}
  />
);

const EventStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerTitle: props => <CustomHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="Event"
        component={Event}
        options={{
          headerShown: true,
          headerTitle: '이벤트',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ClubCategory"
        component={ClubCategory}
        options={{
          headerShown: true,
          headerTitle: '카테고리별 모임',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ClubLanguage"
        component={ClubLanguage}
        options={{
          headerShown: true,
          headerTitle: '언어별 모임',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ClubDetail"
        component={ClubDetail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default EventStack;
