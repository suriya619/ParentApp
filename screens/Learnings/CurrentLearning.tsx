import { Center, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getChildrenLearning } from "../../store/learning";
import LearningItem from "./LearningItem";

const CurrentLearning = ({ childID }:any) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const netInfo = useSelector((state:any) => state.global.netInfo);
  const activityChildrenLearningList = useSelector(
    (state:any) => state.learning.activityChildrenLearningList
  );

  const dispatch = useDispatch();

  const filterListBasedonChildID = (childID:any) => {
    let result = activityChildrenLearningList?.filter(
      (o:any) => o.childsArray.indexOf(childID) > -1
    );
    return result;
  };

  useEffect(() => {
    filterListBasedonChildID(childID);
  }, [childID]);

  const handleNavigation = (data:any) => {
    setIsRefreshing(false);
  };

  const onRefreshing = () => {
    setIsRefreshing(true);
    if (!netInfo?.isConnected) {
      setIsRefreshing(false);
    } else {
      getChildrenLearningAPICall(null);
      // setIsRefreshing(false);
    }
  };

  const handleChildrenLearning = (data:any, callback:any) =>
    dispatch(getChildrenLearning(data, callback));

  const getChildrenLearningAPICall = (date:any) => {
    // dispatch(getChildrenLearning({ childID: childID }, handleNavigation));

    handleChildrenLearning({ childID: childID }, handleNavigation);
  };

  return (
    <FlatList
      onRefresh={onRefreshing}
      refreshing={isRefreshing}
      contentContainerStyle={{ paddingBottom: 150 }}
      showsVerticalScrollIndicator={false}
      data={filterListBasedonChildID(childID)}
      ListEmptyComponent={
        <View>
          <Center alignItems="center" background="white" height="500">
            <Text fontSize="xl" color="coolGray.400">
              {" "}
              No activity found for this child{" "}
            </Text>
          </Center>
        </View>
      }
      keyExtractor={(item) => `${item.ExperienceID}`}
      renderItem={({ item, index }) => (
        <LearningItem
          item={item}
          index={index}
          length={activityChildrenLearningList.length}
        />
      )}
    />
  );
};

// const getLookupList = useSelector(
//   (state) => state.dailyCare.getLookUpList?.lstLELookupExpLevel
// );
// console.log("GetLookup ", getLookupList);

// const getProgressText = (ID) => {
//   let result = getLookupList?.filter((o) => o.Id === ID);
//   // console.log("res ", result);
//   return result?.[0]?.Description;
// };

export default CurrentLearning;
