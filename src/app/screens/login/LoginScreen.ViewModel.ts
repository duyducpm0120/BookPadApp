import { logIn } from "@core/services";
import { useState } from "react";

const defaultDependencies = {
  logIn,
};

export const useViewModel = (dependencies = defaultDependencies) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async () => {
    setIsLoading(true);
    await dependencies.logIn({ email, password });
    setIsLoading(false);
  };

  return {
    email,
    password,
    isLoading,
    setEmail,
    setPassword,
    onLogin,
  };
};
