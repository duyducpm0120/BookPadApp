import React from "react";
import {
  OnboardingScreen,
  LoginScreen,
  HomeScreen,
  ProfileScreen,
} from "@app/screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BookDetailScreen } from "@app/screens/book_detail";
import { ReadingBookScreen } from "@app/screens/reading_book/ReadingBookScreen";
import { ScreenNameEnum } from "./screenName";

const Stack = createNativeStackNavigator();

export const AppStack = React.memo(() => {
  // const { TOKEN } = useGlobalState();
  // const introStack = () => {
  //   return (
  //     <>
  //       <Stack.Screen
  //         name={ScreenNameEnum.Onboarding}
  //         component={OnboardingScreen}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name={ScreenNameEnum.Login}
  //         component={LoginScreen}
  //         options={{ headerShown: false }}
  //       />
  //     </>
  //   );
  // };

  // const renderStack = useCallback(() => {
  //   return (
  //     <>
  //       {
  //         // If user is not logged in, show intro stack
  //         TOKEN === "" ? introStack() : null
  //         // introStack()
  //       }
  //       <Stack.Screen
  //         name={ScreenNameEnum.Home}
  //         component={HomeScreen}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name={ScreenNameEnum.BookDetail}
  //         component={BookDetailScreen}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name={ScreenNameEnum.ReadingBook}
  //         component={ReadingBookScreen}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name={ScreenNameEnum.Profile}
  //         component={ProfileScreen}
  //         options={{ headerShown: false }}
  //       />
  //     </>
  //   );
  // }, [TOKEN]);

  // return <Stack.Navigator>{renderStack()}</Stack.Navigator>;
  return (
    <Stack.Navigator>
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
      <Stack.Screen
        name={ScreenNameEnum.Profile}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});
