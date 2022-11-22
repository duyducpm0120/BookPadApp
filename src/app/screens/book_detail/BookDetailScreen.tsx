/* eslint-disable react-native/no-inline-styles */
import { BaseScreen, BlankSpacer, BPButton, BPText } from "@app/components";
import { appStyle, FONT_SIZE, SPACE, TEXT_COLOR } from "@app/styles";
import { strings, useGlobalNavigation } from "@core";
import { getBookAuthor, renderBookStars } from "@core/utils/BookUtils";
import React from "react";
import { ScrollView, View } from "react-native";
import FastImage from "react-native-fast-image";

import type { BookDetailScreenProps } from "./types";

export const BookDetailScreen: React.FC<any> = (
  props: BookDetailScreenProps
) => {
  const { navigation, route } = props;
  console.log("props asdasd", props);
  const { bookData } = route.params;
  const { BookCoverImage, BookDescription, BookName, ReviewStars } = bookData;

  const { navigateToReadingBookScreen } = useGlobalNavigation();

  return (
    <BaseScreen tittle={strings.book_detail}>
      <ScrollView
        style={appStyle.containerPadding16}
        showsVerticalScrollIndicator={false}
      >
        <BlankSpacer height={SPACE.spacing16} />
        <View style={[appStyle.columnCenterContainer]}>
          <View
            style={[
              {
                height: 300,
                overflow: "hidden",
              },
              appStyle.shadowContainer,
            ]}
          >
            <FastImage
              source={{ uri: BookCoverImage }}
              style={[
                {
                  width: 200,
                  height: "100%",
                },
              ]}
              resizeMode="contain"
            />
          </View>
          <BlankSpacer height={SPACE.spacing12} />
          <BPText
            fontSize={FONT_SIZE.fontSize24}
            fontWeight="bold"
            // numberOfLines={2}
            textAlign="center"
          >
            {BookName}
          </BPText>
          <BlankSpacer height={SPACE.spacing4} />
          <BPText fontSize={FONT_SIZE.fontSize14} color={TEXT_COLOR.light}>
            {getBookAuthor(bookData)}
          </BPText>
          <BlankSpacer height={SPACE.spacing4} />
          <View style={appStyle.rowFullWidthCenterContainer}>
            {renderBookStars(bookData)}
            <BlankSpacer width={SPACE.spacing4} />
            <BPText fontSize={FONT_SIZE.fontSize14} color={TEXT_COLOR.light}>
              {`${ReviewStars}/5`}
            </BPText>
          </View>
          <BlankSpacer height={SPACE.spacing16} />
          <BPText
            fontSize={FONT_SIZE.fontSize14}
            color={TEXT_COLOR.light}
            textAlign="left"
            // numberOfLines={3}
          >
            {BookDescription}
          </BPText>
        </View>
        <BlankSpacer height={100} />
      </ScrollView>
      <View
        style={[appStyle.rowFullWidthCenterContainer, appStyle.shadowContainer]}
      >
        <BPButton
          title={strings.read.toUpperCase()}
          onPress={() => {
            navigateToReadingBookScreen();
          }}
          type="text"
          labelStyle={{
            fontWeight: "600",
          }}
        />
      </View>
    </BaseScreen>
  );
};
