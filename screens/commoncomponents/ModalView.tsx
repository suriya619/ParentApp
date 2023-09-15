import React from "react";
import { View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Icons from '../../assets/icons/icons';
import { AppFontSizes, AppTypography } from '../../assets/styles/themes';
import useThemedStyles from "../../context/useThemedStyles";
import useTheme from "../../context/useTheme";

function ModalView(props: any) {
  const { showModal, setShowModal, children, heading, showClose, showBackDrop, disabledBackDropClose, istitleCentre, contentWidth, customStyle } = props;

  const theme = useTheme();
  const styles = useThemedStyles(style);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => !disabledBackDropClose ? setShowModal(false) : null}
    >
      <TouchableOpacity activeOpacity={1} style={[styles.modalView, showBackDrop && {backgroundColor: "rgba(71, 85, 105, 0.4)"}]} onPress={() => !disabledBackDropClose ? setShowModal(false) : null}>
        <View style={contentWidth? {width: contentWidth} : styles.modalContent}>
          <View style={[styles.titleWrapper, istitleCentre && !showClose? styles.alignCentre : null]}>
            <Text style={[styles.title, customStyle?.title ? customStyle?.title : null]} >{heading}</Text>
            {showClose && <TouchableOpacity onPress={() => setShowModal(false)}>
              <Icons type={"Ionicons"} name={"md-close-sharp"} color={customStyle?.iconColor ? customStyle?.iconColor : theme?.colors?.iconColor} size={20} />
            </TouchableOpacity>}
          </View>
          <View style={styles.contentView}>
            {children}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default ModalView;

const style = (theme: any) => StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get('window').height,
  },
  modalContent:{
    width: Dimensions.get('screen').width - 80,
  },
  contentView: {
    backgroundColor: theme?.colors?.modalBgColor,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    backgroundColor: theme?.colors?.modalBgColor,
    padding: 16,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: theme?.colors?.borderColor
  },
  title: {
    fontFamily: AppTypography.Poppins[600].normal,
    fontSize: AppFontSizes.FONT_SIZE_14,
    lineHeight: 20,
    color: theme?.isLightTheme ? theme?.colors?.primaryTextColor : theme?.colors?.primary[600]
  },
  iconColor: {
    color: theme?.colors?.iconColor
  },
  alignCentre: {
    justifyContent: 'center',
  }
});