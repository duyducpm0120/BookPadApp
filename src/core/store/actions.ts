import type { ActionType } from "typesafe-actions";
import { createAction } from "typesafe-actions";
import type { CategoryModel } from "../models/CategoryModel";
import type { AppTabEnum } from "../const/AppTab";
import type { BookModel } from "../models/BookModel";
import type { UserInfoModel } from "../models/UserInfoModel";
import type { AlertType, SnackBarActionType } from "./types";

const setGlobal = createAction("global/setGlobal", (global: any) => ({
  global,
}))();

const setGlobalLoading = createAction(
  "global/setGlobalLoading",
  (loading: boolean) => ({
    loading,
  })
)();

const setGlobalAlert = createAction(
  "global/setGlobalAlert",
  ({
    type,
    message,
    isShowAlert,
  }: {
    type: AlertType;
    message: string;
    isShowAlert: boolean;
  }) => ({
    type,
    isShowAlert,
    message,
  })
)();

const setGlobalSnackBar = createAction(
  "global/setGlobalSnackBar",
  ({
    message,
    isShowSnackBar,
    action,
  }: {
    message: string;
    isShowSnackBar: boolean;
    action: SnackBarActionType;
  }) => ({
    message,
    isShowSnackBar,
    action,
  })
)();

const setGlobalUserInfo = createAction(
  "global/setGlobalUserInfo",
  (userInfo: UserInfoModel) => ({
    userInfo,
  })
)();

const setGlobalBooks = createAction(
  "global/setGlobalBooks",
  (books: BookModel[]) => ({
    books,
  })
)();

const setGlobalToken = createAction(
  "global/setGlobalToken",
  (token: string) => ({
    token,
  })
)();

const setGlobalCurrentTab = createAction(
  "global/setGlobalCurrentTab",
  (currentTab: AppTabEnum) => ({
    currentTab,
  })
)();

const setGlobalIsLoggedIn = createAction(
  "global/setGlobalIsLoggedIn",
  (isLoggedIn: boolean) => ({
    isLoggedIn,
  })
)();

const setGlobalHomePageCategoryList = createAction(
  "global/setGlobalHomePageCategoryList",
  (homePageCategoryList: CategoryModel[]) => ({
    homePageCategoryList,
  })
)();

const setGlobalBookLibraryList = createAction(
  "global/setGlobalBookLibrary",
  (bookLibrary: BookModel[]) => ({
    bookLibrary,
  })
)();

export const globalActions = {
  setGlobal,
  setGlobalLoading,
  setGlobalAlert,
  setGlobalSnackBar,
  setGlobalUserInfo,
  setGlobalBooks,
  setGlobalToken,
  setGlobalCurrentTab,
  setGlobalIsLoggedIn,
  setGlobalHomePageCategoryList,
  setGlobalBookLibraryList,
};

export type GlobalActionsType = ActionType<typeof globalActions>;
