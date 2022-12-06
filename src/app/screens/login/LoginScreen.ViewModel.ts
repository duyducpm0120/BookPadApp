import {
  getMessageFromError,
  globalActions,
  strings,
  TimeToMillisecondsEnum,
  useGlobalDispatch,
  useGlobalLoading,
  useGlobalNavigation,
  useGlobalSnackBar,
} from "@core";
import { useLogInService } from "@core/services";

import LocalStorageHelper from "@core/utils/LocalStorageHelper";
import { showAlert } from "@core/utils/PopupUtils";
import { useState } from "react";
import { CacheKeyEnum } from "../../../core/const/CacheKey";

const defaultDependencies = {
  useLogInService,
};

export const useViewModel = (dependencies = defaultDependencies) => {
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();
  const [email, setEmail] = useState<string>("vuong.dt.23@gmail.com");
  const [password, setPassword] = useState<string>("emmawatson");

  const { navigateToHomeScreen } = useGlobalNavigation();
  const { showGlobalSnackBar } = useGlobalSnackBar();

  const { mutateAsync, reset } = dependencies.useLogInService();

  const globalDispatch = useGlobalDispatch();

  const onLogin = async () => {
    try {
      showGlobalLoading();
      const result = await mutateAsync(
        {
          email,
          password,
        },
        {
          onSuccess: () => {},
          onError: (err) => {},
        }
      );
      hideGlobalLoading();
      showGlobalSnackBar({
        message: strings.loginSuccessMessage,
      });
      globalDispatch(globalActions.setGlobalToken(result.token));
      // console.log("result.token asdasd", result.token);
      LocalStorageHelper.setItem(
        CacheKeyEnum.TOKEN,
        result.token,
        TimeToMillisecondsEnum.DAY
      );
      globalDispatch(globalActions.setGlobalIsLoggedIn(true));
      globalDispatch(globalActions.setGlobalBooks(result.books));
      globalDispatch(globalActions.setGlobalUserInfo(result.userInfo));
      globalDispatch(
        globalActions.setGlobalHomePageCategoryList(result.categoryList)
      );
      navigateToHomeScreen();
    } catch (err: any) {
      hideGlobalLoading();
      showAlert({
        title: strings.loginFailed,
        message: getMessageFromError(err),
        primaryButtonParams: {
          label: "OK",
          onPress: () => {},
        },
      });
    }
  };

  return {
    onLogin,
    email,
    setEmail,
    password,
    setPassword,
  };
};
