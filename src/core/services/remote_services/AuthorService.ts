import { safeGet, safeGetArray } from "@core/utils";
import { END_POINT } from "@core/const";
import axios from "axios";
import type { BookAuthor } from "@core/models";
import { BookModel } from "@core/models";

const getAllAuthorsEndpoint = `${END_POINT}search/getAllAuthors`;
const searchBookEndPoint = `${END_POINT}search/authorBookSearch`;
export const getAuthors = async ({ token }: { token: string }) => {
  const res = await axios.get(getAllAuthorsEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const authorList: BookAuthor[] = safeGet(res, "data.authors", []);
  return authorList;
};

export const searchBookByAuthor = async ({
  token,
  lastBookId,
  limit,
  authorId,
}: {
  token: string;
  lastBookId: number;
  limit: number;
  authorId: number;
}) => {
  const endPoint = searchBookEndPoint;
  const res = await axios.post(
    endPoint,
    {
      limit,
      last: Number(lastBookId),
      authorId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const bookData = safeGetArray(res, "data.books", []);
  const returnData = BookModel.instantiateList(bookData);
  return returnData;
};
