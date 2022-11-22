/* eslint-disable react-native/no-inline-styles */
import { appStyle, FONT_SIZE, SPACE, TEXT_COLOR } from "@app/styles";
import { BookModel } from "@core";
import { LOCAL_ICONS } from "@core/assets/images/img";
import { getBookAuthor } from "@core/utils/BookUtils";
import React from "react";
import { TouchableOpacity, View } from "react-native";
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
    ReviewStars,
  } = data;
  return (
    <TouchableOpacity
      style={[
        appStyle.columnLeftContainer,
        {
          width: 140,
          marginRight: SPACE.spacing16,
          justifyContent: "flex-start",
          overflow: "hidden",
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
      <View style={appStyle.rowFullWidthSpaceBetweenContainer}>
        <BPText
          fontSize={FONT_SIZE.fontSize12}
          color={TEXT_COLOR.light}
          numberOfLines={1}
        >
          {getBookAuthor(data)}
          {/* Nguyen Du */}
        </BPText>
      </View>
      <View style={appStyle.rowLeftContainer}>
        <BPText fontSize={FONT_SIZE.fontSize14} color={TEXT_COLOR.light}>
          {`${ReviewStars}`}
        </BPText>
        <BlankSpacer width={SPACE.spacing4} />
        <FastImage
          source={LOCAL_ICONS.fullStar}
          style={{
            height: 15,
            width: 15,
            marginRight: 5,
          }}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};
