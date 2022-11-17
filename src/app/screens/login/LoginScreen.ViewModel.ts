import {
  strings,
  useGlobalLoading,
  useGlobalNavigation,
  useGlobalSnackBar,
} from "@core";
import { logIn, useLogInService } from "@core/services";
import { getMessageFromErrorStatus } from "@core/utils/ErrorUtils";
import { showAlert } from "@core/utils/PopupUtils";
import { useState } from "react";

const defaultDependencies = {
  logIn,
};

export const useViewModel = (dependencies = defaultDependencies) => {
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();
  const [email, setEmail] = useState<string>("vuong.dt.23@gmail.com");
  const [password, setPassword] = useState<string>("emmawatson");

  const { navigateToHomeScreen } = useGlobalNavigation();
  const { showGlobalSnackBar } = useGlobalSnackBar();

  const { mutateAsync, reset } = useLogInService();

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
      navigateToHomeScreen();
    } catch (err: any) {
      hideGlobalLoading();
      showAlert({
        title: strings.loginFailed,
        message: getMessageFromErrorStatus(err.response.status),
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
