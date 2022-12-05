import React from "react";
import type { ImageSourcePropType, ImageStyle } from "react-native";
import { Animated, Image, TouchableOpacity } from "react-native";

export const BPIconButton = (props: {
  icon: ImageSourcePropType;
  size: number;
  iconColor: string;
  onPress: () => void;
  useAnimated?: boolean;
  style?: Animated.WithAnimatedObject<ImageStyle>;
}) => {
  const {
    icon,
    iconColor,
    size = 24,
    onPress,
    style = {},
    useAnimated = false,
  } = props;

  if (useAnimated)
    return (
      <TouchableOpacity onPress={onPress}>
        <Animated.Image
          source={icon}
          style={{
            width: size,
            height: size,
            tintColor: iconColor,
            ...style,
          }}
        />
      </TouchableOpacity>
    );
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={icon}
        style={{
          width: size,
          height: size,
          tintColor: iconColor,
          ...(style as ImageStyle),
        }}
      />
    </TouchableOpacity>
  );
};
