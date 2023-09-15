import { useIsFocused } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { Center, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllChild, getParent } from "../../sql_lite";
import { getAllLearnings } from "../../sql_lite/learningQuery";
import { getChildrenLearning } from "../../store/learning";
import { setActiveChildCall } from "../../store/auth/actions";
import {
  ChildAvatars,
  DashboardLayout,
} from "../commoncomponents";
import SkeltonPlaceholderComp from "../components/skeleton/LESkeleton";
import CurrentLearning from "./CurrentLearning";

export default function LearningNew({ props, navigation }: any) {
  const platform = Platform.OS;

  const dispatch = useDispatch();
  const [loadLearning, setLoadLearn] = useState(true);
  const [date, setDate] = useState(new Date());
  const [userData, setUserData] = useState<any>(null);
  const netInfo = useSelector((state: any) => state.global.netInfo);
  const parent = useSelector((state: any) => state.activeUser.parent);
  const childData = useSelector((state: any) => state.activeUser.childData);

  const activeChild = useSelector((state: any) => state.activeUser.activeChild);
  const handleNavigation = () => {
    setLoadLearn(false);
  };

  const childCheckInList = useSelector(
    (state) => state.activeUser.childSigninStatusList
  );

  //console.log("Date ", date);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getParent();
      getAllChild();
      if(isEmpty(childData)){
        getChildrenLearningAPICall();
      }
    }
  }, [isFocused]);

  useEffect(() => {
    // Passed on parent and child data as param in useEffect.. when both values get changed , will rerender
    if (isFocused) {
      if (!isEmpty(parent) && !isEmpty(childData) && !isEmpty(childCheckInList)) {
        const filteredChild = childCheckInList.filter((el: any) => el.SignInStatus === 'Signed in')[0]
        const filteredChildIds = childCheckInList.filter((el: any) => el.SignInStatus === 'Signed in').map(el => el.ChildID);
        // if (filteredChild && isEmpty(activeChild)) {
        if (filteredChild && filteredChildIds.length === 1 ) {
          const childDataActive = childData.filter((el: any) => el.ChildID === filteredChild.ChildID)[0]
          dispatch(setActiveChildCall(childDataActive || {}))
        } else{
          if (isEmpty(activeChild) || (filteredChild && filteredChildIds.indexOf(activeChild.ChildID) === -1)) {
            dispatch(setActiveChildCall(childData ? childData[0] : {}))
          }
        }
      }else{
        setLoadLearn(false);
      }
    }
  }, [parent, childData, isFocused,childCheckInList]);

  useEffect(() => {
    if (isFocused) {
      if (parent && date && !isEmpty(activeChild)) {
        if (!netInfo?.isConnected) {
          getAllLearnings();
          setLoadLearn(false);
        } else {
          getChildrenLearningAPICall();
        }
      }
    }
  }, [parent, date, activeChild, isFocused]);

  const getChildrenLearningAPICall = () => {
    if(activeChild?.ChildID){
      setLoadLearn(true);
      dispatch(
        getChildrenLearning({ childID: activeChild?.ChildID }, handleNavigation)
      );
    }
  };

  const handleSelectedChild = (item: any) => {
    dispatch(setActiveChildCall(item))
  };

  return (
    <DashboardLayout
      title="Learning"
      displayScreenTitle={false}
      displaySidebar={false}
      mobileHeader={{ backButton: false, notificon: false }}
    >
        {childData?.length > 1 && <ChildAvatars
          childData={childData}
          child={activeChild}
          setChild={handleSelectedChild}
        /> }
      {childData?.length > 0 ? <>
      {!loadLearning ? <VStack py="2" px="2" background="#EFF4F8">
        <CurrentLearning childID={activeChild?.ChildID} />
      </VStack> : <SkeltonPlaceholderComp count={2} type={"LEARNING"} />}
        </> : <Center height="100%" alignItems="center" justifyContent="center">
            <Text fontSize="xl" color="coolGray.400">
              No child available
            </Text>
        </Center>
      }
    </DashboardLayout>
  );
}
