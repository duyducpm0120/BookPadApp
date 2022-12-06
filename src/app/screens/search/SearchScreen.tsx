/* eslint-disable react-native/no-inline-styles */
import {
  BaseScreen,
  BlankSpacer,
  Book,
  BPText,
  BPTextInput,
  EmptyScreen,
} from "@app/components";
import { appStyle, COLORS, FONT_SIZE, SPACE } from "@app/styles";
import { strings, useGlobalNavigation } from "@core";
import { LOCAL_ICONS } from "@core/assets/icons/local_icon";
import React, { useCallback } from "react";
import { FlatList, View } from "react-native";
import { useViewModel } from "./SearchScreen.ViewModel";

import type { SearchScreenProps } from "./types";
import { SearchScreenType } from "./types";

export const SearchScreen: React.FC<any> = (props: SearchScreenProps) => {
  const { navigation, route } = props;
  const { type, keyword = "", id = 0 } = route.params;
  // const { BookCoverImage, BookDescription, BookName, ReviewStars } = bookData;
  const {
    searchText,
    setSearchText,
    searchBookByName,
    searchResult,
    loadMoreBookByName,
    loadMoreBookByCategory,
    loadMoreBookByAuthor,
    isSearched,
  } = useViewModel({ type, id });
  const { navigateToBookDetailScreen } = useGlobalNavigation();

  const renderHeaderComp = useCallback(() => {
    if (type === SearchScreenType.BOOK_NAME)
      return (
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
      );

    return (
      <BPText fontSize={FONT_SIZE.fontSize16} fontWeight="600">
        {keyword}
      </BPText>
    );
  }, [keyword, searchText, setSearchText, type]);

  const loadMoreFunc = useCallback(() => {
    if (type === SearchScreenType.BOOK_NAME) {
      loadMoreBookByName();
    }
    if (type === SearchScreenType.CATEGORY) {
      loadMoreBookByCategory();
    }
    if (type === SearchScreenType.AUTHOR) {
      loadMoreBookByAuthor();
    }
  }, [type, loadMoreBookByName, loadMoreBookByCategory, loadMoreBookByAuthor]);

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
                navigateToBookDetailScreen({ bookData: item });
              }}
              isHorizontal
            />
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (isSearched ? <EmptyScreen /> : null)}
          onEndReached={() => {
            loadMoreFunc();
          }}
          scrollEventThrottle={16}
        />
      </View>
    );
  }, [isSearched, loadMoreFunc, navigateToBookDetailScreen, searchResult]);

  const headerRight = () => {
    if (type === SearchScreenType.BOOK_NAME) {
      return {
        icon: LOCAL_ICONS.searchIcon,
        iconColor: COLORS.black,
        onPress: async () => {
          searchBookByName();
        },
      };
    }
    return undefined;
  };

  return (
    <BaseScreen
      tittle={strings.book_detail}
      headerRightParams={headerRight()}
      headerComponent={renderHeaderComp()}
    >
      <BlankSpacer height={SPACE.spacing12} />
      {renderContent()}
    </BaseScreen>
  );
};
