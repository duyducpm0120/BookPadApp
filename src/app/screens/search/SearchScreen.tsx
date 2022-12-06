/* eslint-disable react-native/no-inline-styles */
import { BaseScreen, Book, BPTextInput, EmptyScreen } from "@app/components";
import { appStyle, COLORS } from "@app/styles";
import { strings, useGlobalLoading, useGlobalNavigation } from "@core";
import { LOCAL_ICONS } from "@core/assets/icons/local_icon";
import React, { useCallback } from "react";
import { FlatList, View } from "react-native";
import { useViewModel } from "./SearchScreen.ViewModel";

import type { SearchScreenProps } from "./types";

export const SearchScreen: React.FC<any> = (props: SearchScreenProps) => {
  const { navigation, route } = props;
  // const { bookData } = route.params;
  // const { BookCoverImage, BookDescription, BookName, ReviewStars } = bookData;
  const { searchText, setSearchText, searchBookByName, searchResult } =
    useViewModel({});
  const { navigateToReadingBookScreen } = useGlobalNavigation();
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();

  const renderContent = useCallback(() => {
    return (
      <View style={[appStyle.containerPadding16, { paddingVertical: 0 }]}>
        <FlatList
          data={searchResult}
          keyExtractor={(item, index) => `${item.BookId} + ${index}`}
          renderItem={({ item }) => (
            <Book
              data={item}
              onPress={() => {
                // navigateToBookDetailScreen({ bookData: item });
              }}
              isHorizontal
            />
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <EmptyScreen />}
        />
      </View>
    );
  }, [searchResult]);

  return (
    <BaseScreen
      tittle={strings.book_detail}
      headerRightParams={{
        icon: LOCAL_ICONS.searchIcon,
        iconColor: COLORS.black,
        onPress: async () => {
          // if (isBookInLibrary()) {
          //   showGlobalLoading();
          //   await removeBookFromUserLibrary(bookData.BookId);
          //   hideGlobalLoading();
          // } else {
          //   showGlobalLoading();
          //   await addBookToUserLibrary(bookData.BookId);
          //   hideGlobalLoading();
          // }
          searchBookByName();
        },
      }}
      headerComponent={
        <BPTextInput
          label=""
          placeholder="Search book name"
          style={{
            width: "70%",
            backgroundColor: COLORS.transparent,
            borderBottomColor: COLORS.transparent,
          }}
          activeOutlineColor={COLORS.transparent}
          autoFocus
          type="flat"
          activeUnderlineColor={COLORS.transparent}
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
          }}
        />
      }
    >
      {renderContent()}
    </BaseScreen>
  );
};
