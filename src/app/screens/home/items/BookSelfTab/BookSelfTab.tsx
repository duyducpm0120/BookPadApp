import { BlankSpacer, Book, BPText, Loading } from "@app/components";
import { appStyle, COLORS, FONT_SIZE, SPACE } from "@app/styles";
import type { BookModel } from "@core";
import { strings, ICONS, useGlobalNavigation, BookLibrarySection } from "@core";
import { isNil } from "lodash";
import React, { useCallback } from "react";
import { FlatList, SectionList, View } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { useViewModel } from "./BookSelfTab.ViewModel";

export const BookSelfTab = () => {
  const { selectors, handlers } = useViewModel();
  const { removeBookFromUserLibrary } = handlers;
  const { USER_INFO, BOOK_LIBRARY_LIST, sectionData } = selectors;
  const { navigateToBookDetailScreen } = useGlobalNavigation();
  const renderUserAndSearchBar = () => {
    return (
      <View
        style={[
          appStyle.rowFullWidthSpaceBetweenContainer,
          // { backgroundColor: "red" },
        ]}
      >
        <View style={[appStyle.rowLeftContainer]}>
          <Avatar.Image
            source={{ uri: USER_INFO.ProfilePicUrl }}
            size={SPACE.spacing40}
            style={{ backgroundColor: COLORS.white }}
          />
          <BlankSpacer width={SPACE.spacing12} />
          <BPText
            fontSize={FONT_SIZE.fontSize14}
            fontWeight="600"
          >{`${strings.hello}, ${USER_INFO.NickName}`}</BPText>
        </View>
        <IconButton
          icon={{ uri: ICONS.search }}
          size={SPACE.spacing24}
          iconColor={COLORS.black}
          style={{ margin: 0 }}
          onPress={() => {
            console.log("search");
          }}
        />
      </View>
    );
  };
  const renderList = useCallback(
    (data: BookModel[], type: BookLibrarySection) => {
      return (
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${item.BookId} + ${index}`}
          renderItem={({ item }) => (
            <Book
              data={item}
              onPress={() => {
                navigateToBookDetailScreen({ bookData: item });
              }}
              isHorizontal={type === BookLibrarySection.WISH_LISTED_BOOKS}
              readingData={{
                isShowReadingStatus: type === BookLibrarySection.READING,
                readingStatus: item.ReadPercentage,
              }}
            />
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal={type === BookLibrarySection.READING}
        />
      );
    },
    [navigateToBookDetailScreen]
  );

  return (
    <View style={appStyle.container}>
      {renderUserAndSearchBar()}
      <BlankSpacer height={SPACE.spacing16} />
      {isNil(BOOK_LIBRARY_LIST) ? (
        <Loading isLoading />
      ) : (
        <SectionList
          sections={sectionData}
          keyExtractor={(item, index) => `${item.BookId} + ${index}`}
          renderItem={({ item }) => null}
          renderSectionHeader={({ section: { title, data } }) => (
            <>
              <BPText fontSize={FONT_SIZE.fontSize24} fontWeight="bold">
                {title}
              </BPText>
              <BlankSpacer height={SPACE.spacing12} />
              {renderList(data, title)}
              <BlankSpacer height={SPACE.spacing16} />
            </>
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <BlankSpacer height={50} />}
        />
      )}
    </View>
  );
};
