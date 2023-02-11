/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { SPACE, RADIUS, COLORS } from "@app/styles";
import { LOCAL_ICONS } from "@core/assets/icons/local_icon";
import { TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import React from "react";
import { BPText } from "../BPText";
import { BlankSpacer } from "../BlankSpacer";

export const ReviewTag = (props: {
  star: string;
  total: string;
  onPress: () => void;
  isSelect?: boolean;
  hideStar?: boolean;
}) => {
  const {
    onPress = () => {},
    star = 1,
    total = 0,
    isSelect = false,
    hideStar = false,
  } = props;
  return (
    <TouchableOpacity
      style={{
        paddingVertical: SPACE.spacing4,
        paddingHorizontal: SPACE.spacing8,
        borderRadius: RADIUS.radius16,
        borderWidth: 2,
        borderColor: isSelect ? COLORS.primary.main : COLORS.secondary.light,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
      onPress={onPress}
    >
      <BPText fontSize={12}>{star}</BPText>
      <BlankSpacer width={SPACE.spacing2} />
      {!hideStar ? (
        <>
          <FastImage
            source={LOCAL_ICONS.fullStar}
            style={{
              height: 12,
              width: 12,
            }}
            resizeMode="contain"
          />
          <BlankSpacer width={SPACE.spacing2} />
        </>
      ) : null}
      <BPText fontSize={12}>({total})</BPText>
    </TouchableOpacity>
  );
};
