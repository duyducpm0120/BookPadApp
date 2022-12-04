import {
  getMessageFromErrorStatus,
  safeGetString,
  showAlert,
} from "@core/utils";
import type { BookModel } from "@core";
import {
  globalActions,
  useGlobalDispatch,
  safeGetNumber,
  useGlobalSnackBar,
  showErrorAlert,
  strings,
  useGlobalState,
} from "@core";
import {
  addBookToLibrary,
  getBookLibrary,
  removeBookFromLibrary,
  useGetBookDownLoadLink,
} from "@core/services/BookServices";
import { useCallback } from "react";
import { BackHandler } from "react-native";

export const useViewModel = (params: { bookData: BookModel }) => {
  const { bookData } = params;
  const { BookId } = bookData;
  const { TOKEN, BOOK_LIBRARY_LIST } = useGlobalState();
  const { mutateAsync, reset } = useGetBookDownLoadLink({
    bookId: bookData.BookId,
  });
  const { showGlobalSnackBar } = useGlobalSnackBar();
  const globalDispatch = useGlobalDispatch();
  const getUserBookLibrary = async () => {
    try {
      const result = await getBookLibrary({
        token: TOKEN,
      });
      globalDispatch(globalActions.setGlobalBookLibraryList(result));
    } catch (err: any) {
      const errStatus = safeGetNumber(err, "response.status", 500);
      showAlert({
        title: strings.get_book_self_failed,
        message: getMessageFromErrorStatus(errStatus),
        secondaryButtonParams: {
          label: strings.exit,
          onPress: () => {
            BackHandler.exitApp();
          },
        },
        primaryButtonParams: {
          label: strings.retry,
          onPress: async () => {
            await getUserBookLibrary();
          },
        },
      });
    }
  };
  const removeBookFromUserLibrary = async (bookId: string) => {
    try {
      const result = await removeBookFromLibrary({
        token: TOKEN,
        bookId,
      });
      await getUserBookLibrary();
      showGlobalSnackBar({
        message: strings.remove_book_from_library_success,
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

      await getUserBookLibrary();
      showGlobalSnackBar({
        message: strings.add_book_to_library_success,
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
