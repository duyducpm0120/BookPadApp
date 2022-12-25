import { BotResponseType, strings } from "@core/assets";
import { BotResponseModel } from "@core/models";
import type { User } from "react-native-gifted-chat";
import type { BookModel } from "../models/BookModel";
import { safeGet, safeGetString } from "./CommonUtils";

export interface BotPayloadType {
  type: BotResponseType;
  message: string;
  value: string;
}

export const convertToBotResponseModel = (response: any): BotResponseModel => {
  const message = safeGet(
    response,
    "queryResult.fulfillmentMessages[0].text.text[0]",
    strings.sorry_im_busy // default message if bot can't response
  );

  // với các action cần xử lý, ta sẽ trả về payload
  const payload: BotPayloadType = safeGet(
    response,
    "queryResult.fulfillmentMessages[0].payload",
    null
  );

  if (payload) {
    let parameters = "";
    switch (
      payload.type // với các action đặc biệt cần lấy thêm value từ response parameters
    ) {
      case BotResponseType.SEARCH_BOOK_BY_CATEGORY:
        parameters = safeGetString(
          response,
          "queryResult.parameters.book_category",
          ""
        );
        break;
      case BotResponseType.SEARCH_BOOK_BY_AUTHOR:
        parameters = safeGetString(
          response,
          "queryResult.parameters.author.name",
          ""
        );
        break;
      default:
        break;
    }
    // nếu có payload thì trả về payload với value là parameters
    return BotResponseModel.instantiate({ ...payload, value: parameters });
  }
  return {
    // nếu không có payload thì trả về message - sys action default của bot
    type: BotResponseType.TEXT,
    message,
    value: "",
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
