/**
 * @format
 */

import { MainApp } from "@core/contexts/MainApp";
import React from "react";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import App from "./src/App";

const app = () => (
  <MainApp>
    <App />
  </MainApp>
);

AppRegistry.registerComponent(appName, () => app);
