export interface BookPadAppState {
  IS_LOADING: boolean;
  ALERT: {
    IS_SHOW_ALERT: boolean;
    MESSAGE: string;
    TYPE: AlertType;
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
