import { safeGet, safeGetArray, safeGetString } from "@core/utils";
import { BookModel } from "./BookModel";
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

  constructor(token: string, books: BookModel[], userInfo: UserInfoModel) {
    this.token = token;
    this.books = books;
    this.userInfo = userInfo;
  }

  public static instantiate = (json: any) => {
    console.log("json asdasd", json);
    const data = safeGet(json, "data", defaultLoginData);
    const token = safeGetString(data, "token", "");
    const books = BookModel.instantiateList(safeGetArray(data, "books", []));
    const userInfo = UserInfoModel.instantiate(safeGet(data, "user", {}));
    return new LogInModel(token, books, userInfo);
  };
}
