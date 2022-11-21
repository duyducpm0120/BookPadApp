import {
  globalActions,
  safeGetNumber,
  strings,
  useGlobalDispatch,
  useGlobalLoading,
  useGlobalNavigation,
  useGlobalSnackBar,
  useGlobalState,
} from "@core";
import { useLogInService } from "@core/services";
import { getMessageFromErrorStatus } from "@core/utils/ErrorUtils";
import { showAlert } from "@core/utils/PopupUtils";
import { useMount } from "../../../core/hooks/useMount";

const defaultDependencies = {
  useLogInService,
};
export const useViewModel = (dependencies = defaultDependencies) => {
  const { TOKEN } = useGlobalState();
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();
  const { navigateToLoginScreen, navigateToHomeScreen } = useGlobalNavigation();
  const { mutateAsync, reset } = dependencies.useLogInService();
  const { showGlobalSnackBar } = useGlobalSnackBar();

  const globalDispatch = useGlobalDispatch();

  const login = async () => {
    try {
      showGlobalLoading();
      const result = await mutateAsync(
        {
          email: "vuong.dt.23@gmail.com",
          password: "emmawatson",
        },
        {
          onSuccess: () => {},
          onError: (err) => {},
        }
      );
      hideGlobalLoading();
      showGlobalSnackBar({
        message: strings.loginSuccessMessage,
      });
      globalDispatch(globalActions.setGlobalToken(result.token));
      globalDispatch(globalActions.setGlobalBooks(result.books));
      globalDispatch(globalActions.setGlobalUserInfo(result.userInfo));
      navigateToHomeScreen();
    } catch (err: any) {
      hideGlobalLoading();
      const errStatus = safeGetNumber(err, "response.status", 500);
      showAlert({
        title: strings.loginFailed,
        message: getMessageFromErrorStatus(errStatus),
        primaryButtonParams: {
          text: "OK",
          onPress: () => {},
        },
      });
    }
  };

  useMount(async () => {
    if (TOKEN !== "") {
      await login();
      navigateToHomeScreen();
      //   navigateToHomeScreen();
    }
  });

  const navigate = async () => {
    navigateToLoginScreen();
  };
  return {
    navigate,
  };
};
