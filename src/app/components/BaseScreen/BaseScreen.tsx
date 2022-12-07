/* eslint-disable react-native/no-inline-styles */
import { appStyle, COLORS, FONT_SIZE, SPACE } from "@app/styles";
import { useGlobalNavigation } from "@core";
import { LOCAL_ICONS } from "@core/assets/icons/local_icon";
import React, { useMemo } from "react";
import { SafeAreaView, useWindowDimensions, View } from "react-native";
import { BPButton } from "../BPButton";
import { BPIconButton } from "../BPIconButton";
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
      iconColor: COLORS.black,
    },
    headerRightParams = null,
    primaryButtonParams = null,
    secondaryButtonParams = null,
    headerType = "normal",
    headerFloating = false,
    useHeaderPadding = false,
    headerComponent = null,
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
    <SafeAreaView style={[appStyle.container]}>
      <View style={[appStyle.container]}>
        <View
          style={[
            appStyle.rowSpaceBetweenContainer,
            {
              backgroundColor:
                headerType === "transparent"
                  ? COLORS.transparent
                  : COLORS.white,
              position: headerFloating ? "absolute" : "relative",
              zIndex: 1,
              paddingTop: SPACE.spacing12,
              width: "100%",
              alignItems: "center",
            },
          ]}
        >
          <BPIconButton
            icon={headerLeftParams.icon}
            size={SPACE.spacing24}
            iconColor={headerLeftParams.iconColor}
            onPress={() => {
              goBack();
            }}
            style={{ marginLeft: SPACE.spacing16 }}
          />
          {headerComponent || (
            <BPText fontSize={FONT_SIZE.fontSize16} fontWeight="600">
              {tittle}
            </BPText>
          )}
          {headerRightParams ? (
            <BPIconButton
              icon={headerRightParams.icon}
              size={SPACE.spacing24}
              iconColor={headerRightParams.iconColor}
              onPress={headerRightParams.onPress}
              style={{
                marginRight: SPACE.spacing16,
              }}
            />
          ) : (
            <BPIconButton
              icon={LOCAL_ICONS.emptyStar}
              size={SPACE.spacing24}
              iconColor={COLORS.transparent}
              onPress={() => {}}
              style={{
                marginRight: SPACE.spacing16,
              }}
            />
          )}
        </View>
        {useHeaderPadding ? <View style={{ height: 40 }} /> : null}
        {children}
        <View
          style={[
            appStyle.rowFullWidthSpaceAroundContainer,
            // appStyle.shadowContainer,
            {
              backgroundColor: COLORS.transparent,
              position: "absolute",
              bottom: 0,
              paddingHorizontal: SPACE.spacing16,
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
      </View>
    </SafeAreaView>
  );
};
