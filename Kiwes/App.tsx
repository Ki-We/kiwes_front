import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Home from './src/pages/Home';
import Wish from './src/pages/Wish';
import CreateMeeting from './src/pages/CreateMeeting';
import ChatMain from './src/pages/ChatMain';
import ChatRoom from './src/pages/ChatRoom';
import Test from './src/pages/Test';
import MyPage from './src/pages/MyPage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// const CustomTabBar = ({navigation}) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const tabButtons = [
//     {
//       label: 'Home',
//       before:
//         'https://s3-alpha-sig.figma.com/img/8a48/4b79/bb86b11013ec41bafe274bcb53d45b3d?Expires=1695600000&Signature=KLZWJYcTTxn~TIxijMSzlYFG2RJqDmoHrLv2p5NIGWIFxymh5SDKB4HQmEWyuunTbzqPFj0oF~4UcVurqDOeCHxtT3b8kKbCnOwD9zApWpEl5EU2jykboQmSNE41np00gH5eF~--pZ2enH6eK-mwVIS6jwRai15liPB~DMZs8lavNl8fHZl6dt4JLVDJpzixIvfDgXmp2adjxOeWMQn66wN6SWX9NNfo7B6jNGEttTY7ucB3ShwoWdxXDYy4ArHXnnlnGwKPUzoNzrXEs-NHngEDON1BILyQSB4MWgFiI3txR-w2K4doqTnY8J4OZWwz6bGwbsUd3LILWo4f7c12fQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
//       after:
//         'https://s3-alpha-sig.figma.com/img/b614/6142/3fb6272a3cb6183cf35ff3df2bbe9970?Expires=1695600000&Signature=Va1lIZiwzkLirKWilaMWqkavZQFV7z832EqL-O8ZAGmn9ehTHjxoG4McgCM-AkbQV1HJRyOC0e~alKcHdoqVXTps5hZRwSUz2jmurxDxYfpIh3k3lycowyZJkWu8YSwqyaN-uT0ktZnDWr-qbojZ9VDZkBg73OGIOF-AwxzfNIGEaduQZD-tgLMj8zyNNobF2edXDLAaKSiDlIZoHt5yAhatV7ZuteSCSjPzU1kzIGvvogA2uhIaldRHVTOqeZTj3u4fvfH-THTnT3KxtNBGgKAZNUkmUSfG9CYXllOKWsIzeRWBpNti-8IuHNjXm7zLSD8erX~oyhcqrH-mVypy8g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
//     },
//     {
//       label: 'Wish',
//       before:
//         'https://s3-alpha-sig.figma.com/img/7c71/1db1/9dac58a8206bfd68f3582da749b18c15?Expires=1696204800&Signature=h9sbETBGVxenZjj8630h2ymAqCO51Ab1P4LKemdpUOR5UCrGbliDQxZxKqMtom6yfzD9a9h6iKAx9g1VkPToPaTippdzbHE2km4PMBjPpNJabo2BAO6sKu6S5PNsFxZMSuVEBhdwvT6TkzrU9MWgT~LtIW5FLaegAiQPbi0HuXMDGkYuGmBBqfHM4X5Twh2Te5DJ56nScPOQp8ro6f0ulX9vC~OuRWSht9ZfGGY6J8CrTg8kOadtcyZiDkTrIyJh-kb-IoAjP0e~UHjRbg2pFqT5EFrrlqGb-0mBlcXJX-YrwnenfmS7P9F8sClCdziSdxFWMVL6k6rUNU6ehikEJQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
//       after:
//         'https://s3-alpha-sig.figma.com/img/aa92/4864/b8ce9fcd256fe4f639009af916657efb?Expires=1696204800&Signature=SKlXOzxeflxZ1zz2kAnMf4EUcWp6G~p6B2eKYVu~KpzG4d5XVY1nDGNcsFEKvegNt9R7eACG1nk52tM6Hqo6zNUiLAAOxn5i~q6WlTSdWwWUaG4Bbn5u6zQyETmuqptt50ayS2OXfrP7dgFNMArpQSt7PgTyHzF0h2HQqYKtkIEhGSMVaFMj-OYuHByz-AFtrkzZqzauA-WX3~7f6jCoxaP6pWi53pp5bbTzJ7RQQfqQQnHrPQDajzO2ItrCjQcar3g6vgU5z1YO2dJrOMxc0Q6nsSM~KxRZsv~jAOpYpqUz7f7wiZ66sUmEhaVXkVqVHXmpBH2-LZcv8bnEJr4lUw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
//     },
//     {
//       label: 'CreateMeeting',
//       before:
//         'https://s3-alpha-sig.figma.com/img/677f/08a0/65dea42679c06af145f80d3ab5b3d92e?Expires=1696204800&Signature=oGyNfscQ5ZpnKOEED1l7A3B6si9Y4ma5kK50tE1ZyWaFBKkr-no9MCykDBEjPAbkarnNzTRq~bKOulU~semnqW0OFZnOhBXb77PaB5vIaUYA8C2nF~y-EnzFAEwrQrFmzVDGk29r3KZR2a9kukprq6d3nWTlr-o9WDiZp~gW5td0QQQ1keq-4K8CSfUoPiGErPvhOP5AS-FqKrXjvir2mYJvpaZEgYvUDPq8vbCUPtHe3ttPyCpVKxL4HbqEEDPQT--lFFX~6ZAgv6XauEkCtvSzPs1kdeMS4W9rwB20CBLx2pMtkjj3AzMedSq9u66e~3Vhy4zfUS56rD8FSNARpg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
//       // after:
//       //   'https://s3-alpha-sig.figma.com/img/7c71/1db1/9dac58a8206bfd68f3582da749b18c15?Expires=1696204800&Signature=h9sbETBGVxenZjj8630h2ymAqCO51Ab1P4LKemdpUOR5UCrGbliDQxZxKqMtom6yfzD9a9h6iKAx9g1VkPToPaTippdzbHE2km4PMBjPpNJabo2BAO6sKu6S5PNsFxZMSuVEBhdwvT6TkzrU9MWgT~LtIW5FLaegAiQPbi0HuXMDGkYuGmBBqfHM4X5Twh2Te5DJ56nScPOQp8ro6f0ulX9vC~OuRWSht9ZfGGY6J8CrTg8kOadtcyZiDkTrIyJh-kb-IoAjP0e~UHjRbg2pFqT5EFrrlqGb-0mBlcXJX-YrwnenfmS7P9F8sClCdziSdxFWMVL6k6rUNU6ehikEJQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
//     },
//     {
//       label: 'ChatMain',
//       before:
//         'https://s3-alpha-sig.figma.com/img/4e25/8a28/3bd228455e849a04dc2893b2c0fdf045?Expires=1696204800&Signature=ev9xlKnjnQZ7Biwj~Y6iqE5PmxazUFUVWKDmQ4qTU8px~Tfw7ymM1sq1X-A4UXwRkGaN3AvY4gSTf39N760dX-4oC1zP5CnfS-eDQaq0Ql5teAXOc7TuB-rhAmG2S5JMH~sYDHZV~vIEsyZaE7CZtrWChb9OelCI1n6bOBWvIKww7Rw6lKgqYvFtASoeDC~9FiNtSPDHAyYbMQ66UEPqOJV4mqA9JaL2MVX~rMmVjxoOd8DMr8e1z8qr9B5IfxliStZT92Wu8uaDkoEwlmhRv1oE3O8AZ-eRvcbEPT42dxW9Hct~PcCiNEAqGbtdGNdLpXSlZQRDR1JhZ58JcsRKRA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
//       after:
//         'https://s3-alpha-sig.figma.com/img/7738/6257/f067356613530952b0ba4fcd69f4c0b1?Expires=1696204800&Signature=WFXaBYz-ltTMeN~aHrtMYfhoxISosHFHmgf5HDyaI5ddLB5iFv34ynLPCdZogdci0xBQxxQIwuaHeJuxt~STjdIddQbGXAXWe~LL5Lh3eMxgAH090~Q26qVxElWcQ0R56BH4r-15JD4wdU6MXjJzjCHmp0Jq~9PeqO09x5NUQQq4dxM7rKgLFhe9w9HNll6A3gIMiHpfOQV~VQ~LWQHolnKSTTQZESkfoC2V9EmnHsnrBL8eXUvD6DLDtQvdW7fKPjm9PoT82zJk5PKLuNoM42I5bqjH7KbK-SfQrFCc8a9zvEf8JoW9xDj~BEJbxramrV0Ew5yb-Ln6BLtpqWBPHA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
//     },
//     {
//       label: 'MyPage',
//       before:
//         'https://s3-alpha-sig.figma.com/img/94ef/d3ab/78a86d80c14e71567430ddab39bed595?Expires=1696204800&Signature=nE-nmb9UDnXpIbcFNjLDzYkWS59SouaaG-3bNaOMA2R75RjrOL8N3i8lpx6wpz0v8UFbxpkxZr6Qiq~~1cw0ZhCRZJlw5D0poKvgBEyO~~zPpP74N0Au1BpwBobS~A8A2LCjpdXeKr1MbXNhDXLwNhaKcpDclWGlDxQQMhk6XD5sCYoBp2fvXjHmMGIN-~QPLJCAmjX1mb0XEAQ5E24EGzkJSfTZmPOS6XpIGrTGVZQWAjOJIeaZAvNNGDr8tiJd1uAJrm-5emxuLAXkstGYHcneFBwBOqA7VySmF8kKxlgUPRG5KwinmDHlbcnqF724gJ1ZRbt6WXRwIpynXbcqhQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
//       after:
//         'https://s3-alpha-sig.figma.com/img/94ef/d3ab/78a86d80c14e71567430ddab39bed595?Expires=1696204800&Signature=nE-nmb9UDnXpIbcFNjLDzYkWS59SouaaG-3bNaOMA2R75RjrOL8N3i8lpx6wpz0v8UFbxpkxZr6Qiq~~1cw0ZhCRZJlw5D0poKvgBEyO~~zPpP74N0Au1BpwBobS~A8A2LCjpdXeKr1MbXNhDXLwNhaKcpDclWGlDxQQMhk6XD5sCYoBp2fvXjHmMGIN-~QPLJCAmjX1mb0XEAQ5E24EGzkJSfTZmPOS6XpIGrTGVZQWAjOJIeaZAvNNGDr8tiJd1uAJrm-5emxuLAXkstGYHcneFBwBOqA7VySmF8kKxlgUPRG5KwinmDHlbcnqF724gJ1ZRbt6WXRwIpynXbcqhQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
//     },
//   ];

