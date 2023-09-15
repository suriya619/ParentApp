import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Linking } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ModalView from "./ModalView";
import useTheme from "../../context/useTheme";
import useThemedStyles from "../../context/useThemedStyles";
import { AppFontSizes, AppTypography } from "../../assets/styles/themes";
import { logout, setVersionCheckDetails, setShowAppUpdateModal } from "../../store/auth";
import { dailycarelogout } from "../../store/dailycare";
import { centreLogout } from "../../store/center/actions";
import { learningLogout } from "../../store/learning";
import { dropAllTables } from "../../sql_lite";
import { save, get } from "../../assets/styles/storage";

const AppVersionUpdate = (props: any) => {

  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation : any = useNavigation();
  const styles = useThemedStyles(style);
  const { appUpdateDetails, showAppUpdateModal } = useSelector((state: any) => state.activeUser);
  const { status, type } = useSelector((state: any) => state.global.showInternetMessageModal);

  useEffect(() => {
    callInternetCheck();
  }, [status, type]);

  const callInternetCheck = async () => {
    const checkedVersionUpdate = await get("checkedVersionUpdate")
    if (!status && type && type === "splash" && !checkedVersionUpdate){
      dispatch(setVersionCheckDetails());
    }
  }

  const setShowModal = () => {
    dispatch(setShowAppUpdateModal(false));
    save("checkedVersionUpdate", true);
  }

  const handleDownloadApp = async () => {
    if (appUpdateDetails?.url) {
      if (appUpdateDetails?.isforceUpdated) await forceLogout();
      setShowModal();
      Linking.openURL(appUpdateDetails?.url);
    }
  }

  const forceLogout = async () => {
    await dispatch(logout());
    await dispatch(dailycarelogout());
    await dispatch(centreLogout());
    await dispatch(learningLogout());
    await AsyncStorage.clear();
    await dropAllTables();
    await navigation.navigate("SplashScreen");
    return true;
  }

  if (!showAppUpdateModal) return <View />

  return (
    <ModalView
      showModal={showAppUpdateModal}
      setShowModal={setShowModal}
      heading={appUpdateDetails?.isforceUpdated ? 'Update Required' : 'New App Available'}
      showClose={false}
      showBackDrop={true}
      istitleCentre={true}
      disabledBackDropClose={true}
      contentWidth={Dimensions.get('screen').width - 60}
    >
      <View style={styles.contentView}>
        <Text style={styles.descText}>{appUpdateDetails?.isforceUpdated ? `We've just released a new version. To continue using the Your Child's Day app please update to the latest version. We apologise for any inconvenience.` : `We've just released a new version of the Your Child's Day app. For the best experience, we recommend you download the latest version now.`}</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={[styles.buttonView, { backgroundColor: theme.colors?.primary[600] }]} onPress={() => handleDownloadApp()}>
            <Text style={[styles.buttonText, {color: theme.colors?.trueGray[50]}]}>Download now</Text>
          </TouchableOpacity>
          {!appUpdateDetails?.isforceUpdated ? <TouchableOpacity style={styles.buttonView} onPress={setShowModal}>
            <Text style={styles.buttonText}>I'll do it later</Text>
          </TouchableOpacity> : null}
        </View>
      </View>
    </ModalView>
  );
};

export default AppVersionUpdate;


const style = (theme: any) => StyleSheet.create({
  contentView: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  descText: {
    color: theme?.isLightTheme ? theme?.colors?.primaryTextColor : theme?.colors?.trueGray[50],
    fontFamily: AppTypography?.Poppins[400].normal,
    fontSize: AppFontSizes.FONT_SIZE_12,
    textAlign: 'center',
  },
  btnContainer: {
    marginTop: 10
  },
  buttonView: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: theme?.colors?.primary[100],
  },
  buttonText: {
    lineHeight: 21,
    color: theme?.colors?.primaryTextColor,
    fontFamily: AppTypography.Poppins[700].normal,
    fontSize: AppFontSizes.FONT_SIZE_12,
    textTransform: 'uppercase'
  }
})