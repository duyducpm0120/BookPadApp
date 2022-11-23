import type { BookModel } from "@core";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type ReadingBookScreenProps = {
  //
  navigation: NativeStackNavigationProp<any, string, undefined>;
  route: {
    key: string;
    name: string;
    params: ReadingBookScreenParams;
    path: any;
  };
};

export type ReadingBookScreenParams = {
  bookData: BookModel;
  bookDownLoadLink: string;
};
