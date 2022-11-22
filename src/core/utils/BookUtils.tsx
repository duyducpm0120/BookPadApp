/* eslint-disable react-native/no-inline-styles */
import type { BookModel } from "@core";
import { LOCAL_ICONS } from "@core/assets/images/img";
import React from "react";
import { Image } from "react-native";

export const getBookAuthor = (book: BookModel) => {
  const { Authors } = book;
  if (Authors.length === 0) {
    return "Unknown";
  }
  if (Authors.length === 1) {
    return Authors[0].AuthorName;
  }
  return `${Authors[0].AuthorName} and ${Authors.length - 1} more`;
};

export const renderBookStars = (book: BookModel) => {
  const { ReviewStars } = book;
  const fullStars = Math.floor(ReviewStars);
  const halfStars = ReviewStars - fullStars > 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;
  const stars: JSX.Element[] = [];

  const fullStar = (
    <Image
      source={LOCAL_ICONS.fullStar}
      style={{
        height: 20,
        width: 20,
        marginRight: 5,
      }}
      resizeMode="contain"
    />
  );
  const halfStar = (
    <Image
      source={LOCAL_ICONS.halfStar}
      style={{
        height: 20,
        width: 20,
        marginRight: 5,
      }}
      resizeMode="contain"
    />
  );
  const emptyStar = (
    <Image
      source={LOCAL_ICONS.emptyStar}
      style={{
        height: 20,
        width: 20,
        marginRight: 5,
      }}
      resizeMode="contain"
    />
  );

  for (let i = 0; i < fullStars; i += 1) {
    stars.push(fullStar);
  }
  for (let i = 0; i < halfStars; i += 1) {
    stars.push(halfStar);
  }
  for (let i = 0; i < emptyStars; i += 1) {
    stars.push(emptyStar);
  }
  return stars;
};
