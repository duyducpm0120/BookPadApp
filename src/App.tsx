import { useMount } from "@core";
import React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";

const App = (): JSX.Element => {
  useMount(() => {});
  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <ScrollView>
        <Text>asdasd</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
