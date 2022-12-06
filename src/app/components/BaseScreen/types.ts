import type { ImageSourcePropType } from "react-native";

export type BaseScreenProps = {
  //
  tittle: string;
  children?: JSX.Element | JSX.Element[] | null;

  headerLeftParams?: {
    icon: ImageSourcePropType;
    onPress: () => void;
    iconColor: string;
  };
  headerRightParams?: {
    icon: ImageSourcePropType;
    onPress: () => void;
    iconColor: string;
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
  useHeaderPadding?: boolean;
  headerComponent?: JSX.Element;
};
