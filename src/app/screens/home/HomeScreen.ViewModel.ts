import type { AppTabEnum } from "@core";
import { globalActions, useGlobalDispatch, useGlobalState } from "@core";

export const useViewModel = (props: any) => {
  const globalDispatch = useGlobalDispatch();
  const { USER_INFO, BOOKS, CURRENT_TAB } = useGlobalState();
  const setGlobalCurrentTab = (tab: AppTabEnum) => {
    globalDispatch(globalActions.setGlobalCurrentTab(tab));
  };
  return {
    selectors: {
      CURRENT_TAB,
    },
    handlers: {
      setGlobalCurrentTab,
    },
  };
};
