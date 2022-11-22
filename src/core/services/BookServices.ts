import {
  END_POINT,
  GetBookDownLoadLinkModel,
  TimeToMillisecondsEnum,
} from "@core";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const getDownLoadEndPoint = `${END_POINT}book/getBookDownloadLink/`;
export const useGetBookDownLoadLink = (params: { bookId: string }) => {
  const getBookDownLoadEndPoint = async ({
    bookId,
    token,
  }: {
    bookId: string;
    token: string;
  }) => {
    console.log("endpoint ", getDownLoadEndPoint + bookId);
    console.log("token asdasd", token);
    const endPoint = getDownLoadEndPoint + bookId;
    const res = await axios.get(endPoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const returnData = GetBookDownLoadLinkModel.instantiate(res);
    return returnData;
  };
  const { reset, mutateAsync } = useMutation({
    mutationFn: getBookDownLoadEndPoint,
    mutationKey: [`getBookDownLoadEndPoint ${params.bookId}`],
    cacheTime: TimeToMillisecondsEnum.DAY,
    networkMode: "offlineFirst",
  });

  return {
    reset,
    mutateAsync,
  };
};
