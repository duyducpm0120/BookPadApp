import { Book, BPText } from "@app/components";
import React from "react";
import { ScrollView } from "react-native";
import { styles } from "./style";
import type { ForYouTabProps } from "./types";

export const ForYouTab = (props: ForYouTabProps) => {
  const { books } = props;
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
      <BPText>Science</BPText>
      {books.map((item, index) => {
        return <Book {...item} key={-index} />;
      })}
    </ScrollView>
  );
};
