import {
  BookModel,
  END_POINT,
  GetBookDownLoadLinkModel,
  safeGetArray,
  TimeToMillisecondsEnum,
} from "@core";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const getDownLoadEndPoint = `${END_POINT}book/getBookDownloadLink/`;
const getBookLibraryEndPoint = `${END_POINT}library/getBooks`;
const removeBookLibraryEndPoint = `${END_POINT}library/removeBook`;
const addBookLibraryEndPoint = `${END_POINT}library/addBook`;
export const useGetBookDownLoadLink = (params: { bookId: string }) => {
  const getBookDownLoadEndPoint = async ({
    bookId,
    token,
  }: {
    bookId: string;
    token: string;
  }) => {
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

export const getBookLibrary = async ({ token }: { token: string }) => {
  const endPoint = getBookLibraryEndPoint;
  const res = await axios.post(
    endPoint,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const books = safeGetArray(res.data, "books", []);
  const returnData = BookModel.instantiateList(books);
  return returnData;
};

export const removeBookFromLibrary = async ({
  token,
  bookId,
}: {
  token: string;
  bookId: string;
}) => {
  const endPoint = removeBookLibraryEndPoint;
  const res = await axios.post(
    endPoint,
    {
      bookId: Number(bookId),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const addBookToLibrary = async ({
  token,
  bookId,
}: {
  token: string;
  bookId: string;
}) => {
  const endPoint = addBookLibraryEndPoint;
  const res = await axios.post(
    endPoint,
    {
      bookId: Number(bookId),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};
