import { BaseScreen } from "@app/components";
import { Reader, ReaderProvider } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/file-system";
import React from "react";
import { useWindowDimensions, View } from "react-native";
import type { ReadingBookScreenProps } from "./types";

export const ReadingBookScreen: React.FC<any> = (
  props: ReadingBookScreenProps
) => {
  const { navigation, route } = props;
  const { width, height } = useWindowDimensions();
  const { bookData, bookDownLoadLink } = route.params;
  // const { bookData: data, bookDownloadLink } = useViewModel({ bookData });
  // const { changeFontFamily } = useReader();

  const renderReader = () => {
    try {
      return (
        <Reader
          src={bookDownLoadLink}
          width={width}
          height={height * 0.8}
          fileSystem={useFileSystem}
          enableSwipe
          enableSelection
        />
      );
    } catch (err) {
      return <View />;
    }
  };

  return (
    <BaseScreen tittle={bookData.BookName}>
      <ReaderProvider>{renderReader()}</ReaderProvider>
    </BaseScreen>
  );
};
