import { END_POINT } from "@core/const";
import { LogInModel } from "@core/models";
import { useQuery } from "@tanstack/react-query";
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

export const useLogInService = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const loginFunc = () =>
    axios.post(logInEndpoint, {
      Email: email,
      Password: password,
    });
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["login"],
    queryFn: loginFunc,
  });
  const returnData = LogInModel.instantiate(data);
  return {
    data: returnData,
    isLoading,
    error,
    refetch,
  };
};
