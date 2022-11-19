import { useGlobalState } from "@core";

export const useViewModel = (props: any) => {
  const { USER_INFO, BOOKS } = useGlobalState();
  return {
    selectors: {
      USER_INFO,
      BOOKS,
    },
  };
};
