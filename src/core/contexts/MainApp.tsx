import type { BookPadAppState } from "@core/store";
import { initState, reducer } from "@core/store";
import type { ReactNode } from "react";
import React, { useReducer } from "react";
import { DispatchContextProvider } from "./dispatch_context";
import { StateContextProvider } from "./state_context";

export const MainApp = ({
  children,
  globalState = initState,
}: {
  children: ReactNode;
  globalState?: BookPadAppState;
}) => {
  const [state, dispatch] = useReducer(reducer, globalState);
  return (
    <DispatchContextProvider value={dispatch}>
      <StateContextProvider value={state}>{children}</StateContextProvider>
    </DispatchContextProvider>
  );
};
