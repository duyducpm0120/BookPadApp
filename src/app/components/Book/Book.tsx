import type { BookModel } from "@core";
import React from "react";
import { View } from "react-native";
import { BPText } from "../BPText";

export const Book = (props: BookModel) => {
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
  } = props;
  return (
    <View>
      <BPText>asdasd</BPText>
    </View>
  );
};
