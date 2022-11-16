import type { ActionType } from "typesafe-actions";
import { createAction } from "typesafe-actions";
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

export const globalActions = {
  setGlobal,
  setGlobalLoading,
  setGlobalAlert,
  setGlobalSnackBar,
};

export type GlobalActionsType = ActionType<typeof globalActions>;
