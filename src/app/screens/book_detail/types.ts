import type { BookModel } from "@core";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
