import React from "react";
import { OnboardingScreen, LoginScreen, HomeScreen } from "@app/screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BookDetailScreen } from "@app/screens/book_detail";
import { ScreenNameEnum } from "./screenName";

const Stack = createNativeStackNavigator();

export const AppStack = () => {
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
    </Stack.Navigator>
  );
};
