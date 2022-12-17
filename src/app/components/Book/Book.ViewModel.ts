import type { BookModel } from "@core";
import { useMount } from "@core";
import { useState } from "react";
import { getBookReadStatus } from "@core/services";

export const useViewModel = (params: { data: BookModel }) => {
  const { data } = params;
  const [progress, setProgress] = useState<number>(0);
  const getReadStatus = async () => {
    try {
      const status = await getBookReadStatus({ bookId: data.BookId });
      setProgress(status.progress);
    } catch (err) {
      console.log("get read status err", err);
    }
  };
  useMount(async () => {
    await getReadStatus();
  });
  return {
    progress,
  };
};
