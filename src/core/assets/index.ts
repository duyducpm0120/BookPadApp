// export * from "./fonts";
export * from "./images";
export * from "./localization";
export * from "./icons";

export enum BotResponseType {
  RECOMMEND_BOOK = "recommend_book",
  NONE = "none",
  TEXT = "text",
  RECOMMEND_BOOK_MORE = "recommend_book_more",
  SEARCH_BOOK_BY_CATEGORY = "search_book_by_category",
  SEARCH_BOOK_BY_CATEGORY_MORE = "search_book_by_category_more",
  SEARCH_BOOK_BY_AUTHOR = "search_book_by_author",
  SEARCH_BOOK_BY_AUTHOR_MORE = "search_book_by_author_more",
}
