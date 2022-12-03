/* eslint-disable react-native/no-inline-styles */
import { COLORS, FONT_FAMILY, RADIUS } from "@app/styles";
import React from "react";
import { Button } from "react-native-paper";
import type { BPButtonProps } from "./types";

export const BPButton: React.FC<BPButtonProps> = (
  props: BPButtonProps
): JSX.Element => {
  const {
    icon,
    type = "contained",
    title,
    color = COLORS.primary.main,
    textColor = COLORS.white,
    onPress,
    uppercase = false,
    style = {},
    width = 180,
    height = 50,
    labelStyle = {},
  } = props;
  return (
    <Button
      icon={icon}
      mode={type}
      onPress={onPress}
      uppercase={uppercase}
      textColor={textColor}
      buttonColor={color}
      style={{
        ...style,
        width,
        height,
        borderRadius: RADIUS.radius8,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor:
          type === "outlined" ? COLORS.primary.main : COLORS.primary.main,
        backgroundColor: COLORS.white,
      }}
      contentStyle={{
        width,
        height,
        backgroundColor:
          type === "outlined" ? COLORS.transparent : COLORS.primary.main,
        borderRadius: RADIUS.radius8,
      }}
      labelStyle={{
        fontFamily: FONT_FAMILY.Montserrat,
        ...labelStyle,
        color: type === "outlined" ? COLORS.primary.dark : COLORS.white,
      }}
    >
      {title}
    </Button>
  );
};
