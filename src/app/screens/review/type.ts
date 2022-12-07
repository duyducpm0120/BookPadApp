import type { BookModel } from "@core";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type ReviewScreenProps = {
  navigation: NativeStackNavigationProp<any, string, undefined>;
  route: {
    key: string;
    name: string;
    params: ReviewScreenParams;
    path: any;
  };
};

export type ReviewScreenParams = {
  bookData: BookModel;
};
