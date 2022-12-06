import { BlankSpacer, BPIconButton, BPText } from "@app/components";
import { appStyle, SPACE, COLORS, FONT_SIZE } from "@app/styles";
import { strings, ICONS, useGlobalNavigation } from "@core";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useCallback } from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
import { useViewModel } from "./HomeTab.ViewModel";
import { AuthorTab, CategoryTab, ForYouTab, MyTabBar } from "./tabs";

const Tab = createMaterialTopTabNavigator();
export const HomeTab = (props: any) => {
  const { selectors } = useViewModel({});
  const { navigateToSearchScreen } = useGlobalNavigation();
  const { USER_INFO, BOOKS } = selectors;
  const renderUserAndSearchBar = () => {
    return (
      <View
        style={[
          appStyle.rowFullWidthSpaceBetweenContainer,
          // { backgroundColor: "red" },
        ]}
      >
        <View style={[appStyle.rowLeftContainer]}>
          <Avatar.Image
            source={{ uri: USER_INFO.ProfilePicUrl }}
            size={SPACE.spacing40}
            style={{ backgroundColor: COLORS.white }}
          />
          <BlankSpacer width={SPACE.spacing12} />
          <BPText
            fontSize={FONT_SIZE.fontSize14}
            fontWeight="600"
          >{`${strings.hello}, ${USER_INFO.NickName}`}</BPText>
        </View>
        <BPIconButton
          icon={{ uri: ICONS.search }}
          size={SPACE.spacing24}
          iconColor={COLORS.black}
          style={{ margin: 0 }}
          onPress={() => {
            console.log("search");
            navigateToSearchScreen();
          }}
        />
      </View>
    );
  };

  const ForYouTabComp = useCallback(() => {
    return <ForYouTab books={BOOKS} />;
  }, [BOOKS]);

  const AuthorTabComp = useCallback(() => {
    return <AuthorTab />;
  }, []);
  const CategoryTabComp = useCallback(() => {
    return <CategoryTab />;
  }, []);

  return (
    <View style={appStyle.container}>
      {renderUserAndSearchBar()}
      {/* <BlankSpacer height={SPACE.spacing8} /> */}
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          swipeEnabled: true,
        }}
        // initialLayout={{
        //   width: Dimensions.get("window").width,
        // }}
        tabBar={(tabBarProps) => <MyTabBar {...tabBarProps} />}
        sceneContainerStyle={{ backgroundColor: COLORS.white }}
      >
        <Tab.Screen name={strings.for_you} component={ForYouTabComp} />
        <Tab.Screen name={strings.best_sellers} component={ForYouTabComp} />
        <Tab.Screen name={strings.new_releases} component={ForYouTabComp} />
        <Tab.Screen name={strings.categories} component={CategoryTabComp} />
        <Tab.Screen name={strings.authors} component={AuthorTabComp} />
      </Tab.Navigator>
    </View>
  );
};
