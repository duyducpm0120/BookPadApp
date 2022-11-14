/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createReducer } from "typesafe-actions";
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
  );
