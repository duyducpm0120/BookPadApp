/**
 * @format
 */

import { AppContext } from "@core/contexts/MainApp";
import React from "react";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import App from "./src/App";

const app = () => (
  <AppContext>
    <App />
  </AppContext>
);

AppRegistry.registerComponent(appName, () => app);
