import type { ActionType } from "typesafe-actions";
import { createAction } from "typesafe-actions";
import type { AlertType } from "./types";

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

export const globalActions = {
  setGlobal,
  setGlobalLoading,
  setGlobalAlert,
};

export type GlobalActionsType = ActionType<typeof globalActions>;
