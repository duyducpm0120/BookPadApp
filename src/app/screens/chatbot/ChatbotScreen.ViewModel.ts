/* eslint-disable no-console */
import {
  convertToBotResponseModel,
  convertToGiftedChatMessage,
} from "@core/utils";
import type { BookModel, BotResponseModel } from "@core";
import { useMount, BotResponseType, useGlobalState } from "@core";
import { useMemo, useState } from "react";
import type { User } from "react-native-gifted-chat";
import { GiftedChat } from "react-native-gifted-chat";
import { Dialogflow_V2 } from "react-native-dialogflow";
import { getRecommendBooks, searchBook } from "@core/services";
import { BOT } from "./const";
import type { IChatbotMessage } from "./types";

const NUMBER_OF_RECOMMEND_BOOKS = 20;
const NUMBER_OF_RECOMMEND_BOOKS_PER_PAGE = 3;
export const useViewModel = (params: any) => {
  const { USER_INFO, TOKEN } = useGlobalState();
  const [messages, setMessages] = useState<IChatbotMessage[]>([]);
  const { NickName, UserId, ProfilePicUrl } = USER_INFO;
  const [recommendBooks, setRecommendBooks] = useState<BookModel[]>([]);
  const [recommendBooksPage, setRecommendBooksPage] = useState(0); // page index of recommend books - use for show more option

  const USER: User = useMemo(() => {
    return {
      _id: UserId,
      name: NickName,
      avatar: ProfilePicUrl,
    };
  }, [NickName, ProfilePicUrl, UserId]);

  const getUserRecommendBooks = async () => {
    try {
      const books = await getRecommendBooks({
        token: TOKEN,
        numberOfBooks: NUMBER_OF_RECOMMEND_BOOKS,
      });
      setRecommendBooksPage(1);
      setRecommendBooks(books);
      return books.slice(0, NUMBER_OF_RECOMMEND_BOOKS_PER_PAGE);
    } catch (err) {
      return [];
    }
  };

  const searchBookByValue = async (value: string) => {
    try {
      const books = await searchBook({
        token: TOKEN,
        searchValue: value,
        lastBookId: 0,
        limit: NUMBER_OF_RECOMMEND_BOOKS,
      });
      setRecommendBooksPage(1);
      setRecommendBooks(books);
      return books.slice(0, NUMBER_OF_RECOMMEND_BOOKS_PER_PAGE);
    } catch (err) {
      return [];
    }
  };

  const handleBotTextMessage = (message: BotResponseModel) => {
    const botMessage = message.message;
    const newMessage = convertToGiftedChatMessage({
      message: botMessage,
      index: messages.length + 1,
      user: BOT,
      type: BotResponseType.TEXT,
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [newMessage])
    );
  };

  const handleBotRecommendBookMessage = async (message: BotResponseModel) => {
    handleBotTextMessage(message); // bot will send message first, then handle more actions
    const books = await getUserRecommendBooks();
    const newMessage = convertToGiftedChatMessage({
      message: message.message,
      index: messages.length + 2,
      user: BOT,
      type: message.type,
      bookList: books,
    });

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [newMessage])
    );
  };

  const handleBotRecommendMoreBookMessage = async (
    message: BotResponseModel
  ) => {
    // handleBotTextMessage(message);
    const newMessage = convertToGiftedChatMessage({
      message: message.message,
      index: messages.length + 2,
      user: BOT,
      type: message.type,
      bookList: recommendBooks.slice(
        recommendBooksPage * NUMBER_OF_RECOMMEND_BOOKS_PER_PAGE,
        (recommendBooksPage + 1) * NUMBER_OF_RECOMMEND_BOOKS_PER_PAGE
      ),
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [newMessage])
    );
    setRecommendBooksPage(recommendBooksPage + 1);
  };

  const handleSearchBookByCategory = async (message: BotResponseModel) => {
    handleBotTextMessage({
      ...message,
      message: message.message.replace("<category>", message.value),
    }); // bot will send message first, then handle more actions
    const books = await searchBookByValue(message.value);
    const newMessage = convertToGiftedChatMessage({
      message: message.message,
      index: messages.length + 2,
      user: BOT,
      type: message.type,
      bookList: books,
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [newMessage])
    );
    setRecommendBooksPage(recommendBooksPage + 1);
  };

  const handleSearchBookByCategoryMore = async (message: BotResponseModel) => {
    // handleBotTextMessage(message);
    const newMessage = convertToGiftedChatMessage({
      message: message.message,
      index: messages.length + 2,
      user: BOT,
      type: message.type,
      bookList: recommendBooks.slice(
        recommendBooksPage * NUMBER_OF_RECOMMEND_BOOKS_PER_PAGE,
        (recommendBooksPage + 1) * NUMBER_OF_RECOMMEND_BOOKS_PER_PAGE
      ),
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [newMessage])
    );
    setRecommendBooksPage(recommendBooksPage + 1);
  };

  const handleSearchBookByAuthor = async (message: BotResponseModel) => {
    handleBotTextMessage({
      ...message,
      message: message.message.replace("<author>", message.value),
    }); // bot will send message first, then handle more actions
    const books = await searchBookByValue(message.value);
    const newMessage = convertToGiftedChatMessage({
      message: message.message,
      index: messages.length + 2,
      user: BOT,
      type: message.type,
      bookList: books,
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [newMessage])
    );
    setRecommendBooksPage(recommendBooksPage + 1);
  };

  const handleSearchBookByAuthorMore = async (message: BotResponseModel) => {
    // handleBotTextMessage(message);
    const newMessage = convertToGiftedChatMessage({
      message: message.message,
      index: messages.length + 2,
      user: BOT,
      type: message.type,
      bookList: recommendBooks.slice(
        recommendBooksPage * NUMBER_OF_RECOMMEND_BOOKS_PER_PAGE,
        (recommendBooksPage + 1) * NUMBER_OF_RECOMMEND_BOOKS_PER_PAGE
      ),
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [newMessage])
    );
    setRecommendBooksPage(recommendBooksPage + 1);
  };

  const handleBotResponse = async (botResponse: any) => {
    try {
      console.log("botResponse", botResponse);
      const botMessage = convertToBotResponseModel(botResponse);
      console.log("bot converted Message", botMessage);
      switch (botMessage.type) {
        case BotResponseType.TEXT:
          handleBotTextMessage(botMessage);
          break;
        case BotResponseType.RECOMMEND_BOOK:
          await handleBotRecommendBookMessage(botMessage);
          break;
        case BotResponseType.RECOMMEND_BOOK_MORE:
          handleBotRecommendMoreBookMessage(botMessage);
          break;
        case BotResponseType.SEARCH_BOOK_BY_CATEGORY:
          handleSearchBookByCategory(botMessage);
          break;
        case BotResponseType.SEARCH_BOOK_BY_AUTHOR:
          handleSearchBookByAuthor(botMessage);
          break;
        case BotResponseType.SEARCH_BOOK_BY_CATEGORY_MORE:
          handleSearchBookByCategoryMore(botMessage);
          break;
        case BotResponseType.SEARCH_BOOK_BY_AUTHOR_MORE:
          handleSearchBookByAuthorMore(botMessage);
          break;
        default:
          break;
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
    handleBotRecommendBookMessage(replies[0].value);
  };

  const sendWelcomeMessage = () => {
    try {
      Dialogflow_V2.requestQuery(
        "Hello",
        (result) => handleBotResponse(result),
        (error) => console.log(error)
      );
    } catch (err) {
      console.log("send first message to chatbot err");
    }
  };
  useMount(() => {
    sendWelcomeMessage();
  });

  return {
    USER,
    onSend,
    messages,
    setMessages,
  };
};
