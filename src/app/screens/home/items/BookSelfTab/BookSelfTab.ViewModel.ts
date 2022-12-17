import {
  BookLibrarySection,
  useGlobalState,
  useGlobalDispatch,
  globalActions,
  useMount,
  getMessageFromError,
  showAlert,
  strings,
  useGlobalSnackBar,
} from "@core";
import { getBookLibrary } from "@core/services";

import { useMemo, useState } from "react";
import { BackHandler } from "react-native";

export const useViewModel = () => {
  const { USER_INFO, BOOKS, TOKEN, BOOK_LIBRARY_LIST } = useGlobalState();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const globalDispatch = useGlobalDispatch();
  const { showGlobalSnackBar } = useGlobalSnackBar();

  const getUserBookLibrary = async () => {
    try {
      const result = await getBookLibrary({
        token: TOKEN,
      });
      globalDispatch(globalActions.setGlobalBookLibraryList(result));
    } catch (err: any) {
      showAlert({
        title: strings.get_book_self_failed,
        message: getMessageFromError(err),
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

  useMount(async () => {
    if (!BOOK_LIBRARY_LIST) {
      getUserBookLibrary();
    }
  });

  const sectionData = useMemo(() => {
    const bookLibrarySections: { type: BookLibrarySection; label: string }[] = [
      {
        type: BookLibrarySection.READING,
        label: strings.reading,
      },
      {
        type: BookLibrarySection.WISH_LISTED_BOOKS,
        label: strings.wish_listed_books,
      },
    ];
    return bookLibrarySections.map((category) => {
      return {
        title: category.label,
        data: BOOK_LIBRARY_LIST || [],
        type: category.type,
      };
    });
  }, [BOOK_LIBRARY_LIST]);

  return {
    selectors: {
      USER_INFO,
      BOOK_LIBRARY_LIST,
      sectionData,
    },
    handlers: {},
  };
};
