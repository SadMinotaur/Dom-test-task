import React from 'react';
import MonthsSelector from '../MonthsSelector';
import {View} from 'react-native';
import styles from './styles';

export default function RootScreen(): React.ReactElement {
  return (
    <View style={styles.screenPadding}>
      <MonthsSelector />
    </View>
  );
}
