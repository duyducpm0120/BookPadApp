import React from "react";
import { OnboardingScreen, LoginScreen, HomeScreen } from "@app/screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BookDetailScreen } from "@app/screens/book_detail";
import { useGlobalState } from "@core";
import { ReadingBookScreen } from "@app/screens/reading_book/ReadingBookScreen";
import { ScreenNameEnum } from "./screenName";

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  const { TOKEN } = useGlobalState();
  const stackWithoutToken = () => {
    return (
      <>
        <Stack.Screen
          name={ScreenNameEnum.Onboarding}
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNameEnum.Login}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNameEnum.Home}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNameEnum.BookDetail}
          component={BookDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNameEnum.ReadingBook}
          component={ReadingBookScreen}
          options={{ headerShown: false }}
        />
      </>
    );
  };
  const stackWithToken = () => {
    return (
      <>
        <Stack.Screen
          name={ScreenNameEnum.Home}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNameEnum.Onboarding}
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNameEnum.Login}
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={ScreenNameEnum.BookDetail}
          component={BookDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNameEnum.ReadingBook}
          component={ReadingBookScreen}
          options={{ headerShown: false }}
        />
      </>
    );
  };

  return (
    <Stack.Navigator>
      {
        // If user is not logged in, show intro stack
        TOKEN === "" ? stackWithoutToken() : stackWithToken()
        // introStack()
      }
    </Stack.Navigator>
  );
};
