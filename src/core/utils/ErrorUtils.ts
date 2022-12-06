import { ErrorCodeMessage } from "@core/const";
import { safeGetNumber } from "./CommonUtils";

export const getMessageFromError = (error: any): string => {
  const errStatus = safeGetNumber(error, "response.status", 500);
  return ErrorCodeMessage[errStatus] || "Unknown error";
};
