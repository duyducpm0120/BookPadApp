/* eslint-disable react-native/no-inline-styles */
import type { BookModel } from "@core";
import { LOCAL_ICONS } from "@core/assets/icons/local_icon";
import React from "react";
import FastImage from "react-native-fast-image";

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

const START_SIZE = 16;

export const renderBookStars = (book: BookModel) => {
  const { ReviewStars } = book;
  const fullStars = Math.floor(ReviewStars);
  const halfStars = ReviewStars - fullStars > 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;
  const stars: JSX.Element[] = [];

  const fullStar = (index: number) => (
    <FastImage
      source={LOCAL_ICONS.fullStar}
      style={{
        height: START_SIZE,
        width: START_SIZE,
        marginRight: 5,
      }}
      resizeMode="contain"
      key={`fullStar${index}`}
    />
  );
  const halfStar = (index: number) => (
    <FastImage
      source={LOCAL_ICONS.halfStar}
      style={{
        height: START_SIZE,
        width: START_SIZE,
        marginRight: 5,
      }}
      resizeMode="contain"
      key={`halfStar${index}`}
    />
  );
  const emptyStar = (index: number) => (
    <FastImage
      source={LOCAL_ICONS.emptyStar}
      style={{
        height: START_SIZE,
        width: START_SIZE,
        marginRight: 5,
      }}
      resizeMode="contain"
      key={`emptyStar${index}`}
    />
  );

  for (let i = 0; i < fullStars; i += 1) {
    stars.push(fullStar(i));
  }
  for (let i = 0; i < halfStars; i += 1) {
    stars.push(halfStar(i));
  }
  for (let i = 0; i < emptyStars; i += 1) {
    stars.push(emptyStar(i));
  }
  return stars;
};
