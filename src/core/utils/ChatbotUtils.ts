import { BotResponseType } from "@core/assets";
import { BotResponseModel } from "@core/models";
import type { User } from "react-native-gifted-chat";
import type { BookModel } from "../models/BookModel";
import { safeGet } from "./CommonUtils";

export const convertToBotResponseModel = (response: any): BotResponseModel => {
  const message = safeGet(
    response,
    "queryResult.fulfillmentMessages[0].text.text[0]",
    {}
  );
  try {
    const botResponse = JSON.parse(message);
    return BotResponseModel.instantiate(botResponse);
  } catch (err) {
    return {
      type: BotResponseType.TEXT,
      message,
    };
  }
};

export const convertToGiftedChatMessage = (params: {
  message: string;
  index: number;
  user: User;
  bookList?: BookModel[];
  type: BotResponseType;
}) => {
  const { message, index, user, bookList = [], type } = params;
  return {
    _id: index,
    text: message,
    createdAt: new Date(),
    user,
    type,
    bookList,
  };
};