//   const handleTabButtonPress = index => {
//     setActiveIndex(index);
//     navigation.navigate(tabButtons[index].label);
//   };

//   return (
//     <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
//       {tabButtons.map((button, index) => (
//         <CustomTabBarButton
//           key={index}
//           isActive={activeIndex === index}
//           beforeImage={button.before}
//           afterImage={button.after}
//           label={button.label}
//           onPress={() => handleTabButtonPress(index)}
//         />
//       ))}
//     </View>
//   );
// };

// const CustomTabBarButton = ({
//   isActive,
//   beforeImage,
//   afterImage,
//   label,
//   onPress,
// }) => {
//   return (
//     <TouchableOpacity
//       activeOpacity={0.5}
//       onPress={onPress}
//       style={{
//         backgroundColor: isActive ? '#fff' : 'transparent',
//         alignItems: 'center', // 중앙 정렬
//       }}>
//       {label === 'CreateMeeting' ? (
//         <Image
//           source={{
//             uri: beforeImage,
//           }}
//           style={{
//             width: 50,
//             height: 50,
//             resizeMode: 'contain',
//           }}
//         />
//       ) : (
//         <>
//           <Image
//             source={{
//               uri: isActive ? afterImage : beforeImage,
//             }}
//             style={{
//               width: 20,
//               height: 20,
//               resizeMode: 'contain',
//             }}
//           />
//           <Text>{label}</Text>
//         </>
//       )}
//     </TouchableOpacity>
//   );
// };

