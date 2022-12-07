import type { BookModel } from "@core";
import {
  strings,
  getMessageFromError,
  showAlert,
  useGlobalState,
  useGlobalLoading,
  useMount,
} from "@core";
import type { ReviewModel } from "@core/models/ReviewModel";
import { getBookReview } from "@core/services";
import { useState } from "react";

export const useViewModel = (props: { bookData: BookModel }) => {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const { bookData } = props;
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();
  const { TOKEN } = useGlobalState();

  // const loadMoreBookByName = async () => {
  //   try {
  //     const res = await searchBook({
  //       token: TOKEN,
  //       lastBookId,
  //       limit: 10,
  //       bookName: searchText,
  //     });
  //     if (res.length === 0) {
  //       return;
  //     }
  //     setSearchResult([...searchResult, ...res]);
  //     setLastBookId(Number(res[res.length - 1].BookId));
  //   } catch (err) {
  //     showAlert({
  //       title: "Error",
  //       message: getMessageFromError(err),
  //     });
  //   }
  // };

  const loadMoreReview = async () => {
    try {
      const res = await getBookReview({
        token: TOKEN,
        lastBookId: Number(reviews[reviews.length - 1].BookId),
        limit: 5,
        bookId: bookData.BookId,
      });
      if (res.length === 0) {
        return;
      }
      setReviews([...reviews, ...res]);
    } catch (err) {
      showAlert({
        title: strings.error,
        message: getMessageFromError(err),
      });
    }
  };

  useMount(async () => {
    try {
      showGlobalLoading();
      const res = await getBookReview({
        token: TOKEN,
        lastBookId: 0,
        limit: 5,
        bookId: bookData.BookId,
      });
      if (res.length === 0) {
        hideGlobalLoading();
        return;
      }
      setReviews(res);
      hideGlobalLoading();
    } catch (err) {
      hideGlobalLoading();
      showAlert({
        title: "Error",
        message: getMessageFromError(err),
      });
    }
  });
  return {
    reviews,
    setReviews,
    loadMoreReview,
  };
};
