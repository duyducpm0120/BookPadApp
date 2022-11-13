import { useMount } from "@core";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreenNameEnum } from "@app/navigator";
import { OnboardingScreen } from "@app/screens";

const Stack = createNativeStackNavigator();
const App = (): JSX.Element => {
  useMount(() => {});
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={ScreenNameEnum.Onboarding}
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
