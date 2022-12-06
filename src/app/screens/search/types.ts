import type { BookModel } from "@core";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type SearchScreenProps = {
  //
  navigation: NativeStackNavigationProp<any, string, undefined>;
  route: {
    key: string;
    name: string;
    params: SearchScreenParams;
    path: any;
  };
};

export type SearchScreenParams = {
  bookData: BookModel;
};
