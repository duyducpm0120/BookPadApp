import { ScreenNameEnum } from "@app/navigator";
import type { BookDetailScreenParams } from "@app/screens/book_detail";
import type { ReadingBookScreenParams } from "@app/screens/reading_book/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const useGlobalNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToLoginScreen = () => {
    navigation.replace(ScreenNameEnum.Login);
  };
  const navigateToHomeScreen = () => {
    navigation.navigate(ScreenNameEnum.Home);
  };

  const navigateToBookDetailScreen = (params: BookDetailScreenParams) => {
    navigation.navigate(ScreenNameEnum.BookDetail, { ...params });
  };

  const navigateToReadingBookScreen = (params: ReadingBookScreenParams) => {
    navigation.navigate(ScreenNameEnum.ReadingBook, { ...params });
  };

  const navigateToProfileScreen = () => {
    navigation.navigate(ScreenNameEnum.Profile);
  };

  const navigateToSettingScreen = () => {
    navigation.navigate(ScreenNameEnum.Setting);
  };
  const navigateToChangePasswordScreen = () => {
    navigation.navigate(ScreenNameEnum.ChangePassword);
  };
  const navigateToChatbotScreen = () => {
    navigation.navigate(ScreenNameEnum.Chatbot);
  };
  const navigateToSearchScreen = () => {
    navigation.navigate(ScreenNameEnum.Search);
  };

  return {
    navigation,
    navigateToLoginScreen,
    navigateToHomeScreen,
    navigateToBookDetailScreen,
    navigateToReadingBookScreen,
    navigateToProfileScreen,
    goBack,
    navigateToSettingScreen,
    navigateToChangePasswordScreen,
    navigateToChatbotScreen,
    navigateToSearchScreen,
  };
};
