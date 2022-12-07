import { END_POINT } from "@core/const";
import { BookModel } from "@core/models";
import { safeGet, safeGetArray } from "@core/utils";
import axios from "axios";
import { CategoryModel } from "../models/CategoryModel";

const getAllCategoriesEndpoint = `${END_POINT}search/getAllCategories`;
const searchBookEndPoint = `${END_POINT}search/categoryBookSearch`;
export const getCategories = async ({ token }: { token: string }) => {
  const res = await axios.get(getAllCategoriesEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const catList = safeGet(res, "data.categories", []);
  const result = CategoryModel.instantiateList(catList);
  return result;
};

export const searchBookByCategory = async ({
  token,
  lastBookId,
  limit,
  categoryId,
}: {
  token: string;
  lastBookId: number;
  limit: number;
  categoryId: number;
}) => {
  const endPoint = searchBookEndPoint;
  const res = await axios.post(
    endPoint,
    {
      limit,
      last: Number(lastBookId),
      categoryId,
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
