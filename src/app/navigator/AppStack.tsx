import React, { useCallback } from "react";
import {
  OnboardingScreen,
  LoginScreen,
  HomeScreen,
  SettingScreen,
  ProfileScreen,
  ChangePasswordScreen,
  SearchScreen,
  ReviewScreen,
} from "@app/screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BookDetailScreen } from "@app/screens/book_detail";
import { ReadingBookScreen } from "@app/screens/reading_book/ReadingBookScreen";
import { useGlobalState } from "@core";
import { ChatbotScreen } from "@app/screens/chatbot";
import { ScreenNameEnum } from "./screenName";

const Stack = createNativeStackNavigator();

export const AppStack = React.memo(() => {
  const { TOKEN } = useGlobalState();
  const introStack = useCallback(() => {
    if (TOKEN === "" || TOKEN === null) {
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
        </>
      );
    }
    return <></>;
  }, [TOKEN]);

  const renderStack = useCallback(() => {
    return (
      <>
        {introStack()}
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
        <Stack.Screen
          name={ScreenNameEnum.Profile}
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNameEnum.Setting}
          component={SettingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNameEnum.ChangePassword}
          component={ChangePasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNameEnum.Chatbot}
          component={ChatbotScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNameEnum.Search}
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNameEnum.Review}
          component={ReviewScreen}
          options={{ headerShown: false }}
        />
      </>
    );
  }, [introStack]);

  return <Stack.Navigator>{renderStack()}</Stack.Navigator>;
  // return (
  //   <Stack.Navigator>
  //     <Stack.Screen
  //       name={ScreenNameEnum.Onboarding}
  //       component={OnboardingScreen}
  //       options={{ headerShown: false }}
  //     />
  //     <Stack.Screen
  //       name={ScreenNameEnum.Login}
  //       component={LoginScreen}
  //       options={{ headerShown: false }}
  //     />
  //     <Stack.Screen
  //       name={ScreenNameEnum.Home}
  //       component={HomeScreen}
  //       options={{ headerShown: false }}
  //     />
  //     <Stack.Screen
  //       name={ScreenNameEnum.BookDetail}
  //       component={BookDetailScreen}
  //       options={{ headerShown: false }}
  //     />
  //     <Stack.Screen
  //       name={ScreenNameEnum.ReadingBook}
  //       component={ReadingBookScreen}
  //       options={{ headerShown: false }}
  //     />
  //     <Stack.Screen
  //       name={ScreenNameEnum.Profile}
  //       component={ProfileScreen}
  //       options={{ headerShown: false }}
  //     />
  //   </Stack.Navigator>
  // );
});
