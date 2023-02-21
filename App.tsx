import React from 'react';
import {SafeAreaView} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootScreen from './src/components/RootScreen';

export default function App(): React.ReactElement {
  return (
    <SafeAreaView>
      <GestureHandlerRootView>
        <RootScreen />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