// const MainScreen = () => {
//   return (
//     <Tab.Navigator
//       tabBar={props => <CustomTabBar {...props} />}
//       screenOptions={{
//         tabBarActiveTintColor: '#fb8c00',
//         tabBarShowLabel: false,
//       }}>
//       <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
//       <Tab.Screen name="Wish" component={Wish} options={{headerShown: false}} />
//       <Tab.Screen
//         name="ChatMain"
//         component={ChatMain}
//         options={{headerShown: false}}
//       />
//       <Tab.Screen
//         name="MyPage"
//         component={MyPage}
//         options={{headerShown: false}}
//       />
//     </Tab.Navigator>
//   );
// };

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="main"
//           component={MainScreen}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="CreateMeeting"
//           component={CreateMeeting}
//           options={{title: 'CreateMeeting'}}
//         />
//         <Stack.Screen
//           name="ChatRoom"
//           component={ChatRoom}
//           options={{title: 'ChatRoom'}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, width, height} from './src/global';
import ChatTest from './src/pages/ChatTest';
import KeyboardTest from './src/pages/KeyboardTest';
import Login from './src/pages/Login';
import SplashPage from './src/pages/SplashPage';
// import React from 'react';
// import {View, Text, Button} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {Icon} from 'native-base';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = ({navigation}) => {
  const onPress = () => navigation.navigate('CreateMeeting');

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#58C047',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'HOME',
          tabBarIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="wish"
        component={Wish}
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
                source={{
                  uri: 'https://s3-alpha-sig.figma.com/img/677f/08a0/65dea42679c06af145f80d3ab5b3d92e?Expires=1696204800&Signature=oGyNfscQ5ZpnKOEED1l7A3B6si9Y4ma5kK50tE1ZyWaFBKkr-no9MCykDBEjPAbkarnNzTRq~bKOulU~semnqW0OFZnOhBXb77PaB5vIaUYA8C2nF~y-EnzFAEwrQrFmzVDGk29r3KZR2a9kukprq6d3nWTlr-o9WDiZp~gW5td0QQQ1keq-4K8CSfUoPiGErPvhOP5AS-FqKrXjvir2mYJvpaZEgYvUDPq8vbCUPtHe3ttPyCpVKxL4HbqEEDPQT--lFFX~6ZAgv6XauEkCtvSzPs1kdeMS4W9rwB20CBLx2pMtkjj3AzMedSq9u66e~3Vhy4zfUS56rD8FSNARpg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
                }}
                style={{
                  width: width * 49,
                  height: height * 46,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
            // >
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

function App() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    checkLoginState();
  }, []);
  const checkLoginState = async () => {
    const userData = await AsyncStorage.getItem('userdata');
    console.log(userData);
  };
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Splash"
            component={SplashPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateMeeting"
            component={CreateMeeting}
            options={{title: 'CreateMeeting'}}
          />
          <Stack.Screen
            name="ChatRoom"
            component={ChatRoom}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Test"
            component={ChatTest}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="KeyboardTest"
            component={KeyboardTest}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ChatMain"
            component={ChatMain}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
