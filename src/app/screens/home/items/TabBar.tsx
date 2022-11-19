/* eslint-disable no-nested-ternary */
import { BPText } from "@app/components";
import { appStyle, COLORS, FONT_SIZE, SPACE } from "@app/styles";
import type { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import React from "react";
import { TouchableOpacity, Animated, ScrollView, View } from "react-native";

export const MyTabBar = (props: MaterialTopTabBarProps) => {
  const { state, descriptors, navigation, position } = props;
  return (
    <View style={appStyle.rowFullWidthLeftContainer}>
      <ScrollView
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
                marginRight: SPACE.spacing12,
                height: 30,
              }}
            >
              <Animated.View
                style={{
                  borderBottomWidth: isFocused ? 3 : 0,
                  borderBottomColor: COLORS.black,
                }}
              >
                <BPText fontSize={FONT_SIZE.fontSize14} fontWeight="600">
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
