/* eslint-disable react-native/no-inline-styles */
import { appStyle, COLORS, FONT_SIZE, SPACE, TEXT_COLOR } from "@app/styles";
import { BookModel } from "@core";
import { LOCAL_ICONS } from "@core/assets/icons/local_icon";
import { getBookAuthor, renderBookStars } from "@core/utils/BookUtils";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { BlankSpacer } from "../BlankSpacer";
import { BPText } from "../BPText";
import type { BookPropsType } from "./type";

export const Book = (props: BookPropsType) => {
  const {
    data = BookModel.instantiate({}),
    onPress = () => {},
    readingData = {
      isShowReadingStatus: false,
      readingStatus: 0,
    },
    isHorizontal = false,
  } = props;
  const renderReadingPercent = () => {
    if (readingData.isShowReadingStatus) {
      return (
        <>
          <View
            style={{
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              backgroundColor: COLORS.secondary.light,
              justifyContent: "center",
              alignItems: "flex-start",
              width: "70%",
              borderRadius: 20,
            }}
          >
            <View
              style={{
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                backgroundColor: COLORS.primary.dark,
                justifyContent: "center",
                alignItems: "center",
                width: `${readingData.readingStatus}%`,
                borderRadius: 20,
              }}
            />
          </View>
          <BPText fontSize={FONT_SIZE.fontSize12} color={TEXT_COLOR.light}>
            {readingData.readingStatus}%
          </BPText>
        </>
      );
    }
    return null;
  };

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

  if (isHorizontal) {
    return (
      <TouchableOpacity
        style={[
          appStyle.rowFullWidthLeftContainer,
          {
            width: "100%",
            height: 150,
            marginBottom: SPACE.spacing16,
            justifyContent: "flex-start",
            overflow: "hidden",
          },
        ]}
        onPress={onPress}
      >
        <FastImage
          source={{ uri: BookCoverImage, priority: FastImage.priority.normal }}
          style={{
            height: "100%",
            width: 100,
            ...appStyle.shadowContainer,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <BlankSpacer width={SPACE.spacing24} />
        <View
          style={[
            appStyle.columnTopLeftContainer,
            {
              flex: 1,
            },
          ]}
        >
          <BPText
            fontSize={FONT_SIZE.fontSize20}
            fontWeight="600"
            numberOfLines={2}
            style={{
              flexWrap: "wrap",
            }}
          >
            {BookName.trim()}
          </BPText>
          <BlankSpacer height={SPACE.spacing4} />
          <View style={appStyle.rowFullWidthSpaceBetweenContainer}>
            <BPText
              fontSize={FONT_SIZE.fontSize14}
              color={TEXT_COLOR.light}
              numberOfLines={1}
            >
              {getBookAuthor(data)}
              {/* Nguyen Du */}
            </BPText>
          </View>
          <BlankSpacer height={SPACE.spacing12} />
          <View style={appStyle.rowFullWidthLeftContainer}>
            {renderBookStars(data.ReviewStars)}
            <BlankSpacer width={SPACE.spacing4} />
            <BPText fontSize={FONT_SIZE.fontSize14} color={TEXT_COLOR.light}>
              {`${ReviewStars}/5`}
            </BPText>
          </View>
          <View style={appStyle.rowFullWidthSpaceBetweenContainer}>
            {renderReadingPercent()}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
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
      <View style={appStyle.rowFullWidthSpaceBetweenContainer}>
        {renderReadingPercent()}
      </View>
    </TouchableOpacity>
  );
};
