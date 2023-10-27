import {
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import React, {useCallback} from 'react';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import {apiServer} from '../utils/metaData';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

export default function Login({navigation}: any) {
  useFocusEffect(
    useCallback(() => {
      checkIsLogin();
    }, []),
  );
  const checkIsLogin = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData == null) {
      return;
    }

    const url = `${apiServer}/myid`;
    const result = await new RESTAPIBuilder(url, 'GET')
      .setNeedToken(true)
      .build()
      .run();

    if (result) {
      console.log('verify Result : ', result);
      navigation.navigate('BottomTab');
    } else {
      await AsyncStorage.removeItem('userData');
    }
  };
  const signInWithApple = async () => {
    console.log('연결 필요');
  };
  const signInWithKakao = async () => {
    const result = await KakaoLogin.login().catch(error => {
      console.log(error);
      if (error.code === 'E_CANCELLED_OPERATION') {
        console.log('Login Cancel', error.message);
      } else {
        console.log(`Login Fail(code:${error.code})`, error.message);
      }
      return;
    });

    if (!result) {
      return;
    }

    const url = `${apiServer}/oauth/kakao?token=${result?.accessToken}`;
    const {data} = await new RESTAPIBuilder(url, 'POST')
      .build()
      .run()
      .catch(err => {
        console.log(err);
      });
    console.log('Login Success');
    const tokenData = {
      userId: data.userId,
      accessToken: data.accessToken,
    };
    await AsyncStorage.setItem('userData', JSON.stringify(tokenData));
    await navigation.navigate('BottomTab');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{
          uri: 'https://kiwes-bucket.s3.ap-northeast-2.amazonaws.com/main/loginImg.png',
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Pressable
        onPress={() => {
          Platform.OS === 'ios' ? signInWithApple() : signInWithKakao();
        }}>
        <Image
          source={{
            uri: `https://kiwes-bucket.s3.ap-northeast-2.amazonaws.com/main/${
              Platform.OS === 'ios' ? 'apple_login' : 'kakao_login'
            }.png`,
          }}
          style={styles.kakao}
          resizeMode="contain"
        />
      </Pressable>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    aspectRatio: 1,
    width: '100%',
  },
  kakao: {
    aspectRatio: 2,
    width: '80%',
  },
});
