/* eslint-disable react-native/no-inline-styles */
import { appStyle, COLORS, FONT_SIZE, SPACE, TEXT_COLOR } from "@app/styles";
import type { BookAuthor } from "@core";
import { Animated, TouchableOpacity, View } from "react-native";
import React from "react";
import { LOCAL_ICONS } from "@core/assets/icons/local_icon";
import { BPText } from "../BPText";
import { BPIconButton } from "../BPIconButton";

export const Author = (props: { data: BookAuthor }) => {
  const { data } = props;
  const [isShowDetail, setIsShowDetail] = React.useState(false);
  const showDetailAnimated = React.useRef(new Animated.Value(0)).current;
  const iconDegree = showDetailAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: ["90deg", "-90deg"],
  });
  const detailViewHeight = showDetailAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300],
  });

  const detailViewOpacity = showDetailAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const onShowDetail = () => {
    setIsShowDetail(!isShowDetail);
    Animated.timing(showDetailAnimated, {
      toValue: isShowDetail ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  return (
    <TouchableOpacity
      style={[
        appStyle.columnLeftContainer,
        // appStyle.shadowContainer,
        { marginBottom: SPACE.spacing32 },
      ]}
    >
      <View
        style={[
          appStyle.rowFullWidthSpaceBetweenContainer,
          { overflow: "hidden" },
        ]}
      >
        <BPText fontSize={FONT_SIZE.fontSize18}>{data.AuthorName}</BPText>
        <BPIconButton
          icon={LOCAL_ICONS.rightArrowIcon}
          size={SPACE.spacing24}
          iconColor={COLORS.black}
          onPress={() => {
            onShowDetail();
          }}
          useAnimated
          style={{
            transform: [{ rotate: iconDegree }],
          }}
        />
      </View>
      <Animated.View
        style={[
          appStyle.rowFullWidthLeftContainer,
          {
            overflow: "hidden",
            opacity: detailViewOpacity,
            maxHeight: detailViewHeight,
          },
        ]}
      >
        <BPText fontSize={FONT_SIZE.fontSize12} color={TEXT_COLOR.light}>
          {data.AuthorDescription}
        </BPText>
      </Animated.View>
    </TouchableOpacity>
  );
};
