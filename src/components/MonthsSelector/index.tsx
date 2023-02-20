import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import styles from './styles';
import TopButtons from './topButtons.json';
import {
  monthPercent,
  MonthsCollection,
  selectMonths as calculateArrayMonths,
  springConfig,
} from './utils';

type TopBarStates = (typeof TopButtons)[number];

interface Props {
  initialMonths?: [number, number];
  onChange?: () => [number, number];
}

export default function MonthsSelector({
  initialMonths,
  onChange,
}: Props): React.ReactElement {
  const [topBarActive, setTopBarActive] = React.useState<TopBarStates>(
    TopButtons?.[1],
  );
  const [selectedMonths, setSelectedMonths] = React.useState<number[]>(
    calculateArrayMonths(
      initialMonths
        ? {start: initialMonths[0], end: initialMonths[1]}
        : {end: topBarActive.baseMonthCount},
    ),
  );

  const activeMonthWidth = useSharedValue(selectedMonths.length);
  const leftOffset = useSharedValue(0);

  const activeMonthSpring = useAnimatedStyle(() => ({
    width: `${monthPercent * activeMonthWidth.value}%`,
    left: `${monthPercent * leftOffset.value}%`,
  }));

  const onTopBarPress = (tab: TopBarStates) => (): void => {
    setSelectedMonths(calculateArrayMonths({end: tab.baseMonthCount}));
    setTopBarActive(tab);
    leftOffset.value = 0;
    activeMonthWidth.value = withSpring(tab.baseMonthCount, springConfig);
  };

  const onButtonPress =
    (month: (typeof MonthsCollection)[number]) => (): void => {
      if (month.number + activeMonthWidth.value > MonthsCollection.length) {
        const start = MonthsCollection.length - activeMonthWidth.value;
        setSelectedMonths(
          calculateArrayMonths({
            start,
            end: MonthsCollection.length,
          }),
        );
        leftOffset.value = withSpring(start, springConfig);
      } else {
        leftOffset.value = withSpring(month.number, springConfig);
      }
    };

  return (
    <>
      <View style={styles.grayContainer}>
        {TopButtons.map(topButton => {
          const containerStyles: StyleProp<ViewStyle> = [
            styles.topButtonContainer,
          ];
          const textStyles: StyleProp<TextStyle> = [styles.topBarText];
          const tabName = topButton.name;
          if (topBarActive.name === tabName) {
            containerStyles.push(styles.topButtonActive);
            textStyles.push(styles.topBarTextActive);
          }
          return (
            <TouchableOpacity
              style={containerStyles}
              onPress={onTopBarPress(topButton)}
              key={tabName}
              activeOpacity={0.5}>
              <Text style={textStyles}>{topButton.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={[styles.grayContainer, styles.monthsContainer]}>
        {MonthsCollection.map(month => (
          <View
            key={month.long}
            style={[styles.monthContainer]}
            onTouchEnd={onButtonPress(month)}>
            <Text style={[styles.monthText]}>{month.short}</Text>
          </View>
        ))}
        <Animated.View style={[styles.monthActive, activeMonthSpring]} />
      </View>
    </>
  );
}
