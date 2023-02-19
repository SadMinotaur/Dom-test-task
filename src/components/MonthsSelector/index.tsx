import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import styles from './styles';
import topButtons from './topButtons.json';

const MonthsCollection = [...Array(12)].map((_, i) => {
  const date = new Date();
  date.setMonth(i);
  return {
    short: date.toLocaleDateString('ru', {month: 'short'}).slice(0, 1),
    long: date.toLocaleDateString('ru'),
  };
});

type TopBarStates = (typeof topButtons)[number]['name'];

export default function MonthsSelector(): React.ReactElement {
  const [topBarActive, setTopBarActive] = React.useState<TopBarStates>(
    topButtons?.[0]?.name,
  );

  const onTopBarPress = (tab: TopBarStates) => () => setTopBarActive(tab);

  return (
    <>
      <View style={styles.grayContainer}>
        {topButtons.map(item => {
          const containerStyles: StyleProp<ViewStyle> = [
            styles.topButtonContainer,
          ];
          const textStyles: StyleProp<TextStyle> = [styles.topBarText];
          const tabName = item.name;

          if (topBarActive === tabName) {
            containerStyles.push(styles.topButtonActive);
            textStyles.push(styles.topBarTextActive);
          }

          return (
            <TouchableOpacity
              style={containerStyles}
              onPress={onTopBarPress(tabName)}
              key={tabName}
              activeOpacity={0.5}>
              <Text style={textStyles}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={[styles.grayContainer, styles.monthsContainer]}>
        {MonthsCollection.map(item => (
          <View key={item.long} style={[styles.monthContainer]}>
            <Text style={[styles.monthText]}>{item.short}</Text>
          </View>
        ))}
      </View>
    </>
  );
}
