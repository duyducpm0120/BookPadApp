import { strings, useGlobalLoading } from "@core";
import { logIn } from "@core/services";
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

  const onLogin = async () => {
    try {
      showGlobalLoading();
      await dependencies.logIn({
        email,
        password,
      });
      hideGlobalLoading();
      showAlert({
        title: strings.loginSuccess,
        message: strings.loginSuccessMessage,
        primaryButtonParams: {
          text: strings.ok,
          onPress: () => {},
        },
      });
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
