import {
  CacheKeyEnum,
  globalActions,
  useGlobalDispatch,
  useGlobalLoading,
  useGlobalSnackBar,
  useMount,
} from "@core";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "@app/navigator";
import { Loading } from "@app/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Snackbar } from "react-native-paper";
import LocalStorageHelper from "@core/utils/LocalStorageHelper";

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  const { IS_LOADING } = useGlobalLoading();
  const {
    IS_SHOW_SNACK_BAR,
    SNACK_BAR_MESSAGE,
    SNACK_BAR_ACTION,
    hideGlobalSnackBar,
  } = useGlobalSnackBar();

  const globalDispatch = useGlobalDispatch();

  const getGlobalToken = async () => {
    const token = await LocalStorageHelper.getItem(CacheKeyEnum.TOKEN);
    if (token !== null) {
      globalDispatch(globalActions.setGlobalToken(token.toString()));
    }
  };
  useMount(async () => {
    await getGlobalToken();
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppStack />
        <Loading isLoading={IS_LOADING} />
        <Snackbar
          visible={IS_SHOW_SNACK_BAR}
          onDismiss={hideGlobalSnackBar}
          action={{
            label: SNACK_BAR_ACTION.label,
            onPress: () => {
              // Do something
              SNACK_BAR_ACTION.onPress();
            },
          }}
          duration={3000}
        >
          {SNACK_BAR_MESSAGE}
        </Snackbar>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
