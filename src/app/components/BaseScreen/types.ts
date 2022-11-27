import type { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export type BaseScreenProps = {
  //
  tittle: string;
  children?: JSX.Element | JSX.Element[] | null;

  headerLeftParams?: {
    icon: IconSource;
    onPress: () => void;
  };
  headerRightParams?: {
    icon: IconSource;
    onPress: () => void;
  };
  primaryButtonParams?: {
    title: string;
    onPress: () => void;
  };
  secondaryButtonParams?: {
    title: string;
    onPress: () => void;
  };
  headerType?: "normal" | "transparent";
  headerFloating?: boolean;
};
