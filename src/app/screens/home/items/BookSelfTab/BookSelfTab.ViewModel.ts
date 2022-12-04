import {
  useGlobalState,
  useGlobalDispatch,
  globalActions,
  useMount,
  getMessageFromErrorStatus,
  safeGetNumber,
  showAlert,
  strings,
} from "@core";
import { useGetBookLibrary } from "@core/services";
import { useMemo, useState } from "react";
import { BackHandler } from "react-native";

const bookLibrarySections = [
  {
    label: "Reading",
  },
  {
    label: "Wishlisted Books",
  },
];

export const useViewModel = () => {
  const { USER_INFO, BOOKS, TOKEN, BOOK_LIBRARY_LIST } = useGlobalState();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const globalDispatch = useGlobalDispatch();
  const { mutateAsync: getBookLibraryMutateAsync } = useGetBookLibrary();

  const getBookLibrary = async () => {
    try {
      const result = await getBookLibraryMutateAsync({
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
            await getBookLibrary();
          },
        },
      });
    }
  };

  useMount(async () => {
    if (!BOOK_LIBRARY_LIST) {
      getBookLibrary();
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
      BOOKS,
      sectionData,
    },
    handlers: {},
  };
};
