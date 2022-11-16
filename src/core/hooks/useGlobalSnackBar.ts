import type { SnackBarActionType } from "@core";
import { globalActions, useGlobalDispatch, useGlobalState } from "@core";

export const useGlobalSnackBar = () => {
  const { SNACK_BAR } = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const {
    IS_SHOW_SNACK_BAR,
    MESSAGE: SNACK_BAR_MESSAGE,
    ACTION: SNACK_BAR_ACTION,
  } = SNACK_BAR;
  const showGlobalSnackBar = (params: {
    message: string;
    action?: SnackBarActionType;
  }) => {
    const {
      message,
      action = {
        label: "",
        onPress: () => {},
      },
    } = params;
    globalDispatch(
      globalActions.setGlobalSnackBar({
        message,
        isShowSnackBar: true,
        action,
      })
    );
  };
  const hideGlobalSnackBar = () => {
    globalDispatch(
      globalActions.setGlobalSnackBar({
        message: "",
        isShowSnackBar: false,
        action: {
          label: "",
          onPress: () => {},
        },
      })
    );
  };

  return {
    IS_SHOW_SNACK_BAR,
    SNACK_BAR_MESSAGE,
    SNACK_BAR_ACTION,
    showGlobalSnackBar,
    hideGlobalSnackBar,
  };
};
