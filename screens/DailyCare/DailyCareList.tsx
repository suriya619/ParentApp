import { Box, Center, Text, View } from "native-base";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CareEntries from "./CareEntries";
import { FlatList } from "react-native";
import CareEntriesItem from "./CareEntriesItem";
import { getChildrenTimeline } from "../../store/dailycare";
import { convertDateformat } from "../../utils/date";
import {
  getAllChild,
  getChildActivityWithDate,
  getParent,
} from "../../sql_lite";

export function DailyCareList({ date, isToday, childID, parentID, activeChild }) {
  const dispatch = useDispatch();
  const today = new Date();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const netInfo = useSelector((state) => state.global.netInfo);

  // console.log("DailyCare TOday ??  ", checkisToday(date));
  const handleNavigation = (data) => {
    setIsRefreshing(false);
  };

  function checkisToday(date) {
    // checks if the date is today, and calls setIsToday;
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return true;
    } else {
      return false;
    }
  }

  const activityChildrenTimeline = useSelector(
    (state) => state.dailyCare.activityChildrenTimeline
  );

  const onRefreshing = () => {
    setIsRefreshing(true);
    if (!netInfo?.isConnected) {
      getChildActivityWithDate(childID, convertDateformat(date)).then(() => {
        setIsRefreshing(false);
      });
    } else {
      getChildrenTimelineAPICall(date)
    }
  };

  const handleTimeline = (data, callback) =>
    dispatch(getChildrenTimeline(data, callback));

  const getChildrenTimelineAPICall = (date) => {
    //   console.log("calls api");
    //    console.log("ChildID ", child?.ChildID);


    handleTimeline(
      { date: convertDateformat(date), childID: childID, ParentId: parentID },
      handleNavigation
    );
  };

  return (
    <View px="2" mb={{ base: -10, md: 0 }}>
      {/* <CareEntries
        // entries={orderBy(
        //   activityChildrenTimeline,
        //   ["TaskDateTimeStamp"],
        //   ["asc"]
        // )}
        entries={activityChildrenTimeline}
      /> */}

     <FlatList
        onRefresh={onRefreshing}
        refreshing={isRefreshing}
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
        data={activityChildrenTimeline}
        renderItem={({ item, index, length }) => (
          <CareEntriesItem item={item} index={index} length={length} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {(activityChildrenTimeline || []).length == 0 && (
        <Center height="100" alignItems="center" justifyContent="center">
        <Text fontSize="md" color="primary.500" fontWeight="bold">
              {" "}
              {activeChild?.FirstName} did not attend.
            </Text>
        </Center>
      )}
      <Box p="10" />
    </View>
  );
}
