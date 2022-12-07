import type { BookModel } from "@core";
import {
  strings,
  useGlobalSnackBar,
  getMessageFromError,
  showAlert,
  useGlobalLoading,
  useGlobalState,
} from "@core";
import { createBookReview } from "@core/services";

import { useState } from "react";

export const useViewModel = (props: { bookData: BookModel }) => {
  const { bookData } = props;
  const [reviews, setReviews] = useState<any[]>([]);
  const [currentStar, setCurrentStar] = useState(5);
  const [comment, setComment] = useState<string>("");
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();
  const { TOKEN } = useGlobalState();
  const { showGlobalSnackBar } = useGlobalSnackBar();
  const createReview = async () => {
    try {
      showGlobalLoading();
      const res = await createBookReview({
        token: TOKEN,
        score: currentStar,
        comment,
        bookId: bookData.BookId,
      });
      console.log("createReview res asdasd", res);
      hideGlobalLoading();
      showGlobalSnackBar({
        message: strings.createReviewSuccess,
      });
    } catch (err: any) {
      hideGlobalLoading();
      showAlert({
        title: "Error",
        message: getMessageFromError(err),
      });
    }
  };

  return {
    reviews,
    setReviews,
    currentStar,
    setCurrentStar,
    comment,
    setComment,
    createReview,
  };
};
