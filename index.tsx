/**
 * @format
 */

import { AppContextWrapper } from "@core/contexts/AppContextWrapper";
import { ReaderProvider } from "@epubjs-react-native/core";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import React from "react";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import App from "./src/App";

const queryClient = new QueryClient();
const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <AppContextWrapper>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <ReaderProvider>{children}</ReaderProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </AppContextWrapper>
  );
};
const app = () => (
  <AppWrapper>
    <App />
  </AppWrapper>
);

AppRegistry.registerComponent(appName, () => app);
