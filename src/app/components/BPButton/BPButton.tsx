import { COLORS, RADIUS } from "@app/styles";
import React from "react";
import { Button } from "react-native-paper";
import type { BPButtonProps } from "./types";

export const BPButton: React.FC<BPButtonProps> = (
  props: BPButtonProps
): JSX.Element => {
  const {
    icon,
    type,
    title,
    color = COLORS.primary.main,
    textColor = COLORS.white,
    onPress,
    uppercase = false,
    style = {},
    width = "100%",
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
        borderRadius: RADIUS.radius8,
        ...style,
        width,
        height,
      }}
      contentStyle={{
        width,
        height,
      }}
      labelStyle={labelStyle}
    >
      {title}
    </Button>
  );
};
