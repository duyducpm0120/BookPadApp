import type { BookModel } from "@core";
import type { BookReadStatus } from "@core/services";

export type BookPropsType = {
  data: BookModel;
  onPress?: () => void;
  readingData?: {
    isShowReadingStatus: boolean;
    readingStatus: number;
  };
  isHorizontal?: boolean;
};

export interface BookHandles {
  getReadStatus: () => BookReadStatus;
}
