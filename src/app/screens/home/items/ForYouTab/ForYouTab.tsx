import { BPText } from "@app/components";
import React from "react";
import { ScrollView } from "react-native";
import { styles } from "./style";
import type { ForYouTabProps } from "./types";

export const ForYouTab = (props: ForYouTabProps) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
      <BPText>asdasd</BPText>
    </ScrollView>
  );
};
