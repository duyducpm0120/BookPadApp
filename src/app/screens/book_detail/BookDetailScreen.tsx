/* eslint-disable react-native/no-inline-styles */
import { BaseScreen, BlankSpacer, BPText, CategoryTag } from "@app/components";
import { appStyle, COLORS, FONT_SIZE, SPACE, TEXT_COLOR } from "@app/styles";
import { strings, useGlobalLoading, useGlobalNavigation } from "@core";
import { LOCAL_ICONS } from "@core/assets/icons/local_icon";
import { getBookAuthor, renderBookStars } from "@core/utils/BookUtils";
import React from "react";
import { ScrollView, View } from "react-native";
import FastImage from "react-native-fast-image";
import { useViewModel } from "./BookDetailScreen.ViewModel";

import type { BookDetailScreenProps } from "./types";

export const BookDetailScreen: React.FC<any> = (
  props: BookDetailScreenProps
) => {
  const { navigation, route } = props;
  const { bookData } = route.params;
  const { BookCoverImage, BookDescription, BookName, ReviewStars } = bookData;
  const {
    fetchBookDownLoadLink,
    isBookInLibrary,
    removeBookFromUserLibrary,
    addBookToUserLibrary,
  } = useViewModel({ bookData });
  const { navigateToReadingBookScreen, navigateToReviewScreen } =
    useGlobalNavigation();
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();

  const getBookLinkAndNavigate = async () => {
    showGlobalLoading();
    const link = await fetchBookDownLoadLink();
    if (link !== "")
      navigateToReadingBookScreen({ bookData, bookDownLoadLink: link });
    hideGlobalLoading();
  };

  return (
    <BaseScreen
      tittle={strings.book_detail}
      primaryButtonParams={{
        title: strings.read,
        onPress: async () => {
          getBookLinkAndNavigate();
        },
      }}
      secondaryButtonParams={{
        title: strings.reviews,
        onPress: async () => {
          navigateToReviewScreen({
            bookData,
          });
        },
      }}
      headerRightParams={{
        icon: LOCAL_ICONS.bookmarkIcon,
        iconColor: isBookInLibrary() ? COLORS.primary.dark : COLORS.black,
        onPress: async () => {
          if (isBookInLibrary()) {
            showGlobalLoading();
            await removeBookFromUserLibrary(bookData.BookId);
            hideGlobalLoading();
          } else {
            showGlobalLoading();
            await addBookToUserLibrary(bookData.BookId);
            hideGlobalLoading();
          }
        },
      }}
    >
      <ScrollView
        style={[appStyle.containerPadding16]}
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
            {renderBookStars(bookData.ReviewStars)}
            <BlankSpacer width={SPACE.spacing4} />
            <BPText fontSize={FONT_SIZE.fontSize14} color={TEXT_COLOR.light}>
              {`${ReviewStars}/5`}
            </BPText>
          </View>
          <BlankSpacer height={SPACE.spacing8} />
          <View
            style={[
              appStyle.rowFullWidthCenterContainer,
              {
                maxWidth: "80%",
                flexWrap: "wrap",
              },
            ]}
          >
            {bookData.Categories.map((item, index) => {
              return (
                <View key={-index}>
                  <CategoryTag category={item.CategoryName} />
                </View>
              );
            })}
          </View>
          <BlankSpacer height={SPACE.spacing8} />
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
    </BaseScreen>
  );
};
