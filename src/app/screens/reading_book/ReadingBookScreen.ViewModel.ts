import type { BookModel } from "@core";
import { useGlobalState } from "@core";
import { useGetBookDownLoadLink } from "@core/services/BookServices";
import { useState } from "react";
import { useMount } from "../../../core/hooks/useMount";

export const useViewModel = (params: { bookData: BookModel }) => {
  const { bookData } = params;
  const { BookId } = bookData;
  const { mutateAsync, reset } = useGetBookDownLoadLink({
    bookId: bookData.BookId,
  });
  const { TOKEN } = useGlobalState();

  const [bookDownloadLink, setBookDownloadLink] = useState("");

  useMount(async () => {
    const result = await mutateAsync({ bookId: BookId, token: TOKEN });
    setBookDownloadLink(result.downloadLink);
  });
  return {
    bookData,
    bookDownloadLink,
  };
};
