import { useGlobalLoading } from "@core";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreenNameEnum } from "@app/navigator";
import { LoginScreen, OnboardingScreen } from "@app/screens";
import { Loading } from "@app/components";

const Stack = createNativeStackNavigator();
const App = (): JSX.Element => {
  const { IS_LOADING } = useGlobalLoading();
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
      <Loading isLoading={IS_LOADING} />
    </NavigationContainer>
  );
};

export default App;
