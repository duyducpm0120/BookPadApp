import type { AlertButton } from "react-native";
import { Alert } from "react-native";
import { safeGetNumber } from "./CommonUtils";
import { getMessageFromErrorStatus } from "./ErrorUtils";

export type BPAlertParams = {
  //
  title: string;
  message: string;
  primaryButtonParams?: {
    label: string;
    onPress: () => void;
  };
  secondaryButtonParams?: {
    label: string;
    onPress: () => void;
  };
};

export type BPErrorAlertParams = {
  //
  title: string;
  primaryButtonParams?: {
    text: string;
    onPress: () => void;
  };
  secondaryButtonParams?: {
    text: string;
    onPress: () => void;
  };
  error: any;
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
      text: primaryButtonParams.label,
      onPress: primaryButtonParams.onPress,
    });
  }
  if (secondaryButtonParams) {
    alertButtons.push({
      text: secondaryButtonParams.label,
      onPress: secondaryButtonParams.onPress,
    });
  }
  Alert.alert(title, message, alertButtons, {
    cancelable: false,
    onDismiss: () => {},
  });
};

export const showErrorAlert = (params: BPErrorAlertParams) => {
  const {
    title,
    primaryButtonParams = null,
    secondaryButtonParams = null,
    error,
  } = params;
  const errStatus = safeGetNumber(error, "response.status", 500);
  const message = getMessageFromErrorStatus(errStatus);
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
