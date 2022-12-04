import {
  BookLibrarySection,
  useGlobalState,
  useGlobalDispatch,
  globalActions,
  useMount,
  getMessageFromErrorStatus,
  safeGetNumber,
  showAlert,
  strings,
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

  const getUserBookLibrary = async () => {
    try {
      const result = await getBookLibrary({
        token: TOKEN,
      });
      console.log("result asdasd", result);
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
