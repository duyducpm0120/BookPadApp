import { useLogInWithTokenService } from "@core/services";
import { globalActions } from "@core/store";
import { useGlobalDispatch } from "./useGlobalDispatch";
import { useGlobalState } from "./useGlobalState";

const defaultDependencies = {
  useLogInWithTokenService,
};
export const useLogin = (dependencies = defaultDependencies) => {
  const {
    USER_INFO,
    BOOKS,
    CURRENT_TAB,
    IS_LOGGED_IN,
    TOKEN,
    BOOK_LIBRARY_LIST,
  } = useGlobalState();
  const { mutateAsync: logInWithTokenMutateAsync, reset } =
    dependencies.useLogInWithTokenService();
  const globalDispatch = useGlobalDispatch();
  const loginWithToken = async () => {
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
  };
  return {
    loginWithToken,
  };
};
