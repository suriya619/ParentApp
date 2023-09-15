import { useIsFocused, useNavigation } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { Box, Button, Modal, ScrollView, Text, View, VStack } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getParent } from "../../sql_lite";
import { childSignInStatusList } from "../../store/auth";
import {
  getCentreSignInOutSettings,
  getChildAgeLimit,
} from "../../store/center";
import { DashboardLayout, FullScreenLoader } from "../commoncomponents";
import SkeltonPlaceholderComp from "../components/skeleton/CheckInSkeleton";
import CheckInEntriesList from "./CheckInEntriesList";

const CheckkIn = () => {
  
  const [loadingState, setLoadingState] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSecondModalActive, setSecondModalActive] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [childID, setChildID] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = useSelector((state) => state.activeUser.isLoading);
  const childData = useSelector((state) => state.activeUser.childSigninStatusList);
  const parent = useSelector((state) => state.activeUser.parent);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState(1);

  const handleChildSignInStatusList = (data, callback) =>
    dispatch(childSignInStatusList(data, callback));

  const handleNavigation = (data) => {
    setTimeout(() => {
      setLoadingState(false);
    }, 500);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (isEmpty(parent)) {
        getParent();
      }
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      if (!isEmpty(parent)) {
        setLoadingState(true);
        setUserData(parent);
        handleChildSignInStatusCall();
      }
    }
  }, [parent, isFocused]);

  useEffect(() => {
    if (isFocused) {
      dispatch(getCentreSignInOutSettings());
      dispatch(getChildAgeLimit());
    }
  }, [userData, isFocused]);

  const handleChildSignInStatusCall = async () => {
    handleChildSignInStatusList(
      {
        AuthorizedToken: "",
        ParentID: parent?.ParentId,
      },
      handleNavigation
    );
  };
  const getActiveChild = useMemo(() => {
    return childData?.filter(el => !el.IsPickup);
  }, [childData]);
  const getOtherORPickupChildList = useMemo(() => {
    return childData?.filter(el => el.IsPickup);
  }, [childData]);
  const activeChildList = getActiveChild; 
  const otherORPickupChildList = getOtherORPickupChildList; 

  const closeModal = () => {
    setShowConfirmModal(false);
    setTimeout(() => {
      setSecondModalActive(false)
    }, 300);
  }
  const handleConfirmModal = (navPage, pageProps) => {
    setPageData({navPage, pageProps})
    setShowConfirmModal(true);
  }
  const handlePageNavigate = () => {
    closeModal();
    navigation.navigate(pageData.navPage, pageData.pageProps);
  }
  return (
    <DashboardLayout title="Sign In/Out" mobileHeader={{ backButton: false }}>
      <FullScreenLoader isVisible={isLoading} />
      {activeChildList.length > 0 && otherORPickupChildList.length > 0 && <View style={styles.tabRow}>
        <TouchableOpacity style={[styles.tabHead, activeTab === 1 && styles.activeTab]} onPress={() => setActiveTab(1)} >
          <Text fontSize="xs" fontWeight="bold" color={ activeTab === 1 ?  "#e79478" : "coolGray.600"} textAlign="center" textTransform="uppercase">
            My Children
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabHead, activeTab === 2 && styles.activeTab]} onPress={() => setActiveTab(2)}>
          <Text fontSize="xs" fontWeight="bold" color={ activeTab === 2 ?  "#e79478" : "coolGray.600"} textAlign="center" textTransform="uppercase">
            Other Children
          </Text>
        </TouchableOpacity>
      </View>}
      {loadingState ? (
        <SkeltonPlaceholderComp count={16} />
      ) : (
        <>
          {childData?.length > 0 ? (
            <ScrollView
              p="4"
              mb={{ base: -10 }}
              nestedScrollEnabled
              bounces={false}
              backgroundColor="coolGray.100"
            >
              {(activeChildList.length > 0 && (otherORPickupChildList.length <= 0 || activeTab === 1)) ?
                activeChildList.map((data) => {
                  return (
                    <React.Fragment key={data.ChildID}>
                      <CheckInEntriesList
                        child={data}
                        handleChildSignInStatusCall={
                          handleChildSignInStatusCall
                        }
                        handleConfirmModal={handleConfirmModal}
                        setChildID={setChildID}
                      />
                    </React.Fragment>
                  )
                }) : null}
                {otherORPickupChildList.length > 0 && (activeChildList.length <= 0 || activeTab === 2) ?
                otherORPickupChildList.map((data) => {
                  return (
                    <React.Fragment key={data.ChildID}>
                      <CheckInEntriesList
                        child={data}
                        handleChildSignInStatusCall={
                          handleChildSignInStatusCall
                        }
                        handleConfirmModal={handleConfirmModal}
                        setChildID={setChildID}
                      />
                    </React.Fragment>
                  );
                }) : null}
              <Box py="20" />
            </ScrollView>
          ) : (
            <View alignItems="center" justifyContent="center" p="4" flex="3">
              <Text fontSize="xl" color="coolGray.400">
                There is no children available.
              </Text>
            </View>
          )}
        </>
      )}
       <Modal isOpen={showConfirmModal} onClose={closeModal} size='md'>
        <Modal.Content>
          <Modal.CloseButton onPress={closeModal} />
          <Modal.Header _text={{ color: 'primary.600' }} >Confirmation</Modal.Header>
          <Modal.Body>
            <ScrollView bounces={false}>
              <VStack space={3}>
              {!isSecondModalActive? <><Text fontSize={'13'}><Text fontSize={'13'} fontWeight='bold'>{pageData?.pageProps?.child?.FirstName}</Text> does not have an approved booking for today.
              </Text>
              <Text fontSize={'13'}>
                Have you confirmed with the Centre that there is a spot available?
              </Text>
              </> : <Text fontSize={'13'}>
              Please confirm with the Centre that they have a position available for {pageData?.pageProps?.child?.FirstName}.
              </Text> }
              </VStack>
            </ScrollView>
          </Modal.Body>
          <Modal.Footer style={{flexDirection: "row", justifyContent: "space-between"}}>
           {!isSecondModalActive? <>
            <Button w={'45%'} _text={{ fontWeight: 'bold' }}  onPress={handlePageNavigate} >
                YES
              </Button>
            <Button variant="light" w={'45%'} _text={{ fontWeight: 'bold' }} onPress={() => setSecondModalActive(true)} >
                NO
              </Button>
           </> : <Button w={'full'} _text={{ fontWeight: 'bold' }} onPress={closeModal} >
                OK
              </Button>}
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </DashboardLayout>
  );
};

export default CheckkIn;

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: "row",
    paddingTop: 5,
    borderBottomWidth: 0.3,
    borderColor: "#d3d3d3"
  },
  tabHead: {
    flex: 1,
    paddingVertical: 12,
    borderBottomWidth: 4,
    borderColor: "transparent"
  },
  activeTab: {
    borderColor: "#e79478"
  }
});

// export default  React.memo(CheckkIn, (prevprops, nextprops)=>{
//   return true;
// });
