/* eslint-disable react-native/no-inline-styles */
import { COLORS, SPACE } from "@app/styles";
import { strings } from "@core";
import { LOCAL_ICONS } from "@core/assets/icons/local_icon";
import React from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import { BlankSpacer } from "../BlankSpacer";
import { BPText } from "../BPText";

export const EmptyScreen = (props: {
  backgroundColor?: string;

  showLogo?: boolean;
}) => {
  const { backgroundColor = COLORS.white, showLogo = false } = props;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FastImage
        source={LOCAL_ICONS.emptyICon}
        style={{ width: 100, height: 100 }}
        resizeMode="contain"
        tintColor={COLORS.secondary.light}
      />
      {showLogo && <BlankSpacer height={SPACE.spacing16} />}
      <BPText color={COLORS.secondary.light}>{strings.empty_data}</BPText>
    </View>
  );
};
