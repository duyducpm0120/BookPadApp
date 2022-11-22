import { ScreenNameEnum } from "@app/navigator";
import type { BookDetailScreenParams } from "@app/screens/book_detail";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const useGlobalNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToLoginScreen = () => {
    navigation.navigate(ScreenNameEnum.Login);
  };
  const navigateToHomeScreen = () => {
    navigation.navigate(ScreenNameEnum.Home);
  };

  const navigateToBookDetailScreen = (params: BookDetailScreenParams) => {
    navigation.navigate(ScreenNameEnum.BookDetail, { ...params });
  };

  return {
    navigation,
    navigateToLoginScreen,
    navigateToHomeScreen,
    navigateToBookDetailScreen,
    goBack,
  };
};
