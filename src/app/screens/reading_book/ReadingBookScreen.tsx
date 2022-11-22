import { appStyle } from "@app/styles";
import { Reader, ReaderProvider } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/file-system";
import React from "react";
import { SafeAreaView, useWindowDimensions } from "react-native";
import { useViewModel } from "./ReadingBookScreen.ViewModel";
import type { ReadingBookScreenProps } from "./types";

export const ReadingBookScreen: React.FC<any> = (
  props: ReadingBookScreenProps
) => {
  const { navigation, route } = props;
  const { width, height } = useWindowDimensions();
  const { bookData } = route.params;
  const { bookData: data } = useViewModel({ bookData });
  return (
    <SafeAreaView style={appStyle.centerContainer}>
      <ReaderProvider>
        <Reader
          src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
          width={width}
          height={height}
          fileSystem={useFileSystem}
          enableSwipe
        />
      </ReaderProvider>
    </SafeAreaView>
  );
};
