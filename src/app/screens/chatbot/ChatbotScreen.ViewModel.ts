import {
  convertToBotResponseModel,
  convertToGiftedChatMessage,
} from "@core/utils";
import type { BookModel } from "@core";
import { BotResponseType, useGlobalState } from "@core";
import { useMemo, useState } from "react";
import type { User } from "react-native-gifted-chat";
import { GiftedChat } from "react-native-gifted-chat";
import { Dialogflow_V2 } from "react-native-dialogflow";
import { getRecommendBooks } from "@core/services";
import type { BotResponseModel } from "../../../core/models/BotResponseModel";
import { BOT } from "./const";
import type { IChatbotMessage } from "./types";

export const useViewModel = (params: any) => {
  const { USER_INFO, TOKEN } = useGlobalState();
  const [messages, setMessages] = useState<IChatbotMessage[]>([]);
  const { NickName, UserId, ProfilePicUrl } = USER_INFO;
  const [recommendBooks, setRecommendBooks] = useState<BookModel[]>([]);

  const USER: User = useMemo(() => {
    return {
      _id: UserId,
      name: NickName,
      avatar: ProfilePicUrl,
    };
  }, [NickName, ProfilePicUrl, UserId]);

  const getUserRecommendBooks = async () => {
    const books = await getRecommendBooks({ token: TOKEN, numberOfBooks: 3 });
    return books;
  };

  const handleBotTextMessage = (message: string) => {
    const newMessage = convertToGiftedChatMessage({
      message,
      index: messages.length + 1,
      user: BOT,
      type: BotResponseType.TEXT,
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [newMessage])
    );
  };

  const handleBotMessage = async (message: BotResponseModel) => {
    const books = await getUserRecommendBooks();
    const newMessage = convertToGiftedChatMessage({
      message: message.message,
      index: messages.length + 2,
      user: BOT,
      type: message.type,
      data: books,
    });

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [newMessage])
    );
  };

  const handleBotResponse = async (result: any) => {
    try {
      // const text = result.queryResult.fulfillmentMessages[0].text.text[0];
      const botMessage = convertToBotResponseModel(result);
      // console.log("botMessage asdasd", botMessage);
      if (botMessage.type === BotResponseType.TEXT) {
        handleBotMessage(botMessage);
      } else if (botMessage.type === BotResponseType.RECOMMEND_BOOK) {
        console.log("book recommend", botMessage);
        handleBotTextMessage(botMessage.message);
        await handleBotMessage(botMessage);
        // handle recommendation
      }
    } catch (err) {
      console.log("bot response err", err);
    }
  };

  const onSend = (_messages: IChatbotMessage[]) => {
    console.log("onSend", _messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, _messages)
    );
    const message = _messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      (result) => handleBotResponse(result),
      (error) => console.log(error)
    );
  };

  const onQuickReply = (replies: any) => {
    console.log("onQuickReply", replies);
    handleBotMessage(replies[0].value);
  };

  return {
    USER,
    onSend,
    messages,
    setMessages,
  };
};
