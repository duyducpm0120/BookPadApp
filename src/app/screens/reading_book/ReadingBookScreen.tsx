/* eslint-disable react-native/no-inline-styles */
import { BPText, BaseScreen } from "@app/components";
import { Reader, ReaderProvider } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/file-system";
import React from "react";
import { useWindowDimensions, View } from "react-native";
import { safeGetNumber, safeGetString } from "@core";
import { SPACE, appStyle } from "@app/styles";
import type { ReadingBookScreenProps } from "./types";
import { useViewModel } from "./ReadingBookScreen.ViewModel";

export const ReadingBookScreen: React.FC<any> = (
  props: ReadingBookScreenProps
) => {
  const { navigation, route } = props;
  const { width, height } = useWindowDimensions();
  const { bookData, bookDownLoadLink } = route.params;
  const {
    saveReadStatus,
    currentLocation,
    currentProgress,
    setCurrentLocation,
    currentPage,
    totalPage,
    setCurrentPage,
    setTotalPage,
  } = useViewModel({
    bookData,
  });

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
            const location = safeGetString(
              _currentLocation,
              "start.cfi",
              ""
            ).toString();
            if (_totalLocations === 0) return;
            saveReadStatus({
              currentLocation: location,
              progress,
              totalLocation: _totalLocations,
              currentPage: safeGetNumber(_currentLocation, "start.location", 0),
            });
            setCurrentPage(
              safeGetNumber(_currentLocation, "start.location", 0)
            );
            setTotalPage(_totalLocations);
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
      <View
        style={{
          height: 30,
          position: "absolute",
          bottom: SPACE.spacing4,
          ...appStyle.rowFullWidthCenterContainer,
        }}
      >
        <BPText>
          {currentPage !== 0 && totalPage !== 0
            ? `${currentPage}/${totalPage}`
            : ""}
        </BPText>
      </View>
    </BaseScreen>
  );
};
