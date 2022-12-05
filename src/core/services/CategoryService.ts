import { END_POINT } from "@core/const";
import { safeGet } from "@core/utils";
import axios from "axios";
import { CategoryModel } from "../models/CategoryModel";

const getAllCategoriesEndpoint = `${END_POINT}search/getAllCategories`;
export const getCategories = async ({ token }: { token: string }) => {
  const res = await axios.get(getAllCategoriesEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("res asdasd", res);
  const catList = safeGet(res, "data.categories", []);
  const result = CategoryModel.instantiateList(catList);
  return result;
};
