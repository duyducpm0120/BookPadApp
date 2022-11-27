import { useGlobalState } from "@core";

export const useViewModel = () => {
  const { USER_INFO } = useGlobalState();
  return {
    selectors: {
      USER_INFO,
    },
  };
};
