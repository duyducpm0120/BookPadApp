import { BlankSpacer, Book, BPText } from "@app/components";
import { appStyle, FONT_SIZE, SPACE } from "@app/styles";
import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import { styles } from "./style";
import type { ForYouTabProps } from "./types";

export const ForYouTab = (props: ForYouTabProps) => {
  const { books } = props;
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContentContainer}
      showsVerticalScrollIndicator={false}
    >
      <BPText fontSize={FONT_SIZE.fontSize24} fontWeight="bold">
        Science
      </BPText>
      <BlankSpacer height={SPACE.spacing12} />
      <View style={appStyle.rowFullWidthLeftContainer}>
        <FlatList
          data={books}
          keyExtractor={(item, index) => `${item.BookId} + ${index}`}
          renderItem={({ item }) => <Book {...item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <BlankSpacer height={SPACE.spacing12} />
      <BPText fontSize={FONT_SIZE.fontSize24} fontWeight="bold">
        Technologies
      </BPText>
      <BlankSpacer height={SPACE.spacing12} />
      <View style={appStyle.rowFullWidthLeftContainer}>
        <FlatList
          data={books}
          keyExtractor={(item, index) => `${item.BookId} + ${index}`}
          renderItem={({ item }) => <Book {...item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          // style={{ height: 20 }}'
          //   contentContainerStyle={{ height: 100, backgroundColor: "red" }}
        />
      </View>
    </ScrollView>
  );
};
