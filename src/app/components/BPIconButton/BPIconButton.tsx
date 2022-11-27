import { SPACE } from "@app/styles";
import React from "react";
import type { ImageSourcePropType } from "react-native";
import { Image, TouchableOpacity } from "react-native";

export const BPIconButton = (props: {
  icon: ImageSourcePropType;
  size: number;
  iconColor: string;

  onPress: () => void;
}) => {
  const { icon, iconColor, size = 24, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={icon}
        style={{
          width: size,
          height: size,
          tintColor: iconColor,
          marginHorizontal: SPACE.spacing8,
        }}
      />
    </TouchableOpacity>
  );
};
