import type { BookPadAppState } from "@core/store";
import { initState } from "@core/store";
import React from "react";

export const StateContext = React.createContext<BookPadAppState>(initState);

export const StateContextProvider = StateContext.Provider;

export const StateContextConsumer = StateContext.Consumer;
