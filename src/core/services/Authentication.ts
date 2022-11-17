import { END_POINT } from "@core/const";
import { LogInModel } from "@core/models";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const logInEndpoint = `${END_POINT}auth/login`;
export const logIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LogInModel> => {
  const response = await axios.post(logInEndpoint, {
    Email: email,
    Password: password,
  });
  return LogInModel.instantiate(response);
};

export const useLogInService = () => {
  const loginFunc = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await axios.post(logInEndpoint, {
      Email: email,
      Password: password,
    });
    const returnData = LogInModel.instantiate(res);
    return returnData;
  };
  const { reset, mutateAsync } = useMutation({
    mutationFn: loginFunc,
    mutationKey: ["login"],
    // networkMode: "offlineFirst",
  });

  return {
    reset,
    mutateAsync,
  };
};
