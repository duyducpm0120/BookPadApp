import type { AppTabEnum } from "@core";
import {
  getMessageFromErrorStatus,
  safeGetNumber,
  showAlert,
  strings,
  useGlobalNavigation,
  useGlobalSnackBar,
  useMount,
  globalActions,
  useGlobalDispatch,
  useGlobalState,
} from "@core";
import { useLogInWithTokenService } from "@core/services";
import { BackHandler } from "react-native";

const defaultDependencies = {
  useLogInWithTokenService,
};
export const useViewModel = (
  props: any,
  dependencies = defaultDependencies
) => {
  const globalDispatch = useGlobalDispatch();
  const { USER_INFO, BOOKS, CURRENT_TAB, IS_LOGGED_IN, TOKEN } =
    useGlobalState();
  const setGlobalCurrentTab = (tab: AppTabEnum) => {
    globalDispatch(globalActions.setGlobalCurrentTab(tab));
  };
  const { navigateToHomeScreen } = useGlobalNavigation();

  const { showGlobalSnackBar } = useGlobalSnackBar();

  const { mutateAsync: logInWithTokenMutateAsync, reset } =
    dependencies.useLogInWithTokenService();

  const loginWithToken = async () => {
    try {
      const result = await logInWithTokenMutateAsync(
        {
          token: TOKEN,
        },
        {
          onSuccess: () => {},
          onError: (err) => {},
        }
      );

      // showGlobalSnackBar({
      //   message: strings.loginSuccessMessage,
      // });
      globalDispatch(globalActions.setGlobalIsLoggedIn(true));
      globalDispatch(globalActions.setGlobalBooks(result.books));
      globalDispatch(globalActions.setGlobalUserInfo(result.userInfo));
      globalDispatch(
        globalActions.setGlobalHomePageCategoryList(result.categoryList)
      );
      navigateToHomeScreen();
    } catch (err: any) {
      const errStatus = safeGetNumber(err, "response.status", 500);
      showAlert({
        title: strings.loginFailed,
        message: getMessageFromErrorStatus(errStatus),
        secondaryButtonParams: {
          text: strings.exit,
          onPress: () => {
            BackHandler.exitApp();
          },
        },
        primaryButtonParams: {
          text: strings.retry,
          onPress: async () => {
            await loginWithToken();
          },
        },
      });
    }
  };

  useMount(async () => {
    if (!IS_LOGGED_IN) {
      await loginWithToken();
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
