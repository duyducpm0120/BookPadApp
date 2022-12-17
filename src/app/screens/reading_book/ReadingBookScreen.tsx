import { BaseScreen } from "@app/components";
import { Reader, ReaderProvider } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/file-system";
import React from "react";
import { useWindowDimensions, View } from "react-native";
import { safeGetString } from "@core";
import type { ReadingBookScreenProps } from "./types";
import { useViewModel } from "./ReadingBookScreen.ViewModel";

export const ReadingBookScreen: React.FC<any> = (
  props: ReadingBookScreenProps
) => {
  const { navigation, route } = props;
  const { width, height } = useWindowDimensions();
  const { bookData, bookDownLoadLink } = route.params;
  const { saveReadStatus, currentLocation, currentProcess } = useViewModel({
    bookData,
  });
  // const { changeFontFamily } = useReader();

  const RenderReader = () => {
    try {
      return (
        <Reader
          src={bookDownLoadLink}
          width={width}
          height={height * 0.8}
          fileSystem={useFileSystem}
          enableSwipe
          enableSelection
          onSwipeRight={() => {}}
          onFinish={() => {}}
          onLocationChange={(_totalLocations, _currentLocation, progress) => {
            console.log("_currentLocation asdasd", _currentLocation);
            console.log("progress asdasd", progress);
            const location = safeGetString(
              _currentLocation,
              "start.cfi",
              ""
            ).toString();
            saveReadStatus({
              currentLocation: location,
              progress,
            });
          }}
          initialLocation={currentLocation}
        />
      );
    } catch (err) {
      return <View />;
    }
  };

  return (
    <BaseScreen tittle={bookData.BookName}>
      <ReaderProvider>{RenderReader()}</ReaderProvider>
    </BaseScreen>
  );
};
