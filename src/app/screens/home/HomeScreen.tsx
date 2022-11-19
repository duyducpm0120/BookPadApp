/* eslint-disable no-nested-ternary */
/* eslint-disable react/react-in-jsx-scope */
import { appStyle, COLORS, SPACE } from "@app/styles";
import { AppTabEnum, ICONS } from "@core";
import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useViewModel } from "./HomeScreen.ViewModel";
import { HomeTab } from "./items";
import { styles } from "./styles";
import type { HomeScreenProps } from "./types";

export const HomeScreen = (props: HomeScreenProps) => {
  const { selectors, handlers } = useViewModel({});
  const { setGlobalCurrentTab } = handlers;
  const { CURRENT_TAB } = selectors;

  const getTabColor = (tab: AppTabEnum) => {
    return tab === CURRENT_TAB ? COLORS.primary.dark : COLORS.secondary.light;
  };

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
        <IconButton
          icon={{ uri: ICONS.home }}
          size={SPACE.spacing24}
          iconColor={getTabColor(AppTabEnum.HOME)}
          style={{ margin: 0 }}
          onPress={() => {
            setGlobalCurrentTab(AppTabEnum.HOME);
          }}
        />
        <IconButton
          icon={{ uri: ICONS.bookMark }}
          size={SPACE.spacing24}
          iconColor={getTabColor(AppTabEnum.BOOK_SELF)}
          style={{ margin: 0 }}
          onPress={() => {
            setGlobalCurrentTab(AppTabEnum.BOOK_SELF);
          }}
        />
        <IconButton
          icon={{ uri: ICONS.user }}
          size={SPACE.spacing24}
          iconColor={getTabColor(AppTabEnum.USER)}
          style={{ margin: 0 }}
          onPress={() => {
            setGlobalCurrentTab(AppTabEnum.USER);
          }}
        />
        <IconButton
          icon={{ uri: ICONS.chat }}
          size={SPACE.spacing24}
          iconColor={getTabColor(AppTabEnum.CHAT_BOT)}
          style={{ margin: 0 }}
          onPress={() => {
            setGlobalCurrentTab(AppTabEnum.CHAT_BOT);
          }}
        />
      </View>
    </SafeAreaView>
  );
};
