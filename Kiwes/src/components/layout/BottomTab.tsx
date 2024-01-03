import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, Image} from 'react-native';
import {width, height} from '../../global';
import ChatMain from '../../pages/ChatMain';
import CreateMeeting from '../../pages/CreateMeeting';
import MyPage from '../../pages/MyPage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HomeStack from './HomeStack';
import WishStack from './WishStack';

const Tab = createBottomTabNavigator();
const putterPath = require('../../../assets/images/putter.png');

const BottomTab = ({navigation}: any) => {
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
          tabBarIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
          tabBarLabel: 'HOME',
        }}
      />
      <Tab.Screen
        name="wish"
        component={WishStack}
        options={{
          title: 'WISH',
          tabBarIcon: ({color, size}) => (
            <Icon name="heart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateMeeting"
        component={CreateMeeting}
        options={{
          headerShown: false,
          tabBarButton: () => (
            <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
              <Image
                source={putterPath }
                style={{
                  width: width * 49,
                  height: height * 46,
                  resizeMode: 'center',
                  opacity:0.8
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
          tabBarIcon: ({color, size}) => (
            <Icon name="chatbox-ellipses-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          title: 'MY',
          tabBarIcon: ({color, size}) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTab;
