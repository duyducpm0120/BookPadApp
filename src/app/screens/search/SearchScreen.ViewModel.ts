import type { BookModel } from "@core";
import {
  useMount,
  useGlobalLoading,
  getMessageFromError,
  showAlert,
  useGlobalState,
} from "@core";
import {
  searchBook,
  searchBookByAuthor,
  searchBookByCategory,
} from "@core/services";
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
  const [isSearched, setIsSearched] = useState(false);

  const searchBookByName = async () => {
    try {
      showGlobalLoading();
      const res = await searchBook({
        token: TOKEN,
        lastBookId: 0,
        limit: 10,
        searchValue: searchText,
      });
      if (res.length === 0) {
        hideGlobalLoading();
        setIsSearched(true);
        return;
      }
      setSearchResult(res);
      setLastBookId(Number(res[res.length - 1].BookId));
      hideGlobalLoading();
      setIsSearched(true);
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
        searchValue: searchText,
      });
      if (res.length === 0) {
        return;
      }
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
      if (res.length === 0) {
        return;
      }
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
      if (res.length === 0) {
        hideGlobalLoading();
        setIsSearched(true);
        return;
      }
      setSearchResult(res);
      setLastBookId(Number(res[res.length - 1].BookId));
      hideGlobalLoading();
      setIsSearched(true);
    } catch (err) {
      hideGlobalLoading();
      showAlert({
        title: "Error",
        message: getMessageFromError(err),
      });
    }
  };
  const loadMoreBookByAuthor = async () => {
    try {
      const res = await searchBookByAuthor({
        token: TOKEN,
        lastBookId,
        limit: 10,
        authorId: id,
      });
      if (res.length === 0) {
        return;
      }
      setSearchResult([...searchResult, ...res]);
      setLastBookId(Number(res[res.length - 1].BookId));
    } catch (err) {
      showAlert({
        title: "Error",
        message: getMessageFromError(err),
      });
    }
  };

  const searchBookByAuth = async () => {
    try {
      showGlobalLoading();
      const res = await searchBookByAuthor({
        token: TOKEN,
        lastBookId: 0,
        limit: 10,
        authorId: id,
      });
      if (res.length === 0) {
        hideGlobalLoading();
        setIsSearched(true);
        return;
      }
      setSearchResult(res);
      setLastBookId(Number(res[res.length - 1].BookId));
      hideGlobalLoading();
      setIsSearched(true);
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
      await searchBookByAuth();
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
    searchBookByAuth,
    loadMoreBookByAuthor,
    isSearched,
  };
};
