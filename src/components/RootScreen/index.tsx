import React from 'react';
import MonthsSelector from '../MonthsSelector';
import {View} from 'react-native';
import styles from './styles';

// Months count from zero
export default function RootScreen(): React.ReactElement {
  return (
    <View style={styles.screenPadding}>
      <MonthsSelector
        initialMonths={[0, 11]}
        onChange={arr => {
          console.log('[start end]', arr);
        }}
      />
    </View>
  );
}
