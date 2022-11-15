import { useGlobalLoading } from "@core";
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
        title: "Login Success",
        message: "Login Success",
        primaryButtonParams: {
          text: "OK",
          onPress: () => {},
        },
      });
    } catch (err: any) {
      hideGlobalLoading();
      console.log("error status asdasd", err.response);
      showAlert({
        title: "Login Failed",
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
