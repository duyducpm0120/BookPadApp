import type { BookModel } from "@core";

export type BookPropsType = {
  data: BookModel;
  onPress?: () => void;
  readingData?: {
    isShowReadingStatus: boolean;
    readingStatus: number;
  };
};
