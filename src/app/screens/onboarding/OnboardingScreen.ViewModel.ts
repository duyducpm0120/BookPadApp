import { useGlobalNavigation } from "@core";
import { useLogInService } from "@core/services";

const defaultDependencies = {
  useLogInService,
};
export const useViewModel = (dependencies = defaultDependencies) => {
  const { navigateToLoginScreen } = useGlobalNavigation();

  const navigate = async () => {
    navigateToLoginScreen();
  };
  return {
    navigate,
  };
};
