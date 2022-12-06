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
  type: SearchScreenType;
  keyword?: string;
  id?: number;
};

export enum SearchScreenType {
  BOOK_NAME = "BOOK_NAME",
  CATEGORY = "CATEGORY",
  AUTHOR = "AUTHOR",
}
