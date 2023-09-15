import { useIsFocused } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { Center, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getChildActivityWithDate
} from "../../sql_lite";
import { setActiveChildCall } from "../../store/auth/actions";
import { getChildrenTimeline } from "../../store/dailycare";
import { convertDateformat } from "../../utils/date";
import {
  AndroidCalendar,
  ChildAvatars,
  DashboardLayout,
  FullScreenLoader,
  IOSCalendar,
} from "../commoncomponents";
import SkeltonPlaceholderComp from "../components/skeleton/DailyCareSkeleton";
import { DailyCareList } from "./DailyCareList";
import { childSignInStatusList } from "../../store/auth";

export default function DailyCare({ props, navigation }: any) {
  const platform = Platform.OS;
  const dispatch = useDispatch();

  const [loadingState, setLoadingState] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isToday, setIsToday] = useState(true);
  const [cacheClear, setCacheClear] = useState(Date.now().toString());
  const netInfo = useSelector((state) => state.global.netInfo);
  const isLoading = useSelector((state) => state.activeUser.isLoading);

  const parent = useSelector((state) => state.activeUser.parent);
  const childData = useSelector((state) => state.activeUser.childData);
  const activeChild = useSelector((state) => state.activeUser.activeChild);

  const activityChildrenTimeline = useSelector(
    (state) => state.dailyCare.activityChildrenTimeline
  );
  const childCheckInList = useSelector(
    (state) => state.activeUser.childSigninStatusList
  );

  const handleChildSignInStatusList = (data, callback) =>
    dispatch(childSignInStatusList(data, callback));

  const handleNavigation = (data) => {
    setLoadingState(false);
  };
  const isFocused = useIsFocused();

  const handleChildSignInStatusCall = async () => {
    handleChildSignInStatusList(
      {
        AuthorizedToken: "",
        ParentID: parent?.ParentId,
      },
      () => {}
    );
  };

  useEffect(() => {
    // Passed an empty array in useeffects , so effect will only in mount and unmount
    //GetParent and getAllChild is the sqlite method to get database values from parent and child table respectively.
    if (isFocused) {
      handleChildSignInStatusCall();
      if(isEmpty(childData)){
        getChildrenTimelineAPICall(date);
      }
    }
  }, [isFocused]);

  useEffect(() => {
    // Passed on parent and child data as param in useEffect.. when both values get changed , will rerender
    if (isFocused && !loadingState) {
      // console.log("first log");
      if (!isEmpty(childData) && !isEmpty(childCheckInList) ) {
        // console.log("first log if 1");
        const filteredChild = childCheckInList.filter((el: any) => el.SignInStatus === 'Signed in')[0];
        const filteredChildIds = childCheckInList.filter((el: any) => el.SignInStatus === 'Signed in').map(el => el.ChildID);
        // if (filteredChild && isEmpty(activeChild)) {
          if (filteredChild && filteredChildIds.length === 1 ) {
          // console.log("first log if 2");
            const childDataActive = childData.filter((el: any) => el.ChildID === filteredChild.ChildID)[0]
          dispatch(setActiveChildCall(childDataActive || {}))
        } else{
          if (isEmpty(activeChild) || (filteredChild && filteredChildIds.indexOf(activeChild.ChildID) === -1)) {
            dispatch(setActiveChildCall(childData ? childData[0] : {}))
          }
        }
      }else{
        // console.log("first log else 1");
        setLoadingState(false);
      }
    }
  }, [childData, isFocused, childCheckInList]);

  useEffect(() => {
    // console.log("first focus outter")
    if (isFocused && !loadingState) {
      // console.log("first focus inner")
      if (parent && date && !isEmpty(activeChild)) {
        // console.log("first focus inner1 if")
        if (!netInfo?.isConnected) {
          // console.log("first focus inner2 if")
          // If net not available get it from local db.
          getChildActivityWithDate(activeChild?.ChildID, convertDateformat(date));
        } else {
          // console.log("first focus inner2 else")
          // fetchLookup(date);
            setLoadingState(true);
            getChildrenTimelineAPICall(date);
        }
      }else{
        // console.log("first focus inner1 else")
        setLoadingState(false);
      }
    }
  }, [isFocused, activeChild, date]);

  const getChildrenTimelineAPICall = (date) => {
    dispatch(
      getChildrenTimeline(
        { date: convertDateformat(date), childID: activeChild?.ChildID ? activeChild?.ChildID : childData[0]?.ChildID, Email: parent?.Email, ParentId: parent?.ParentId },
        handleNavigation
      )
    );
  };

  const handleSelectedChild = (item) => {
    dispatch(setActiveChildCall(item))
  };
  return (
    <DashboardLayout
      title="Daily Care"
      displayScreenTitle={false}
      displaySidebar={false}
      mobileHeader={{ backButton: false, notificon: false }}
    >

      <FullScreenLoader isVisible={isLoading} />
      {childData?.length > 1 &&  <ChildAvatars
          childData={childData}
          child={activeChild}
          setChild={handleSelectedChild}
        /> }
      {childData?.length > 0 ?
      <>       
        <VStack flex={1}>
        {platform === "android" ? (
          <AndroidCalendar
            setIsToday={setIsToday}
            date={date}
            setDate={setDate}
            setCacheClear={setCacheClear}
          />
        ) : (
          <IOSCalendar
            date={date}
            setDate={setDate}
            setCacheClear={setCacheClear}
          />
        )}
        {loadingState ? <SkeltonPlaceholderComp count={12} /> : <DailyCareList parentID={parent.ParentID} date={date} isToday={isToday} childID={activeChild?.ChildID} activeChild={activeChild}/>}
      </VStack>
        </> :  <Center height="100%" alignItems="center" justifyContent="center">
            <Text fontSize="xl" color="coolGray.400">
              No child available
            </Text>
        </Center>
        
      }
    </DashboardLayout>
  );
}
