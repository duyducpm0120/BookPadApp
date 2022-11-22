/* eslint-disable react-native/no-inline-styles */
import { appStyle, FONT_SIZE, SPACE, TEXT_COLOR } from "@app/styles";
import { BookModel } from "@core";
import { getBookAuthor } from "@core/utils/BookUtils";
import React from "react";
import { TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { BlankSpacer } from "../BlankSpacer";
import { BPText } from "../BPText";

export const Book = (props: { data: BookModel; onPress?: () => void }) => {
  const { data = BookModel.instantiate({}), onPress = () => {} } = props;
  const {
    Authors,
    BookCoverImage,
    BookDescription,
    BookId,
    BookName,
    BookPublisher,
    CreatedAt,
    Languages,
    PublishedAt,
  } = data;
  return (
    <TouchableOpacity
      style={[
        appStyle.columnLeftContainer,
        {
          width: 140,
          marginRight: SPACE.spacing16,
          justifyContent: "flex-start",
        },
      ]}
      onPress={onPress}
    >
      <FastImage
        source={{ uri: BookCoverImage, priority: FastImage.priority.normal }}
        style={{
          height: 190,
          width: "100%",
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <BlankSpacer height={SPACE.spacing12} />
      <BPText
        fontSize={FONT_SIZE.fontSize16}
        fontWeight="600"
        style={{
          bottom: 0,
        }}
        numberOfLines={1}
      >
        {BookName}
      </BPText>
      <BlankSpacer height={SPACE.spacing4} />
      <BPText
        fontSize={FONT_SIZE.fontSize12}
        color={TEXT_COLOR.light}
        numberOfLines={1}
      >
        {getBookAuthor(data)}
        {/* Nguyen Du */}
      </BPText>
    </TouchableOpacity>
  );
};
