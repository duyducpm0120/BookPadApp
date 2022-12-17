import { END_POINT, TimeToMillisecondsEnum } from "@core/const";
import { LogInModel } from "@core/models";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const logInEndpoint = `${END_POINT}auth/login`;
const logInWithTokenEndpoint = `${END_POINT}user/home`;
// const logIn = async ({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }): Promise<LogInModel> => {
//   const response = await axios.post(logInEndpoint, {
//     Email: email,
//     Password: password,
//   });
//   return LogInModel.instantiate(response);
// };

// const logInWithToken = async ({
//   token,
// }: {
//   token: string;
// }): Promise<LogInModel> => {
//   const response = await axios.post(
//     logInEndpoint,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return LogInModel.instantiate(response);
// };

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
    cacheTime: TimeToMillisecondsEnum.DAY,
    networkMode: "offlineFirst",
  });

  return {
    reset,
    mutateAsync,
  };
};

export const useLogInWithTokenService = () => {
  const loginFunc = async ({ token }: { token: string }) => {
    const res = await axios.post(
      logInWithTokenEndpoint,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const returnData = LogInModel.instantiate(res);
    return returnData;
  };
  const { reset, mutateAsync } = useMutation({
    mutationFn: loginFunc,
    mutationKey: ["login"],
    cacheTime: TimeToMillisecondsEnum.DAY,
    networkMode: "offlineFirst",
  });

  return {
    reset,
    mutateAsync,
  };
};
