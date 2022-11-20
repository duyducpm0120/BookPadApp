/* eslint-disable react-native/no-inline-styles */
import { appStyle, FONT_SIZE, SPACE, TEXT_COLOR } from "@app/styles";
import { BookModel } from "@core";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
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
      <Image
        source={{ uri: BookCoverImage }}
        style={{
          height: 190,
          width: "100%",
          borderRadius: 8,
        }}
        resizeMode="cover"
      />
      <BlankSpacer height={SPACE.spacing12} />
      <BPText
        fontSize={FONT_SIZE.fontSize16}
        fontWeight="600"
        style={{
          minHeight: 40,
          maxHeight: 40,
        }}
        numberOfLines={2}
      >
        {BookName}
      </BPText>
      <BlankSpacer height={SPACE.spacing4} />
      <BPText fontSize={FONT_SIZE.fontSize12} color={TEXT_COLOR.light}>
        {/* {size(Authors) > 0 ? Authors[0].AuthorName : ""} */}
        Nguyen Du
      </BPText>
    </TouchableOpacity>
  );
};
