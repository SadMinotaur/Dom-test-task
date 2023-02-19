import React from 'react';
import {SafeAreaView} from 'react-native';
import RootScreen from './src/components/RootScreen';

export default function App(): React.ReactElement {
  return (
    <SafeAreaView>
      <RootScreen />
    </SafeAreaView>
  );
}
