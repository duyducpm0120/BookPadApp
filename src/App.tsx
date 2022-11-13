import { BPButton, BPText } from "@app/components";
import { appStyle, FONT_SIZE } from "@app/styles";
import { useMount } from "@core";
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";

const App = (): JSX.Element => {
  useMount(() => {});
  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <ScrollView contentContainerStyle={appStyle.container}>
        <BPText fontSize={FONT_SIZE.fontSize12}>a</BPText>
        <BPButton title="asdasd" onPress={() => {}} type="text" width={100} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
