import {View, Button} from 'react-native';
import React from 'react';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import {apiServer} from '../utils/metaData';
import {RESTAPIBuilder} from '../utils/restapiBuilder';

export default function KakaoTest() {
  const signInWithKakao = async () => {
    const result = await KakaoLogin.login().catch(error => {
      console.log(error);
      if (error.code === 'E_CANCELLED_OPERATION') {
        console.log('Login Cancel', error.message);
      } else {
        console.log(`Login Fail(code:${error.code})`, error.message);
      }
    });

    console.log('Login Success', JSON.stringify(result));

    const url = `${apiServer}/oauth/kakao?token=${result?.accessToken}`;
    const {data} = await new RESTAPIBuilder(url, 'POST')
      .build()
      .run()
      .catch(err => {
        console.log(err);
      });

    console.log('loginResult : ', data.accessToken);
  };

  return (
    <View>
      <Button title="로그인" onPress={signInWithKakao} />
    </View>
  );
}
