import type { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export type BaseScreenProps = {
  //
  tittle: string;
  children?: JSX.Element | never[];

  headerLeftParams?: {
    icon: IconSource;
    onPress: () => void;
  };
  headerRightParams?: {
    icon: IconSource;
    onPress: () => void;
  };
};
