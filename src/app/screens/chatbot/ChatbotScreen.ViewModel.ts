import { convertToBotResponseModel } from "@core/utils";
import { BotResponseType, useGlobalState } from "@core";
import { useMemo, useState } from "react";
import type { IMessage } from "react-native-gifted-chat";
import { GiftedChat } from "react-native-gifted-chat";
import { Dialogflow_V2 } from "react-native-dialogflow";
import { BOT } from "./const";

export const useViewModel = (params: any) => {
  const { USER_INFO } = useGlobalState();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { NickName, UserId, ProfilePicUrl } = USER_INFO;

  const USER = useMemo(() => {
    return {
      _id: UserId,
      name: NickName,
      avatar: ProfilePicUrl,
    };
  }, [NickName, ProfilePicUrl, UserId]);

  const handleBotTextMessage = (text: string) => {
    const newMessage = {
      _id: messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT,
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [newMessage])
    );
  };

  const handleBotResponse = (result: any) => {
    try {
      // const text = result.queryResult.fulfillmentMessages[0].text.text[0];
      const botMessage = convertToBotResponseModel(result);
      console.log("botMessage asdasd", botMessage);
      if (botMessage.type === BotResponseType.TEXT) {
        handleBotTextMessage(botMessage.message);
      } else if (botMessage.type === BotResponseType.RECOMMEND_BOOK) {
        console.log("book recommend", botMessage);
        handleBotTextMessage(botMessage.message);
        // handle recommendation
      }
    } catch (err) {
      console.log("bot response err", err);
    }
  };

  const onSend = (_messages: IMessage[]) => {
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
    handleBotTextMessage(replies[0].value);
  };

  return {
    USER,
    onSend,
    messages,
    setMessages,
  };
};
