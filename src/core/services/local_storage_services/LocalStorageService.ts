import { safeGetNumber, safeGetString } from "@core/utils";
import { CacheKeyEnum } from "@core/const";
import LocalStorageHelper from "@core/utils/LocalStorageHelper";

export const getToken = async () => {
  const token = await LocalStorageHelper.getItem(CacheKeyEnum.TOKEN);
  return token;
};

export interface BookReadStatus {
  bookId: string;
  currentLocation: string;
  progress: number;
}

export const saveBookReadStatus = async (params: {
  bookId: string;
  currentLocation: string;
  progress: number;
}) => {
  const { bookId, currentLocation, progress } = params;

  const readStatus: BookReadStatus = {
    bookId,
    currentLocation,
    progress,
  };

  // console.log("read status asdasd", readStatus);
  LocalStorageHelper.setItem(
    CacheKeyEnum.READ_BOOK + bookId,
    JSON.stringify(readStatus)
  );
};

export const getBookReadStatus = async (params: { bookId: string }) => {
  const { bookId } = params;

  const res: string = await LocalStorageHelper.getItem(
    CacheKeyEnum.READ_BOOK + bookId
  );
  const json: BookReadStatus = JSON.parse(res);

  const id = safeGetString(json, "bookId", "");
  const currentLocation = safeGetString(json, "currentLocation", "");
  const progress = safeGetNumber(json, "progress", 0);
  const bookReadStatus: BookReadStatus = {
    bookId: id,
    currentLocation,
    progress,
  };
  // console.log("bookReadStatus asdasd", bookReadStatus);
  return bookReadStatus;
};
