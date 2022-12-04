/* eslint-disable react-native/no-inline-styles */
import { COLORS, SPACE } from "@app/styles";
import { IMAGES } from "@core";
import React from "react";
import { View, ActivityIndicator } from "react-native";
import FastImage from "react-native-fast-image";
import { BlankSpacer } from "../BlankSpacer";

export const Loading = (props: {
  isLoading: boolean;
  backgroundColor?: string;
  opacity?: number;
  showLogo?: boolean;
}) => {
  const {
    isLoading,
    backgroundColor = COLORS.white,
    opacity = 0.6,
    showLogo = false,
  } = props;
  if (isLoading)
    return (
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor,
          opacity,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {showLogo && (
          <FastImage
            source={IMAGES.appName}
            style={{ height: 60, width: "100%" }}
            resizeMode="contain"
          />
        )}
        {showLogo && <BlankSpacer height={SPACE.spacing16} />}
        <ActivityIndicator size="large" color={COLORS.primary.main} />
      </View>
    );
  return <View />;
};
