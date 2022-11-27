import { createReducer } from "typesafe-actions";
import { AppTabEnum } from "../const/AppTab";
import { UserInfoModel } from "../models/UserInfoModel";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { GlobalActionsType } from "./actions";
import { globalActions } from "./actions";
import type { BookPadAppState } from "./types";
import { AlertType } from "./types";

export const initState: BookPadAppState = {
  IS_LOADING: false,
  ALERT: {
    IS_SHOW_ALERT: false,
    MESSAGE: "",
    TYPE: AlertType.SUCCESS,
  },
  SNACK_BAR: {
    IS_SHOW_SNACK_BAR: false,
    MESSAGE: "",
    ACTION: {
      label: "",
      onPress: () => {},
    },
  },
  USER_INFO: UserInfoModel.instantiate({}),
  BOOKS: [],
  TOKEN: "",
  CURRENT_TAB: AppTabEnum.HOME,
  IS_LOGGED_IN: false,
  HOME_PAGE_CATEGORY_LIST: [],
};
export const reducer = createReducer<BookPadAppState, GlobalActionsType>(
  initState
)
  .handleAction(globalActions.setGlobal, (state, action): BookPadAppState => {
    return {
      ...state,
      ...action.payload.global,
    };
  })
  .handleAction(
    globalActions.setGlobalLoading,
    (state, action): BookPadAppState => {
      return {
        ...state,
        IS_LOADING: action.payload.loading,
      };
    }
  )
  .handleAction(
    globalActions.setGlobalAlert,
    (state, action): BookPadAppState => {
      return {
        ...state,
        ALERT: {
          IS_SHOW_ALERT: action.payload.isShowAlert,
          MESSAGE: action.payload.message,
          TYPE: action.payload.type,
        },
      };
    }
  )
  .handleAction(
    globalActions.setGlobalSnackBar,
    (state, action): BookPadAppState => {
      return {
        ...state,
        SNACK_BAR: {
          IS_SHOW_SNACK_BAR: action.payload.isShowSnackBar,
          MESSAGE: action.payload.message,
          ACTION: action.payload.action,
        },
      };
    }
  )
  .handleAction(
    globalActions.setGlobalUserInfo,
    (state, action): BookPadAppState => {
      return {
        ...state,
        USER_INFO: action.payload.userInfo,
      };
    }
  )
  .handleAction(
    globalActions.setGlobalBooks,
    (state, action): BookPadAppState => {
      return {
        ...state,
        BOOKS: action.payload.books,
      };
    }
  )
  .handleAction(
    globalActions.setGlobalToken,
    (state, action): BookPadAppState => {
      return {
        ...state,
        TOKEN: action.payload.token,
      };
    }
  )
  .handleAction(
    globalActions.setGlobalCurrentTab,
    (state, action): BookPadAppState => {
      return {
        ...state,
        CURRENT_TAB: action.payload.currentTab,
      };
    }
  )
  .handleAction(
    globalActions.setGlobalIsLoggedIn,
    (state, action): BookPadAppState => {
      return {
        ...state,
        IS_LOGGED_IN: action.payload.isLoggedIn,
      };
    }
  )
  .handleAction(
    globalActions.setGlobalHomePageCategoryList,
    (state, action): BookPadAppState => {
      return {
        ...state,
        HOME_PAGE_CATEGORY_LIST: action.payload.homePageCategoryList,
      };
    }
  );
