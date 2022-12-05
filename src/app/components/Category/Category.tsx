/* eslint-disable react-native/no-inline-styles */
import { SPACE, appStyle, FONT_SIZE } from "@app/styles";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import FastImage from "react-native-fast-image";
import React from "react";
import type { CategoryModel } from "@core/models/CategoryModel";
import { BlankSpacer } from "../BlankSpacer";
import { BPText } from "../BPText";

export const Category = (props: { data: CategoryModel }) => {
  const { data } = props;
  const { width } = useWindowDimensions();
  return (
    <TouchableOpacity
      style={[
        {
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: SPACE.spacing12,
          borderColor: "red",
        },
        appStyle.shadowContainer,
      ]}
    >
      <View
        style={[
          appStyle.centerContainer,
          {
            width: width / 2 - 20,
            height: width / 2 - 100,
          },
          appStyle.shadowContainer,
        ]}
      >
        <FastImage
          source={{ uri: data.CategoryIcon }}
          style={{
            width: 32,
            height: 32,
          }}
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPText textAlign="center" fontSize={FONT_SIZE.fontSize16}>
          {data.CategoryName}
        </BPText>
      </View>
    </TouchableOpacity>
  );
};
