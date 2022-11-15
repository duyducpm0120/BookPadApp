import { ErrorCodeMessage } from "@core/const";

export const getMessageFromErrorStatus = (error: number): string => {
  return ErrorCodeMessage[error] || "Unknown error";
};
