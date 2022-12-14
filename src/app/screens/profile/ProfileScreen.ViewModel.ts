import {
  getMessageFromError,
  showAlert,
  strings,
  useGlobalLoading,
  useGlobalNavigation,
  useGlobalSnackBar,
  useGlobalState,
} from "@core";
import { updateProfilePic } from "@core/services/UserProfileService";
import { isNil } from "lodash";
import { BackHandler } from "react-native";
import type { ImagePickerResponse } from "react-native-image-picker";
import { useLogin } from "../../../core/hooks/useLogin";

export const useViewModel = () => {
  const { USER_INFO } = useGlobalState();
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();
  const { TOKEN } = useGlobalState();
  const { showGlobalSnackBar } = useGlobalSnackBar();
  const { resetToHomeScreen } = useGlobalNavigation();

  const { loginWithToken } = useLogin();

  const updateUserProfile = async (response: ImagePickerResponse) => {
    // dispatch(updateIsLoading(true));
    if (isNil(response.assets)) return;
    try {
      showGlobalLoading();
      await updateProfilePic(response.assets[0], TOKEN);
      hideGlobalLoading();
      showGlobalSnackBar({
        message: strings.upload_image_succes,
      });
      await loginWithToken();
      resetToHomeScreen();
    } catch (err) {
      //
      hideGlobalLoading();
      showAlert({
        title: strings.upload_image_fail,
        message: getMessageFromError(err),
        secondaryButtonParams: {
          label: strings.exit,
          onPress: () => {
            BackHandler.exitApp();
          },
        },
        primaryButtonParams: {
          label: strings.retry,
          onPress: async () => {
            updateUserProfile(response);
          },
        },
      });
    }
  };
  return {
    selectors: {
      USER_INFO,
    },
    handlers: {
      updateUserProfile,
    },
  };
};
