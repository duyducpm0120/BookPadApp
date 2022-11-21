import {
  globalActions,
  strings,
  useGlobalDispatch,
  useGlobalLoading,
  useGlobalNavigation,
  useGlobalSnackBar,
} from "@core";
import { useLogInService } from "@core/services";
import { getMessageFromErrorStatus } from "@core/utils/ErrorUtils";
import { showAlert } from "@core/utils/PopupUtils";
import { useState } from "react";
import { safeGetNumber } from "../../../core/utils/CommonUtils";

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
      globalDispatch(globalActions.setGlobalBooks(result.books));
      globalDispatch(globalActions.setGlobalUserInfo(result.userInfo));
      navigateToHomeScreen();
    } catch (err: any) {
      hideGlobalLoading();
      const errStatus = safeGetNumber(err, "response.status", 500);
      showAlert({
        title: strings.loginFailed,
        message: getMessageFromErrorStatus(errStatus),
        primaryButtonParams: {
          text: "OK",
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
