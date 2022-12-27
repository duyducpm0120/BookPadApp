import { useMemo, useState } from "react";
import type { BookModel } from "@core";
import { useGlobalState } from "@core";
import { getBestSellerBooks } from "@core/services";
import { useMount } from "../../../../../../../core/hooks/useMount";

export const useViewModel = () => {
  // const { books } = props;
  const { HOME_PAGE_CATEGORY_LIST, TOKEN } = useGlobalState();
  const [bestSellerBooks, setBestSellerBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const getBestSellerBookList = async () => {
    try {
      const books = await getBestSellerBooks({
        token: TOKEN,
        numberOfBooks: 20,
      });
      setBestSellerBooks(books);
      setIsLoading(false);
    } catch (err) {
      // return [];
    }
  };

  useMount(() => {
    getBestSellerBookList();
  });
  const sectionData = useMemo(() => {
    return HOME_PAGE_CATEGORY_LIST.map((category) => {
      const data = bestSellerBooks.filter((book) => {
        return book.Categories.map((c) => c.CategoryId).includes(
          category.CategoryId
        );
      });
      return {
        title: category.CategoryName,
        data,
      };
    });
  }, [HOME_PAGE_CATEGORY_LIST, bestSellerBooks]);

  return {
    selectors: {
      bestSellerBooks,
      HOME_PAGE_CATEGORY_LIST,
      sectionData,
      isLoading,
    },
  };
};
