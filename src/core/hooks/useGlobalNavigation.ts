import { ScreenNameEnum } from "@app/navigator";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const useGlobalNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const navigateToLoginScreen = () => {
    navigation.navigate(ScreenNameEnum.Login);
  };
  const navigateToHomeScreen = () => {
    navigation.navigate(ScreenNameEnum.Home);
  };

  return { navigation, navigateToLoginScreen, navigateToHomeScreen };
};
