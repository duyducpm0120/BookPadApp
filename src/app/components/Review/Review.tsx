/* eslint-disable react-native/no-inline-styles */
import { SPACE, appStyle, FONT_SIZE, COLORS } from "@app/styles";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import React from "react";
import type { ReviewModel } from "@core/models/ReviewModel";
import { Avatar } from "react-native-paper";
import { renderBookStars } from "@core/utils/BookUtils";
import { strings } from "@core";
import { BlankSpacer } from "../BlankSpacer";
import { BPText } from "../BPText";

export const Review = (props: {
  data: ReviewModel;
  showDelete?: boolean;
  onPressDelete?: () => void;
}) => {
  const { data, showDelete = false, onPressDelete = () => {} } = props;
  const { width } = useWindowDimensions();

  const deleteComp = () => {
    return (
      <TouchableOpacity
        style={{
          position: "absolute",
          right: SPACE.spacing12,
          top: SPACE.spacing12,
        }}
        onPress={onPressDelete}
      >
        <BPText fontSize={FONT_SIZE.fontSize10} color={COLORS.secondary.main}>
          {strings.delete}
        </BPText>
      </TouchableOpacity>
    );
  };

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
      {showDelete && deleteComp()}
    </View>
  );
};
