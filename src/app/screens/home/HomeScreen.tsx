/* eslint-disable no-nested-ternary */
/* eslint-disable react/react-in-jsx-scope */
import { appStyle, COLORS, SPACE } from "@app/styles";
import { ICONS } from "@core";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useViewModel } from "./HomeScreen.ViewModel";
import { HomeTab } from "./items";
import { styles } from "./styles";
import type { HomeScreenProps } from "./types";

const Tab = createMaterialTopTabNavigator();

export const HomeScreen = (props: HomeScreenProps) => {
  const { selectors } = useViewModel({});
  const { USER_INFO, BOOKS } = selectors;

  return (
    <SafeAreaView style={[appStyle.containerPadding16]}>
      <HomeTab />
      <View
        style={[
          appStyle.rowFullWidthLeftContainer,
          styles.bottomTabContainer,
          appStyle.shadowContainer,
        ]}
      >
        {[0, 1, 2, 3].map((item, index) => (
          <IconButton
            key={-index}
            icon={{ uri: ICONS.search }}
            size={SPACE.spacing24}
            iconColor={COLORS.black}
            style={{ margin: 0 }}
            onPress={() => {
              console.log("search");
            }}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};
