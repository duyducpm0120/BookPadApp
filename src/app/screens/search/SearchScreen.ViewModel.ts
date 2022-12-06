import type { BookModel } from "@core";
import {
  useGlobalLoading,
  getMessageFromError,
  showAlert,
  useGlobalDispatch,
  useGlobalSnackBar,
  useGlobalState,
} from "@core";
import { searchBook } from "@core/services";
import { useState } from "react";

export const useViewModel = (params: any) => {
  const { TOKEN, BOOK_LIBRARY_LIST } = useGlobalState();

  const { showGlobalSnackBar } = useGlobalSnackBar();
  const globalDispatch = useGlobalDispatch();
  const [searchText, setSearchText] = useState("");
  const [lastBookId, setLastBookId] = useState<number>(0);
  const [searchResult, setSearchResult] = useState<BookModel[]>([]);
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();

  const searchBookByName = async () => {
    try {
      // if (searchText.length < 3) {
      //   // showGlobalSnackBar({
      //   //   message: "Please enter at least 3 characters",
      //   // });
      //   showAlert({
      //     title: "Error",
      //     message: "Please enter at least 3 characters",
      //   });
      //   return;
      // }
      showGlobalLoading();
      const res = await searchBook({
        token: TOKEN,
        lastBookId,
        limit: 10,
        bookName: searchText,
      });
      setSearchResult(res);
      hideGlobalLoading();
    } catch (err) {
      hideGlobalLoading();
      showAlert({
        title: "Error",
        message: getMessageFromError(err),
      });
    }
  };

  return {
    TOKEN,
    searchText,
    setSearchText,
    searchBookByName,
    searchResult,
  };
};
