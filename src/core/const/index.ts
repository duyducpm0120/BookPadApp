export const a = {};

export const END_POINT = "http://localhost:4000/";

export enum TimeToMillisecondsEnum {
  SECOND = 1000,
  MINUTE = 1000 * 60,
  HOUR = 1000 * 60 * 60,
  DAY = 1000 * 60 * 60 * 24,
}

export const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
};

export * from "./ErrorCode";
export * from "./AppTab";
export * from "./CacheKey";
export * from "./ThemeList";
export * from "./LanguageList";

export enum BookLibrarySection {
  READING = "Reading",
  WISH_LISTED_BOOKS = "Wish listed books",
}
