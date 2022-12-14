import type { AppTabEnum } from "@core";
import {
  showAlert,
  strings,
  useGlobalNavigation,
  useGlobalSnackBar,
  useMount,
  globalActions,
  useGlobalDispatch,
  useGlobalState,
} from "@core";
import { useLogin } from "@core/hooks/useLogin";
import { getBookLibrary, useLogInWithTokenService } from "@core/services";
import { BackHandler } from "react-native";
import { getMessageFromError } from "../../../core/utils/ErrorUtils";

const defaultDependencies = {
  useLogInWithTokenService,
  getBookLibrary,
};
export const useViewModel = (
  props: any,
  dependencies = defaultDependencies
) => {
  const globalDispatch = useGlobalDispatch();
  const {
    USER_INFO,
    BOOKS,
    CURRENT_TAB,
    IS_LOGGED_IN,
    TOKEN,
    BOOK_LIBRARY_LIST,
  } = useGlobalState();
  const setGlobalCurrentTab = (tab: AppTabEnum) => {
    globalDispatch(globalActions.setGlobalCurrentTab(tab));
  };
  const { navigateToHomeScreen } = useGlobalNavigation();

  const { showGlobalSnackBar } = useGlobalSnackBar();

  const { mutateAsync: logInWithTokenMutateAsync, reset } =
    dependencies.useLogInWithTokenService();

  const { loginWithToken } = useLogin();

  const login = async () => {
    try {
      await loginWithToken();
      navigateToHomeScreen();
    } catch (err: any) {
      showAlert({
        title: strings.loginFailed,
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
            await loginWithToken();
          },
        },
      });
    }
  };
  const getUserBookLibrary = async () => {
    try {
      const result = await dependencies.getBookLibrary({
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
    if (!IS_LOGGED_IN) {
      await login();
    }
    if (!BOOK_LIBRARY_LIST) {
      await getUserBookLibrary();
    }
  });

  return {
    selectors: {
      CURRENT_TAB,
      USER_INFO,
      BOOKS,
    },
    handlers: {
      setGlobalCurrentTab,
    },
  };
};
