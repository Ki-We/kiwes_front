import React, {useEffect} from 'react';
import {Dimensions, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatRoom from '../../pages/ChatRoom';
import Home from '../../pages/Home';
import ClubDetail from '../../pages/ClubDetail';
import ClubCategory from '../../pages/ClubCategory';
import ClubLanguage from '../../pages/ClubLanguage';
import ReviewPage from '../../pages/ReviewPage';
import Event from '../../pages/Event';

const HomeStack = () => {
  console.log(Dimensions.get('screen').height);
  useEffect(() => {
    checkLoginState();
  }, []);

  const CustomHeader = () => (
    <Image
      source={require('../../../assets/images/logo.png')}
      style={{width: 130, height: 60}}
    />
  );

  const checkLoginState = async () => {
    const userData = await AsyncStorage.getItem('userdata');
    console.log(userData);
  };

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerTitle: props => <CustomHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="ClubDetail"
        component={ClubDetail}
        options={{headerShown: false}}
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
        name="ReviewPage"
        component={ReviewPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{headerShown: false}}
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
    </Stack.Navigator>
  );
};

export default HomeStack;
