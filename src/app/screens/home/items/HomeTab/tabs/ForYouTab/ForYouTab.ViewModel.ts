import { useMemo } from "react";
import { useGlobalState } from "@core";
import type { ForYouTabViewModelProps } from "./types";

export const useViewModel = (props: ForYouTabViewModelProps) => {
  const { books } = props;
  const { HOME_PAGE_CATEGORY_LIST } = useGlobalState();
  const sectionData = useMemo(() => {
    return HOME_PAGE_CATEGORY_LIST.map((category) => {
      const data = books.filter((book) => {
        return book.Categories.map((c) => c.CategoryId).includes(
          category.CategoryId
        );
      });
      return {
        title: category.CategoryName,
        data,
      };
    });
  }, [books, HOME_PAGE_CATEGORY_LIST]);

  return {
    selectors: {
      books,
      HOME_PAGE_CATEGORY_LIST,
      sectionData,
    },
  };
};
