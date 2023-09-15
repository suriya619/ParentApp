import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNetInfo } from "@react-native-community/netinfo";
import ModalView from "./ModalView";
import useTheme from "../../context/useTheme";
import useThemedStyles from "../../context/useThemedStyles";
import { AppFontSizes, AppTypography } from "../../assets/styles/themes";
import { setInternetMessageModal } from "../../store/global";


const InternetConnection = () => {

  const theme = useTheme();
  const styles = useThemedStyles(style);
  const dispatch = useDispatch();
  const netInfo = useNetInfo();

  const { status, type } = useSelector((state: any) => state.global.showInternetMessageModal);
  const [fetching, setFetching] = useState(false);

  const setShowModal = () => {
    dispatch(setInternetMessageModal(false, type));
  }

  const handleRetry = () => {
    setFetching(true);
    if (netInfo?.isConnected) {
      setShowModal();
      setFetching(false);
    } else {
      setTimeout(() => setFetching(false), 1000);
    }
  }

  if (!status) return <View />

  return (
    <ModalView
      showModal={status}
      setShowModal={setShowModal}
      heading="Something went wrong"
      showClose={false}
      showBackDrop={true}
      istitleCentre={true}
      disabledBackDropClose={true}
      contentWidth={Dimensions.get('screen').width - 60}
    >
      <View style={styles.contentView}>
        <Text style={styles.descText}>Please make sure your wifi or cellular data is working and try again.</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={[styles.buttonView, { backgroundColor: theme.colors?.primary[600] }]} onPress={() => handleRetry()}>
            <Text style={[styles.buttonText, { color: theme.colors?.trueGray[50] }]}>{fetching ? 'Trying...' : 'Try again'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalView>
  );
};

export default InternetConnection;


const style = (theme: any) => StyleSheet.create({
  contentView: {
    paddingVertical: 30,
    paddingHorizontal: 20,
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