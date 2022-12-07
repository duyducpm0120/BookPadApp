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

const bookLibrarySections: { label: BookLibrarySection }[] = [
  {
    label: BookLibrarySection.READING,
  },
  {
    label: BookLibrarySection.WISH_LISTED_BOOKS,
  },
];

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
    return bookLibrarySections.map((category) => {
      return {
        title: category.label,
        data: BOOK_LIBRARY_LIST || [],
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
