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

  // với các action cần xử lý, ta sẽ trả về payload
  const payload = safeGet(
    response,
    "queryResult.fulfillmentMessages[0].payload",
    null
  );
  // try {
  //   const botResponse = JSON.parse(message);
  //   return BotResponseModel.instantiate(botResponse);
  // } catch (err) {
  //   return {
  //     type: BotResponseType.TEXT,
  //     message,
  //   };
  // }

  if (payload) {
    // nếu có payload thì trả về payload
    return BotResponseModel.instantiate(payload);
  }
  return {
    // nếu không có payload thì trả về message - sys action default của bot
    type: BotResponseType.TEXT,
    message,
  };
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
