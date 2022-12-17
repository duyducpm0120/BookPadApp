/* eslint-disable no-nested-ternary */
import { BPText } from "@app/components";
import { appStyle, COLORS, FONT_SIZE, SPACE } from "@app/styles";
import type { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import React, { useEffect } from "react";
import { TouchableOpacity, Animated, ScrollView, View } from "react-native";

const HEADER_TAB_WIDTH = 80;
const MARGIN_RIGHT = 24;

export const MyTabBar = (props: MaterialTopTabBarProps) => {
  const { state, descriptors, navigation, position } = props;
  const scrollViewRef = React.useRef<ScrollView>(null);
  useEffect(() => {
    const { index } = state;
    const offset = index * HEADER_TAB_WIDTH + (index - 1) * MARGIN_RIGHT;
    scrollViewRef.current?.scrollTo({ x: offset, animated: true });
  }, [state, state.index, state.key, state.routes]);
  return (
    <View style={appStyle.rowFullWidthLeftContainer}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexDirection: "row" }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({
                name: route.name,
                merge: true,
                params: { ...route.params },
              });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_, i) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
          });

          return (
            <TouchableOpacity
              key={-index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                marginRight: SPACE.spacing24,
                flexDirection: "row",
                height: 50,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Animated.View
                style={{
                  borderBottomWidth: isFocused ? 3 : 0,
                  borderBottomColor: COLORS.black,
                  paddingBottom: SPACE.spacing4,
                }}
              >
                <BPText
                  fontSize={FONT_SIZE.fontSize14}
                  fontWeight={isFocused ? "600" : "300"}
                >
                  {label}
                </BPText>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
