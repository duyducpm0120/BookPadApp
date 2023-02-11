import type { BookModel } from "@core";
import { useMount } from "@core";
import { useState } from "react";
import type { BookReadStatus } from "@core/services";
import { getBookReadStatus } from "@core/services";

export const useViewModel = (params: { data: BookModel }) => {
  const { data } = params;

  const [readStatus, setReadStatus] = useState<BookReadStatus>({
    bookId: data.BookId,
    progress: 0,
    currentLocation: "",
    currentPage: 0,
    totalLocation: 0,
  });
  const getReadStatus = async () => {
    try {
      const status = await getBookReadStatus({ bookId: data.BookId });
      setReadStatus(status);
    } catch (err) {
      // console.log("get read status err", err);
    }
  };
  useMount(async () => {
    await getReadStatus();
  });
  return {
    readStatus,
  };
};
