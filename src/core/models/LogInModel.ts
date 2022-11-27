import { safeGet, safeGetArray, safeGetString } from "@core/utils";
import { BookModel } from "./BookModel";
import { CategoryModel } from "./CategoryModel";
import { UserInfoModel } from "./UserInfoModel";

export const defaultLoginData = {
  token: "",
  books: [],
  userInfo: UserInfoModel.instantiate({}),
};
export class LogInModel {
  token: string;

  books: BookModel[];

  userInfo: UserInfoModel;

  categoryList: CategoryModel[];

  constructor(
    token: string,
    books: BookModel[],
    userInfo: UserInfoModel,
    categoryList: CategoryModel[]
  ) {
    this.token = token;
    this.books = books;
    this.userInfo = userInfo;
    this.categoryList = categoryList;
  }

  public static instantiate = (json: any) => {
    console.log("json asdasd", json);
    const data = safeGet(json, "data", defaultLoginData);
    const token = safeGetString(data, "token", "");
    const books = BookModel.instantiateList(safeGetArray(data, "books", []));
    const userInfo = UserInfoModel.instantiate(safeGet(data, "user", {}));
    const categoryList = CategoryModel.instantiateList(
      safeGetArray(data, "categoryList", [])
    );
    return new LogInModel(token, books, userInfo, categoryList);
  };
}
