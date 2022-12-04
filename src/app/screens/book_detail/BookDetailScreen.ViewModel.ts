import { safeGetString } from "@core/utils";
import type { BookModel } from "@core";
import {
  safeGetNumber,
  useGlobalSnackBar,
  showErrorAlert,
  strings,
  useGlobalState,
} from "@core";
import {
  addBookToLibrary,
  removeBookFromLibrary,
  useGetBookDownLoadLink,
} from "@core/services/BookServices";
import { useCallback } from "react";

export const useViewModel = (params: { bookData: BookModel }) => {
  const { bookData } = params;
  const { BookId } = bookData;
  const { TOKEN, BOOK_LIBRARY_LIST } = useGlobalState();
  const { mutateAsync, reset } = useGetBookDownLoadLink({
    bookId: bookData.BookId,
  });
  const { showGlobalSnackBar } = useGlobalSnackBar();

  const removeBookFromUserLibrary = async (bookId: string) => {
    try {
      const result = await removeBookFromLibrary({
        token: TOKEN,
        bookId,
      });
      const message = safeGetString(result, "result.message", "");
      showGlobalSnackBar({
        message,
      });
    } catch (err: any) {
      const errStatus = safeGetNumber(err, "response.status", 500);
      const message = safeGetString(err, "response.data.message", "");
      showGlobalSnackBar({
        message,
      });
    }
  };

  const addBookToUserLibrary = async (bookId: string) => {
    try {
      const result = await addBookToLibrary({
        token: TOKEN,
        bookId,
      });
      const message = safeGetString(result, "result.message", "");
      showGlobalSnackBar({
        message,
      });
    } catch (err: any) {
      const errStatus = safeGetNumber(err, "response.status", 500);
      const message = safeGetString(err, "response.data.message", "");
      showGlobalSnackBar({
        message,
      });
    }
  };

  const isBookInLibrary = useCallback(() => {
    if (!BOOK_LIBRARY_LIST) {
      return false;
    }
    const book = BOOK_LIBRARY_LIST.find((item) => item.BookId === BookId);
    return !!book;
  }, [BOOK_LIBRARY_LIST, BookId]);
  const fetchBookDownLoadLink = useCallback(async () => {
    try {
      // showGlobalLoading();
      const result = await mutateAsync({ bookId: BookId, token: TOKEN });
      // hideGlobalLoading();
      // setBookDownloadLink(result.downloadLink);
      return result.downloadLink;
    } catch (err) {
      // hideGlobalLoading();
      showErrorAlert({
        title: strings.get_book_link_failed,
        error: err,
        primaryButtonParams: {
          text: "OK",
          onPress: () => {},
        },
      });
      return "";
    }
  }, [BookId, TOKEN, mutateAsync]);

  return {
    bookData,
    fetchBookDownLoadLink,
    isBookInLibrary,
    removeBookFromUserLibrary,
    addBookToUserLibrary,
  };
};
