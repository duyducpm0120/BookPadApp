import {
  useGlobalState,
  useGlobalDispatch,
  clearStorageToken,
  globalActions,
} from "@core";

export const useViewModel = () => {
  const { USER_INFO, BOOKS } = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const logout = () => {
    clearStorageToken();
    globalDispatch(globalActions.setGlobalToken(""));
  };
  return {
    selectors: {
      USER_INFO,
      BOOKS,
    },
    handlers: {
      logout,
    },
  };
};
