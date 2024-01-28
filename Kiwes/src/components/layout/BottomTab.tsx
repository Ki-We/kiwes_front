import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, Image } from 'react-native';
import { width, height } from '../../global';
import ChatMain from '../../pages/ChatMain';
import MyPage from '../../pages/MyPage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeStack from './HomeStack'; // 수정된 부분: EventStack 대신 HomeStack를 import
import WishPage from '../../pages/WishPage';
import ClubDetail from '../../pages/ClubDetail';
import PostClub from '../../pages/PostClub';

const Tab = createBottomTabNavigator();
const putterPath = require('../../../assets/images/putter.png');

ClubDetail.navigationOptions = ({ navigation }) => {
  // Check if the route has the tab bar visible option
  const isTabBarVisible = navigation.getParam('tabBarVisible', true);

  return {
    tabBarVisible: isTabBarVisible,
  };
};

const BottomTab = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const onPress = () => navigation.navigate('CreateMeeting');
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: height * 65 + insets.bottom,
          paddingTop: height * 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'Pretendard-Bold',
          fontSize: width * 10,
          fontWeight: '600',
          paddingBottom: height * 5,
        },
        tabBarActiveTintColor: '#58C047',
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: 'HOME',
          tabBarIcon: ({ color, size }) => (
            <Icon
              name={color === '#58C047' ? 'home' : 'home-outline'}
              color={color}
              size={size}
            />
          ),
          tabBarLabel: 'HOME',
        }}
      />
      <Tab.Screen
        name="wish"
        component={WishPage}
        options={{
          title: 'WISH',
          tabBarIcon: ({ color, size }) => (
            <Icon
              name={color === '#58C047' ? 'heart' : 'heart-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CreateMeeting"
        component={PostClub}
        options={{
          headerShown: false,
          tabBarButton: () => (
            <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
              <Image
                source={putterPath}
                style={{
                  width: width * 49,
                  height: height * 46,
                  resizeMode: 'center',
                  opacity: 0.8,
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="ChatMain"
        component={ChatMain}
        options={{
          headerShown: false,
          title: 'CHAT',
          tabBarIcon: ({ color, size }) => (
            <Icon
              name={
                color === '#58C047'
                  ? 'chatbox-ellipses'
                  : 'chatbox-ellipses-outline'
              }
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          title: 'MY',
          tabBarIcon: ({ color, size }) => (
            <Icon
              name={color === '#58C047' ? 'person' : 'person-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTab;
