/// <reference types="nativewind/types" />

import React from 'react';
import {SafeAreaView} from 'react-native';

import {NativeBaseProvider, Text} from 'native-base';

function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <SafeAreaView className="flex-1">
        <Text>test</Text>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

export default App;
