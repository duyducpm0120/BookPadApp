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
