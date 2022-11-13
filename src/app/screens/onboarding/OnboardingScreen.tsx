/* eslint-disable react-native/no-inline-styles */
import { BlankSpacer, BPText } from "@app/components";
import { appStyle, COLORS, SPACE } from "@app/styles";
import { IMAGES } from "@core/assets";
import React, { useRef } from "react";
import {
  Animated,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

export const OnboardingScreen: React.FC<any> = (props: any) => {
  const { illustration1, illustration2, illustration4 } = IMAGES;
  const slogans = [
    "Get your groceries in as fast as one hour",
    "Order your favorites from a huge range of products",
    "Delivered to your home",
  ];
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const images = [illustration1, illustration2, illustration4];
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderImageSlider = () => {
    return (
      <View
        style={{
          height: "90%",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <ScrollView
          horizontal
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          pagingEnabled
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {
              listener: (event) => {
                // console.log("event", event.nativeEvent.contentOffset.x);
              },
              useNativeDriver: false,
            }
          )}
        >
          {images.map((image, index) => {
            const o = scrollX.interpolate({
              inputRange: [
                windowWidth * (index - 1),
                windowWidth * index,
                windowWidth * (index + 1),
              ],
              outputRange: [0, 1, 0],
              extrapolate: "clamp",
            });
            const h = scrollX.interpolate({
              inputRange: [
                windowWidth * (index - 1),
                windowWidth * index,
                windowWidth * (index + 1),
              ],
              outputRange: [100, 400, 100],
              extrapolate: "clamp",
            });
            return (
              <View
                key={`${-index}view`}
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Animated.Image
                  source={image}
                  key={-index.toString()}
                  // resizeMode="cover"
                  style={{
                    width: windowWidth - 40,
                    height: h,
                    opacity: o,
                    borderRadius: 15,
                    marginHorizontal: 20,
                  }}
                  resizeMode="contain"
                />
              </View>
            );
          })}
        </ScrollView>
        <BPText textAlign="center">{slogans[0]}</BPText>
      </View>
    );
  };

  const renderDots = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "orange",
        }}
      >
        {images.map((image, index) => {
          const w = scrollX.interpolate({
            inputRange: [
              windowWidth * (index - 1),
              windowWidth * index,
              windowWidth * (index + 1),
            ],
            outputRange: [10, 20, 10],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={-index}
              style={{
                backgroundColor: COLORS.primary.main,
                height: 10,
                width: w,
                borderRadius: 50,
                marginHorizontal: 6,
              }}
            />
          );
        })}
      </View>
    );
  };
  return (
    <SafeAreaView style={appStyle.container}>
      {renderImageSlider()}
      <BlankSpacer height={SPACE.spacing8} />
      {renderDots()}
    </SafeAreaView>
  );
};
