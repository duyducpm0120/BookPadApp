/* eslint-disable react-native/no-inline-styles */
import { appStyle, COLORS, FONT_SIZE, SPACE } from "@app/styles";
import { useGlobalNavigation } from "@core";
import { LOCAL_ICONS } from "@core/assets/images/img";
import React, { useMemo } from "react";
import { SafeAreaView, useWindowDimensions, View } from "react-native";
import { IconButton } from "react-native-paper";
import { BPButton } from "../BPButton";
import { BPText } from "../BPText";
import type { BaseScreenProps } from "./types";

export const BaseScreen = (props: BaseScreenProps) => {
  const { goBack } = useGlobalNavigation();
  const { width } = useWindowDimensions();
  const {
    tittle,
    children = null,
    headerLeftParams = {
      icon: LOCAL_ICONS.leftArrowIcon,
      onPress: goBack,
    },
    headerRightParams = {
      icon: LOCAL_ICONS.bookmarkIcon,
      onPress: goBack,
    },
    primaryButtonParams = null,
    secondaryButtonParams = null,
  } = props;

  const buttonWidth = useMemo(() => {
    if (primaryButtonParams && secondaryButtonParams) {
      return (width - SPACE.spacing32 - SPACE.spacing12) / 2;
    }
    if (!primaryButtonParams && secondaryButtonParams)
      return width - SPACE.spacing32;
    if (primaryButtonParams && !secondaryButtonParams)
      return width - SPACE.spacing32;
    return 0;
  }, [primaryButtonParams, secondaryButtonParams, width]);
  return (
    <SafeAreaView style={appStyle.containerPadding16}>
      <View
        style={[
          appStyle.rowSpaceBetweenContainer,
          { paddingHorizontal: SPACE.spacing8 },
        ]}
      >
        <IconButton
          icon={headerLeftParams.icon}
          size={SPACE.spacing24}
          iconColor={COLORS.secondary.dark}
          style={{ margin: 0, backgroundColor: COLORS.white }}
          onPress={() => {
            goBack();
          }}
        />
        <BPText fontSize={FONT_SIZE.fontSize16} fontWeight="600">
          {tittle}
        </BPText>
        <IconButton
          icon={headerRightParams.icon}
          size={SPACE.spacing24}
          iconColor={COLORS.black}
          style={{ margin: 0, backgroundColor: COLORS.white }}
          onPress={headerRightParams.onPress}
        />
      </View>
      {children}
      <View
        style={[
          appStyle.rowFullWidthSpaceAroundContainer,
          appStyle.shadowContainer,
          {
            backgroundColor: COLORS.transparent,
            position: "absolute",
            bottom: 30,
          },
        ]}
      >
        {secondaryButtonParams ? (
          <BPButton
            title={secondaryButtonParams.title.toUpperCase()}
            onPress={() => {
              secondaryButtonParams.onPress();
            }}
            type="outlined"
            labelStyle={{
              fontWeight: "600",
            }}
            width={buttonWidth}
          />
        ) : null}
        {primaryButtonParams ? (
          <BPButton
            title={primaryButtonParams.title.toUpperCase()}
            onPress={() => {
              primaryButtonParams.onPress();
            }}
            labelStyle={{
              fontWeight: "600",
            }}
            width={buttonWidth}
            type="contained"
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};
