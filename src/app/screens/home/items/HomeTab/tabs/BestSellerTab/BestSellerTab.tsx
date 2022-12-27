import { BlankSpacer, Book, BPText, Loading } from "@app/components";
import { appStyle, FONT_SIZE, SPACE } from "@app/styles";
import type { BookModel } from "@core";
import { useGlobalNavigation } from "@core";
import React from "react";
import { FlatList, SectionList, useWindowDimensions, View } from "react-native";
import { useViewModel } from "./BestSellerTab.ViewModel";
import { styles } from "./style";
import type { BestSellerTabProps } from "./types";

export const BestSellerTab = (props: BestSellerTabProps) => {
  const { navigateToBookDetailScreen } = useGlobalNavigation();
  // const { books } = props;
  const { selectors } = useViewModel();
  const { sectionData, isLoading } = selectors;
  const { width } = useWindowDimensions();
  const loadingComponent = () => {
    return (
      <>
        <BlankSpacer height={SPACE.spacing12} />
        <Loading isLoading />
      </>
    );
  };
  const renderList = (data: BookModel[]) => {
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
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    );
  };
  if (isLoading) {
    return loadingComponent();
  }
  return (
    <View style={styles.scrollViewContentContainer}>
      <BlankSpacer height={SPACE.spacing12} />
      <View style={appStyle.rowFullWidthLeftContainer}>
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
              {renderList(data)}
              <BlankSpacer height={SPACE.spacing16} />
            </>
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <BlankSpacer height={100} />}
        />
      </View>
      {/* <BlankSpacer height={100} /> */}
    </View>
  );
};
