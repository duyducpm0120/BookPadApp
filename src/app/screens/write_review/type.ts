import type { BookModel } from "@core";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type WriteReviewScreenProps = {
  navigation: NativeStackNavigationProp<any, string, undefined>;
  route: {
    key: string;
    name: string;
    params: WriteReviewScreenParams;
    path: any;
  };
};

export type WriteReviewScreenParams = {
  bookData: BookModel;
};
