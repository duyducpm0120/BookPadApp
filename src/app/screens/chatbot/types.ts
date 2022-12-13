import type { BookModel, BotResponseType } from "@core";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { IMessage } from "react-native-gifted-chat";

export type BookDetailScreenProps = {
  //
  navigation: NativeStackNavigationProp<any, string, undefined>;
  route: {
    key: string;
    name: string;
    params: BookDetailScreenParams;
    path: any;
  };
};

export type BookDetailScreenParams = {
  bookData: BookModel;
};

export type IChatbotMessage = IMessage & {
  type: BotResponseType;
  bookList: BookModel[];
};
