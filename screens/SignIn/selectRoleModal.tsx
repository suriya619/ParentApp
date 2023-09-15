import React from "react";
import { Dimensions, ScrollView, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import ModalView from "../commoncomponents/ModalView";
import useTheme from "../../context/useTheme";
import useThemedStyles from "../../context/useThemedStyles";
import Icons from "../../assets/icons/icons";
import { AppFontSizes, AppTypography } from "../../assets/styles/themes";

interface iSelectUserRoleModal {
  showModal: boolean,
  setShowModal: any
  onValueChange: any
  data: any
  selectedData: any
}
const SelectUserRoleModal = ({ showModal, setShowModal, data, onValueChange, selectedData }: iSelectUserRoleModal) => {
  const theme = useTheme();
  const styles = useThemedStyles(style);
  return <ModalView
    showModal={showModal}
    setShowModal={setShowModal}
    heading={"Select site to visit"}
    showClose={false}
    showBackDrop={true}
  >
    <View style={styles.contentHeight}>
      <ScrollView bounces={false}>
        {data.map((el:any, idx:any) => <TouchableOpacity key={idx} onPress={() => onValueChange(el, el.centreId)} style={[styles.optionStyle, { paddingVertical: 12}]}>
          <View style={styles.optionView}>
            <Text key={idx} style={[styles.subText, selectedData?.centreId ===  el.centreId && selectedData?.centreName ===  el.centre && { fontFamily: AppTypography?.Poppins[600].normal }]}>{`${el.site_to_access} - ${el.role_name}`}</Text>
            <View style={styles.forwardIcon}>
              <Icons type="Ionicons" name={"chevron-forward"} color={theme?.isLightTheme ? theme?.colors?.primaryTextColor : theme?.colors?.trueGray[400]} size={24} />
            </View>
          </View>
        </TouchableOpacity>)}
        
      </ScrollView>
    </View>
  </ModalView>
}

const style = (theme: any) => StyleSheet.create({

  optionStyle: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme?.colors?.borderColor,
  },
  optionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  optionViewText: {
    color: theme?.isLightTheme ? theme?.colors?.primaryTextColor : theme?.colors?.trueGray[50],
    fontFamily: AppTypography?.Poppins[700].normal,
    fontSize: AppFontSizes.FONT_SIZE_12,
  },
  subText: {
    color: theme?.isLightTheme ? theme?.colors?.primaryTextColor : theme?.colors?.trueGray[50],
    fontFamily: AppTypography?.Poppins[400].normal,
    fontSize: AppFontSizes.FONT_SIZE_12,
  },
  contentHeight: {
    maxHeight: Dimensions.get('screen').height * 0.5,
  },
})
export default SelectUserRoleModal;