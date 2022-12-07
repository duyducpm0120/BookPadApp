/* eslint-disable react-native/no-inline-styles */
import { SPACE, appStyle, FONT_SIZE, COLORS } from "@app/styles";
import { useWindowDimensions, View } from "react-native";
import React from "react";
import type { ReviewModel } from "@core/models/ReviewModel";
import { Avatar } from "react-native-paper";
import { renderBookStars } from "@core/utils/BookUtils";
import { BlankSpacer } from "../BlankSpacer";
import { BPText } from "../BPText";

export const Review = (props: { data: ReviewModel }) => {
  const { data } = props;
  console.log("data", data);
  const { width } = useWindowDimensions();
  return (
    <View
      style={[
        appStyle.rowFullWidthLeftContainer,
        {
          padding: SPACE.spacing16,
          borderWidth: 0.2,
          width: "100%",
          marginBottom: SPACE.spacing12,
          borderColor: COLORS.primary.main,
        },
      ]}
    >
      <View style={appStyle.columnTopLeftContainer}>
        <View style={appStyle.rowFullWidthLeftContainer}>
          <Avatar.Image
            source={{ uri: data.Owner.ProfilePicUrl }}
            style={{
              width: 24,
              height: 24,
            }}
            size={24}
          />

          <BlankSpacer width={SPACE.spacing8} />
          <BPText
            textAlign="center"
            fontSize={FONT_SIZE.fontSize14}
            fontWeight="500"
          >
            {data.Owner.NickName}
          </BPText>
        </View>
        <BlankSpacer height={SPACE.spacing8} />
        <View style={appStyle.rowFullWidthLeftContainer}>
          {renderBookStars(data.BookReviewScore)}
        </View>
        <BlankSpacer height={SPACE.spacing8} />
        <BPText
          textAlign="center"
          fontSize={FONT_SIZE.fontSize14}
          numberOfLines={2}
        >
          {data.BookReviewComment}
        </BPText>
      </View>
    </View>
  );
};
