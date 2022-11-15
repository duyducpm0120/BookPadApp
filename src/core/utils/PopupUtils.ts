import type { AlertButton } from "react-native";
import { Alert } from "react-native";

export type BPAlertParams = {
  //
  title: string;
  message: string;
  primaryButtonParams?: {
    text: string;
    onPress: () => void;
  };
  secondaryButtonParams?: {
    text: string;
    onPress: () => void;
  };
};

export const showAlert = (params: BPAlertParams) => {
  const {
    title,
    message,
    primaryButtonParams = null,
    secondaryButtonParams = null,
  } = params;
  const alertButtons: AlertButton[] = [];
  if (primaryButtonParams) {
    alertButtons.push({
      text: primaryButtonParams.text,
      onPress: primaryButtonParams.onPress,
    });
  }
  if (secondaryButtonParams) {
    alertButtons.push({
      text: secondaryButtonParams.text,
      onPress: secondaryButtonParams.onPress,
    });
  }
  Alert.alert(title, message, alertButtons, {
    cancelable: false,
    onDismiss: () => {},
  });
};
