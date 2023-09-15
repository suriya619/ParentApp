// import { Select } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Icons from "../../../assets/icons/icons";
import useTheme from "../../../context/useTheme";
import useThemedStyles from "../../../context/useThemedStyles";
import { AppFontSizes, AppTypography } from "../../../assets/styles/themes";
import SelectOptionModal from "./SelectOptionModal";
import { isEmpty } from "lodash";

const ActionSheetSelect = ({
  accessibilityLabelText,
  placeholderText,
  formData,
  setData,
  type,
  timearray,
  minutesarray,
  fullArray,
  callBack,
  activeNode
}: any) => {

  const theme = useTheme();
  const styles = useThemedStyles(style);

  const [showModal, setShowModal] = useState(false);

  const onValueChange = (value: any) => {
    setData({ ...formData, [type]: value });
  }

  return (
    <>
      {/* <Select
        accessibilityLabel={accessibilityLabelText}
        placeholder={placeholderText}
        _selectedItem={{ bg: "secondary.300" }}
        // mt="1"
        _actionSheetContent={{
          height: "400",
        }}
        selectedValue={formData[type]}
        onValueChange={onValueChange}
      >
        {fullArray ? fullArray.map((hrs, idx) => {
          return <Select.Item
            key={hrs + idx}
            label={hrs}
            value={hrs}
            justifyContent="center"
          />
        }) : timearray.map((hour, hourIndex) => {
          return minutesarray.map((min, minIndex) => {
            if (hour + min === "12:00 am") return false
            return (
              <Select.Item
                key={hourIndex * 10 + minIndex}
                label={hour + min}
                value={hour + min}
                justifyContent="center"
              />
            );
          });
        })}
      </Select> */}
      <TouchableOpacity activeOpacity={1} onPress={() => {
        callBack && callBack();
        setShowModal(true)
      }} style={styles?.selectView}>
        <Text style={[styles.inputStyle, isEmpty(formData[type]) && { color: theme?.colors?.gray[100] }]}>{isEmpty(formData[type]) ? placeholderText : (formData[type] || "")?.replace(" ", "").toUpperCase()}</Text>
        {/* <TextInput
          value={formData[type]}
          placeholder={placeholderText}
          placeholderTextColor={theme?.colors?.trueGray[400]}
          editable = {false}
          style={styles.inputStyle}
        /> */}
        <Icons type="AntDesign" name={"clockcircleo"} color={theme?.colors?.blueGrayIconColor} size={20} />
      </TouchableOpacity>
      {
        showModal && <SelectOptionModal
          showModal={showModal}
          setShowModal={setShowModal}
          timearray={timearray}
          fullArray={fullArray}
          minutesarray={minutesarray}
          selected={formData[type]}
          onSelected={(value: any) => onValueChange(value)}
          activeNode={activeNode}
        />
      }
    </>
  );
};

export default ActionSheetSelect;


const style = (theme: any) => StyleSheet.create({
  selectView: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme?.colors?.borderColor,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  inputStyle: {
    color: theme?.colors?.primary[350],
    fontFamily: AppTypography?.Poppins[400].normal,
    fontSize: AppFontSizes.FONT_SIZE_13,
    width: "90%"
  }
})