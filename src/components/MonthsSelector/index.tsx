import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import styles from './styles';
import topButtons from './topButtons.json';
import {
  AnimationContext,
  MonthType,
  SelectMonthsArgs,
  TopBarStates,
} from './types';
import {
  monthPercent,
  monthsCollection,
  monthScreenPart,
  springConfig,
} from './utils';

interface Props {
  initialMonths?: [number, number];
  onChange?: (months: [number, number]) => void;
}

export default function MonthsSelector({
  initialMonths,
  onChange,
}: Props): React.ReactElement {
  const [topBarActive, setTopBarActive] = React.useState<TopBarStates>(
    topButtons?.[initialMonths ? 2 : 1],
  );
  const activeMonthWidth = useSharedValue(
    initialMonths
      ? initialMonths[1] - initialMonths[0] + 1
      : topBarActive.baseMonthCount,
  );
  const leftOffset = useSharedValue(initialMonths?.[0] ?? 0);

  const activeMonthSpring = useAnimatedStyle(() => ({
    width: `${monthPercent * activeMonthWidth.value}%`,
    left: `${monthPercent * leftOffset.value}%`,
  }));

  const onAnimEnd = (ar: SelectMonthsArgs) => {
    onChange?.([ar.start ?? 0, ar.end ?? 0]);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: AnimationContext): void => {
      ctx.startValue = activeMonthWidth.value;
    },
    onActive: (event, ctx: AnimationContext): void => {
      const passed = event.translationX / monthScreenPart;
      activeMonthWidth.value = withSpring(
        ctx.startValue + passed,
        springConfig,
      );
    },
    onEnd: (event, ctx: AnimationContext): void => {
      const selectedPart =
        ctx.startValue + Math.round(event.translationX / monthScreenPart);
      const selectedRange =
        selectedPart - (selectedPart % topBarActive.baseMonthCount);
      const afterSelectValue =
        selectedRange >= topBarActive.baseMonthCount
          ? selectedRange
          : topBarActive.baseMonthCount;
      activeMonthWidth.value = withSpring(afterSelectValue, springConfig);
      runOnJS(onAnimEnd)({
        start: leftOffset.value,
        end: leftOffset.value + afterSelectValue - 1,
      });
    },
  });

  const onTopBarPress = (tab: TopBarStates) => (): void => {
    onChange?.([0, tab.baseMonthCount - 1]);
    setTopBarActive(tab);
    leftOffset.value = 0;
    activeMonthWidth.value = withSpring(tab.baseMonthCount, springConfig);
  };

  const onButtonPress = (month: MonthType) => (): void => {
    if (month.number + activeMonthWidth.value > monthsCollection.length) {
      const start = monthsCollection.length - activeMonthWidth.value;
      leftOffset.value = withSpring(start, springConfig);
      onChange?.([start, monthsCollection.length - 1]);
    } else {
      leftOffset.value = withSpring(month.number, springConfig);
      onChange?.([month.number, month.number + activeMonthWidth.value - 1]);
    }
  };

  return (
    <>
      <View style={styles.grayContainer}>
        {topButtons.map(topButton => {
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
        {monthsCollection.map(month => (
          <View
            key={month.long}
            style={[styles.monthTextContainer]}
            onTouchEnd={onButtonPress(month)}>
            <Text style={[styles.monthText]}>{month.short}</Text>
          </View>
        ))}
        <Animated.View
          style={[styles.monthActiveSelector, activeMonthSpring]}
        />
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[
              styles.monthActiveSelector,
              styles.monthActiveSelectorPan,
              activeMonthSpring,
            ]}
          />
        </PanGestureHandler>
      </View>
    </>
  );
}
