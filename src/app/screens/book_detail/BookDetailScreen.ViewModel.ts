import type { BookModel } from "@core";
import { useGlobalState } from "@core";
import { useGetBookDownLoadLink } from "@core/services/BookServices";
import { useCallback } from "react";
import { useGlobalLoading } from "../../../core/hooks/useGlobalLoading";

export const useViewModel = (params: { bookData: BookModel }) => {
  const { bookData } = params;
  const { BookId } = bookData;
  const { TOKEN } = useGlobalState();
  const { mutateAsync, reset } = useGetBookDownLoadLink({
    bookId: bookData.BookId,
  });
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();
  const fetchBookDownLoadLink = useCallback(async () => {
    showGlobalLoading();
    const result = await mutateAsync({ bookId: BookId, token: TOKEN });
    hideGlobalLoading();
    // setBookDownloadLink(result.downloadLink);
    return result.downloadLink;
  }, [BookId, TOKEN, hideGlobalLoading, mutateAsync, showGlobalLoading]);

  return {
    bookData,
    fetchBookDownLoadLink,
  };
};
