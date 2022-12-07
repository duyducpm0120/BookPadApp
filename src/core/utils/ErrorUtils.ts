import { ErrorCodeMessage } from "@core/const";
import { safeGetNumber, safeGetString } from "./CommonUtils";

export const getMessageFromError = (error: any): string => {
  const message = safeGetString(error, "response.data.message", "");
  if (message !== "") return message;
  const errStatus = safeGetNumber(error, "response.status", 500);
  return ErrorCodeMessage[errStatus] || "Unknown error";
};
