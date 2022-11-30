/**
 * @format
 */

import { AppContextWrapper } from "@core/contexts/AppContextWrapper";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-native-paper";
import { name as appName } from "./app.json";
import App from "./src/App";

const queryClient = new QueryClient();
const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <NavigationContainer>
      <AppContextWrapper>
        <QueryClientProvider client={queryClient}>
          <Provider>{children}</Provider>
        </QueryClientProvider>
      </AppContextWrapper>
    </NavigationContainer>
  );
};
const app = () => (
  <AppWrapper>
    <App />
  </AppWrapper>
);

AppRegistry.registerComponent(appName, () => app);
