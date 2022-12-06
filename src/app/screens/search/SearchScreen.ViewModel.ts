import type { BookModel } from "@core";
import {
  useMount,
  useGlobalLoading,
  getMessageFromError,
  showAlert,
  useGlobalState,
} from "@core";
import { searchBook, searchBookByCategory } from "@core/services";
import { useState } from "react";
import { SearchScreenType } from "./types";

export const useViewModel = (params: {
  type: SearchScreenType;
  id: number;
}) => {
  const { type, id } = params;
  const { TOKEN, BOOK_LIBRARY_LIST } = useGlobalState();
  const [searchText, setSearchText] = useState("");
  const [lastBookId, setLastBookId] = useState<number>(0);
  const [searchResult, setSearchResult] = useState<BookModel[]>([]);
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();

  const searchBookByName = async () => {
    try {
      showGlobalLoading();
      const res = await searchBook({
        token: TOKEN,
        lastBookId: 0,
        limit: 10,
        bookName: searchText,
      });
      setSearchResult(res);
      setLastBookId(Number(res[res.length - 1].BookId));
      hideGlobalLoading();
    } catch (err) {
      hideGlobalLoading();
      showAlert({
        title: "Error",
        message: getMessageFromError(err),
      });
    }
  };

  const loadMoreBookByName = async () => {
    try {
      const res = await searchBook({
        token: TOKEN,
        lastBookId,
        limit: 10,
        bookName: searchText,
      });
      setSearchResult([...searchResult, ...res]);
      setLastBookId(Number(res[res.length - 1].BookId));
    } catch (err) {
      showAlert({
        title: "Error",
        message: getMessageFromError(err),
      });
    }
  };

  const loadMoreBookByCategory = async () => {
    try {
      const res = await searchBookByCategory({
        token: TOKEN,
        lastBookId,
        limit: 10,
        categoryId: id,
      });
      setSearchResult([...searchResult, ...res]);
      setLastBookId(Number(res[res.length - 1].BookId));
    } catch (err) {
      showAlert({
        title: "Error",
        message: getMessageFromError(err),
      });
    }
  };

  const searchBookByCat = async () => {
    try {
      showGlobalLoading();
      const res = await searchBookByCategory({
        token: TOKEN,
        lastBookId: 0,
        limit: 10,
        categoryId: id,
      });
      setSearchResult(res);
      setLastBookId(Number(res[res.length - 1].BookId));
      hideGlobalLoading();
    } catch (err) {
      hideGlobalLoading();
      showAlert({
        title: "Error",
        message: getMessageFromError(err),
      });
    }
  };

  useMount(async () => {
    if (type === SearchScreenType.CATEGORY) {
      await searchBookByCat();
    }
    if (type === SearchScreenType.AUTHOR) {
      await searchBookByCat();
    }
  });

  return {
    TOKEN,
    searchText,
    setSearchText,
    searchBookByName,
    searchResult,
    loadMoreBookByName,
    loadMoreBookByCategory,
  };
};
