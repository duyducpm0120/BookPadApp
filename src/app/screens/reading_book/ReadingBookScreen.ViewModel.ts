import type { BookModel } from "@core";
import { useMount, useGlobalState } from "@core";
import { useState } from "react";
import {
  getBookReadStatus,
  saveBookReadStatus,
  useGetBookDownLoadLink,
} from "@core/services";

export const useViewModel = (params: { bookData: BookModel }) => {
  const { bookData } = params;
  const { BookId } = bookData;
  const { mutateAsync, reset } = useGetBookDownLoadLink({
    bookId: bookData.BookId,
  });
  const { TOKEN } = useGlobalState();
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [bookDownloadLink, setBookDownloadLink] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const getReadStatus = async () => {
    try {
      const status = await getBookReadStatus({ bookId: BookId });
      setCurrentLocation(status.currentLocation);
      setCurrentProgress(status.progress);
      setTotalPage(status.totalLocation);
      setCurrentPage(status.currentPage);
    } catch (err) {
      // console.log("get read status err", err);
    }
  };

  const saveReadStatus = async (_params: {
    currentLocation: string;
    progress: number;
    totalLocation: number;
    currentPage: number;
  }) => {
    try {
      await saveBookReadStatus({
        bookId: BookId,
        currentLocation: _params.currentLocation,
        progress: _params.progress,
        totalLocation: _params.totalLocation,
        currentPage: _params.currentPage,
      });
    } catch (err) {
      console.log("saveReadStatus err", err);
    }
  };

  useMount(async () => {
    await getReadStatus();
    const result = await mutateAsync({ bookId: BookId, token: TOKEN });
    setBookDownloadLink(result.downloadLink);
  });
  return {
    bookData,
    bookDownloadLink,
    saveReadStatus,
    getReadStatus,
    currentLocation,
    currentProgress,
    setCurrentLocation,
    currentPage,
    totalPage,
    setCurrentPage,
    setTotalPage,
  };
};
