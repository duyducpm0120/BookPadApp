import { END_POINT } from "@core/const";
import { LogInModel } from "@core/models";
import axios from "axios";

export const logIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LogInModel> => {
  const logInEndpoint = `${END_POINT}/auth/login`;
  const response = await axios.post(logInEndpoint, {
    Email: email,
    Password: password,
  });

  //   console.log("response", response);
  return LogInModel.instantiate(response);
};
