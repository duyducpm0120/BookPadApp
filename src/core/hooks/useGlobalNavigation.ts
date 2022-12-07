import { ScreenNameEnum } from "@app/navigator";
import type { BookDetailScreenParams } from "@app/screens/book_detail";
import type { ReadingBookScreenParams } from "@app/screens/reading_book/types";
import type { ReviewScreenParams } from "@app/screens/review";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { SearchScreenParams } from "../../app/screens/search/types";

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
  const navigateToSearchScreen = (params: SearchScreenParams) => {
    navigation.navigate(ScreenNameEnum.Search, { ...params });
  };
  const navigateToReviewScreen = (params: ReviewScreenParams) => {
    navigation.navigate(ScreenNameEnum.Review, { ...params });
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
    navigateToReviewScreen,
  };
};
