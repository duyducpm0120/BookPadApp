import { Author, BlankSpacer, Loading } from "@app/components";
import { appStyle } from "@app/styles";
import { useGlobalNavigation } from "@core";
import { size } from "lodash";
import React from "react";
import { FlatList, View } from "react-native";
import { useViewModel } from "./AuthorTab.ViewModel";
import { styles } from "./style";

export const AuthorTab = (props: any) => {
  const { navigateToBookDetailScreen } = useGlobalNavigation();

  const { selectors } = useViewModel();
  const { authorList } = selectors;
  const loadingComponent = () => {
    return <Loading isLoading />;
  };

  return (
    <View style={[styles.scrollViewContentContainer]}>
      <View style={[appStyle.rowFullWidthLeftContainer, {}]}>
        {size(authorList) > 0 ? (
          <>
            <FlatList
              data={authorList}
              keyExtractor={(item, index) => `${item.AuthorId} + ${index}`}
              renderItem={({ item }) => <Author data={item} />}
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
