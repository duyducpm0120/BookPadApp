import type { AppTabEnum } from "@core/const";
import type { BookModel } from "../models/BookModel";
import type { UserInfoModel } from "../models/UserInfoModel";

export type SnackBarActionType = {
  label: string;
  onPress: () => void;
};
export interface BookPadAppState {
  IS_LOADING: boolean;
  ALERT: {
    IS_SHOW_ALERT: boolean;
    MESSAGE: string;
    TYPE: AlertType;
  };
  SNACK_BAR: {
    IS_SHOW_SNACK_BAR: boolean;
    MESSAGE: string;
    ACTION: SnackBarActionType;
  };
  USER_INFO: UserInfoModel;
  BOOKS: BookModel[];
  TOKEN: string;
  CURRENT_TAB: AppTabEnum;
  IS_LOGGED_IN: boolean;
}

export enum AlertType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}

export enum BookPadWAPage {
  Infomations = "Infomations",
  Books = "Books",
}
