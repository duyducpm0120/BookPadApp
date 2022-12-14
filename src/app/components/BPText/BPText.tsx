/* eslint-disable react-native/no-inline-styles */
import { COLORS, FONT_FAMILY, FONT_SIZE } from "@app/styles";
import React from "react";
import { Text } from "react-native";
import type { BPTextProps } from "./types";

export const BPText: React.FC<BPTextProps> = (
  props: BPTextProps
): JSX.Element => {
  const {
    style = {},
    fontSize = FONT_SIZE.fontSize24,
    textAlign,
    color = COLORS.black,
    fontWeight = undefined,
    ...rest
  } = props;
  const textStyle = typeof style === "object" ? style : {};
  return (
    <Text
      style={[
        {
          fontFamily: FONT_FAMILY.Montserrat,
          fontSize,
          textAlign,
          color,
          fontWeight,
          flexWrap: "wrap",
        },
        { ...textStyle },
      ]}
      {...rest}
    />
  );
};
