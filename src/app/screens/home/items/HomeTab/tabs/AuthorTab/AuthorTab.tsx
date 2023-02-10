import { Author, BlankSpacer, Loading } from "@app/components";
import { SearchScreenType } from "@app/screens/search";
import { appStyle, SPACE } from "@app/styles";
import type { BookAuthor } from "@core";
import { useGlobalNavigation } from "@core";
import { size } from "lodash";
import React from "react";
import { FlatList, View } from "react-native";
import { useViewModel } from "./AuthorTab.ViewModel";
import { styles } from "./style";

export const AuthorTab = (props: any) => {
  const { navigateToSearchScreen } = useGlobalNavigation();

  const { selectors } = useViewModel();
  const { authorList } = selectors;
  const loadingComponent = () => {
    return (
      <>
        <BlankSpacer height={SPACE.spacing12} />
        <Loading isLoading />
      </>
    );
  };
  const navigateToSearch = (item: BookAuthor) => {
    navigateToSearchScreen({
      type: SearchScreenType.AUTHOR,
      keyword: item.AuthorName,
      id: Number(item.AuthorId),
    });
  };
  return (
    <View style={[styles.scrollViewContentContainer]}>
      <View style={[appStyle.rowFullWidthLeftContainer]}>
        {size(authorList) > 0 ? (
          <>
            <FlatList
              data={authorList}
              keyExtractor={(item, index) => `${item.AuthorId} + ${index}`}
              renderItem={({ item }) => (
                <Author
                  data={item}
                  onPress={() => {
                    navigateToSearch(item);
                  }}
                />
              )}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => <BlankSpacer height={100} />}
            />
            {/* <BlankSpacer height={100} /> */}
          </>
        ) : (
          loadingComponent()
        )}
      </View>
      {/* <BlankSpacer height={100} /> */}
    </View>
  );
};
