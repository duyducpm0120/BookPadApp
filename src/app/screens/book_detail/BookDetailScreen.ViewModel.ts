import type { BookModel } from "@core";
import { showErrorAlert, strings, useGlobalState } from "@core";
import { useGetBookDownLoadLink } from "@core/services/BookServices";
import { useCallback } from "react";

export const useViewModel = (params: { bookData: BookModel }) => {
  const { bookData } = params;
  const { BookId } = bookData;
  const { TOKEN } = useGlobalState();
  const { mutateAsync, reset } = useGetBookDownLoadLink({
    bookId: bookData.BookId,
  });
  const fetchBookDownLoadLink = useCallback(async () => {
    try {
      // showGlobalLoading();
      const result = await mutateAsync({ bookId: BookId, token: TOKEN });
      // hideGlobalLoading();
      // setBookDownloadLink(result.downloadLink);
      return result.downloadLink;
    } catch (err) {
      // hideGlobalLoading();
      showErrorAlert({
        title: strings.get_book_link_failed,
        error: err,
        primaryButtonParams: {
          text: "OK",
          onPress: () => {},
        },
      });
      return "";
    }
  }, [BookId, TOKEN, mutateAsync]);

  return {
    bookData,
    fetchBookDownLoadLink,
  };
};
