/* eslint-disable no-nested-ternary */
/* eslint-disable react/react-in-jsx-scope */
import { Loading } from "@app/components";
import { appStyle, COLORS, SPACE } from "@app/styles";
import { AppTabEnum, ICONS } from "@core";
import React, { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useViewModel } from "./HomeScreen.ViewModel";
import { ChatbotTab, HomeTab, ProfileTab } from "./items";
import { BookSelfTab } from "./items/BookSelfTab";
import { styles } from "./styles";
import type { HomeScreenProps } from "./types";

export const HomeScreen: React.FC<HomeScreenProps> = (
  props: HomeScreenProps
) => {
  const { selectors, handlers } = useViewModel({});
  const { setGlobalCurrentTab } = handlers;
  const { CURRENT_TAB, BOOKS } = selectors;

  const [currentTab, setCurrentTab] = useState<AppTabEnum>(AppTabEnum.HOME);

  const getTabColor = (tab: AppTabEnum) => {
    return tab === currentTab ? COLORS.primary.dark : COLORS.secondary.light;
  };
  const renderHomeTab = useMemo(() => {
    return <HomeTab />;
  }, []);
  const renderProfileTab = useMemo(() => {
    return <ProfileTab />;
  }, []);
  const renderBookSelfTab = useMemo(() => {
    return <BookSelfTab />;
  }, []);
  const renderChatbotTab = useMemo(() => {
    return <ChatbotTab />;
  }, []);

  const renderContent = useCallback(() => {
    switch (currentTab) {
      case AppTabEnum.HOME:
        return renderHomeTab;
      case AppTabEnum.USER:
        return renderProfileTab;
      case AppTabEnum.BOOK_SELF:
        return renderBookSelfTab;
      case AppTabEnum.CHAT_BOT:
        return renderChatbotTab;
      default:
        return renderHomeTab;
    }
  }, [
    currentTab,
    renderBookSelfTab,
    renderChatbotTab,
    renderHomeTab,
    renderProfileTab,
  ]);

  if (BOOKS.length === 0) {
    return (
      <Loading isLoading backgroundColor={COLORS.white} opacity={1} showLogo />
    );
  }

  return (
    <SafeAreaView style={[appStyle.containerPadding16]}>
      {renderContent()}
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
            setCurrentTab(AppTabEnum.HOME);
          }}
        />
        <IconButton
          icon={{ uri: ICONS.bookMark }}
          size={SPACE.spacing24}
          iconColor={getTabColor(AppTabEnum.BOOK_SELF)}
          style={{ margin: 0 }}
          onPress={() => {
            setCurrentTab(AppTabEnum.BOOK_SELF);
          }}
        />
        <IconButton
          icon={{ uri: ICONS.user }}
          size={SPACE.spacing24}
          iconColor={getTabColor(AppTabEnum.USER)}
          style={{ margin: 0 }}
          onPress={() => {
            setCurrentTab(AppTabEnum.USER);
          }}
        />
        <IconButton
          icon={{ uri: ICONS.chat }}
          size={SPACE.spacing24}
          iconColor={getTabColor(AppTabEnum.CHAT_BOT)}
          style={{ margin: 0 }}
          onPress={() => {
            setCurrentTab(AppTabEnum.CHAT_BOT);
          }}
        />
      </View>
    </SafeAreaView>
  );
};
