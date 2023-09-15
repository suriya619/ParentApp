import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import ModalView from "./ModalView";
import useTheme from "../../context/useTheme";
import useThemedStyles from "../../context/useThemedStyles";
import { AppFontSizes, AppTypography } from "../../assets/styles/themes";
import { save } from "../../assets/styles/storage";
import Icons from "../../assets/icons/icons";
import { setCompanyOrServiceItem } from "../../store/auth";

const SelectCompanyorService = ({
  placeholderText,
  selectedCompanyService,
  setSelectedCompanyService,
}: any) => {

  const theme = useTheme();
  const styles = useThemedStyles(style);
  const dispatch = useDispatch();

  const companyList = useSelector((state: any) => state.activeUser.companyList);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [selectedSite, setSelectedSite] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [ref, setRef] = useState<ScrollView>();
  const [dataSourceCords, setDataSourceCords] = useState([] as number[]);
  const [scrollToIndex, setScrollToIndex] = useState(0);
  const [activeKey, setActiveKey] = useState(0)


  React.useEffect(() => {
    scrollHandler(activeKey)
  }, [activeKey, ref])

  const onValueChange = (item: any, centreID: number) => {
    const dataItem = {
      // apiURL: item.apiURL,
      companyID: item.companyID,
      companyName: item.companyName,
      centreID: item?.centreID,
      name: item?.name,
      siteAccess: item?.siteAccess,
      siteDatabase: item?.siteDatabase
    }
    setSelectedCompanyService(dataItem);
    save("CompanyorService", dataItem);
    dispatch(setCompanyOrServiceItem(dataItem));
    setShowModal(false);
  }

  const handleOpenModal = () => {
    setShowModal(true);
    if (isEmpty(selectedCompanyService)) {
      setSelectedCompany(null);
      setSelectedSite(null);
    } else {
      setSelectedCompany(selectedCompanyService);
      setSelectedSite(selectedCompanyService);
    }
  }

  const handleSelectedCompany = (item: any, index: any, length: any) => {
    if (selectedCompany?.companyName === item.companyName) {
      setSelectedCompany(null);
    } else {
      setSelectedCompany(item);
      setActiveKey(index)
    }
  }

  // const handleSelectedSite = (item: any) => {
  //   if (selectedSite?.siteAccess === item.siteAccess) {
  //     setSelectedSite(null);
  //   } else {
  //     setSelectedSite(item);
  //   }
  // }

  const scrollHandler = (key: any) => {
    if (dataSourceCords.length > scrollToIndex) {
      ref?.scrollTo({
        y: dataSourceCords[key] - 20, //we get the offset value from array based on key
        animated: true,
      });
    }

  };

  return (
    <>
      <TouchableOpacity activeOpacity={1} onPress={() => handleOpenModal()} style={[styles?.selectView]}>
        <Text style={[styles.inputStyle, isEmpty(selectedCompanyService) && { color: theme?.colors?.coolGray[400], fontFamily: AppTypography?.Poppins[400].normal }]}>{isEmpty(selectedCompanyService) ? placeholderText : `${selectedCompanyService?.companyName || ''}${selectedCompanyService?.name ? ` - ${selectedCompanyService?.name}` : ''}`}</Text>
        <Icons type="Entypo" name={"select-arrows"} color={theme?.colors?.coolGray[400]} size={16} />
      </TouchableOpacity>
      {
        showModal && <ModalView
          showModal={showModal}
          setShowModal={setShowModal}
          heading={"Select Company & Centre"}
          showClose={false}
          showBackDrop={true}
        >
          <View style={styles.contentHeight}>
            <ScrollView
              contentContainerStyle={styles.contentContainer}
              nestedScrollEnabled
              bounces={false}
              keyboardShouldPersistTaps="handled"
              ref={ref => { setRef(ref as any) }}
            >
              {
                !isEmpty(companyList) ? (companyList || []).map((item: any, index: any) => (
                  <React.Fragment key={index}>
                    {
                      !isEmpty(item?.companyList) ? (item?.companyList || []).map((companyobj: any, idx: any) => (
                        <View
                          key={idx} //keys will be needed for function 
                          onLayout={(event: any) => {
                            const layout = event.nativeEvent.layout;
                            dataSourceCords[idx] = layout.y; // we store this offset values in an array
                            setDataSourceCords(dataSourceCords);
                          }}
                        >
                          <TouchableOpacity onPress={() => handleSelectedCompany(companyobj, idx, item?.companyList.length)} style={[styles.optionStyle, { paddingVertical: 12, paddingHorizontal: 30 }]}>
                            <View
                              style={[styles.optionView, { paddingHorizontal: 25 }]}
                            >
                              <View style={[styles.downIcon]}>
                                <Icons type="Ionicons" name={(selectedCompany?.companyName === companyobj.companyName) ? "chevron-down" : "chevron-forward"} color={theme?.isLightTheme ? theme?.colors?.primaryTextColor : theme?.colors?.trueGray[400]} size={22} />
                              </View>
                              <Text style={[styles.subText, selectedCompanyService?.companyName === companyobj.companyName && { fontFamily: AppTypography?.Poppins[600].normal }]}>{`${companyobj.companyName}`}</Text>
                            </View>
                          </TouchableOpacity>

                          {
                            (selectedCompany?.companyName === companyobj.companyName) && !isEmpty(companyobj?.centreList) && (companyobj?.centreList || []).map((centerobj: any, inx: any) => (centerobj.name !== "" ? <TouchableOpacity key={inx} onPress={() => onValueChange(centerobj, centerobj.centreID)} style={[styles.optionStyle, { paddingVertical: 12 }]}>
                              <View
                                style={[styles.optionView, { paddingHorizontal: 45 }]}>
                                <Text style={[styles.subText, selectedCompanyService?.centreID === centerobj.centreID && selectedCompanyService?.name === centerobj.name && { fontFamily: AppTypography?.Poppins[600].normal }]}>{`- ${centerobj.name}`}</Text>
                                <View style={styles.forwardIcon}>
                                  <Icons type="Ionicons" name={"chevron-forward"} color={theme?.isLightTheme ? theme?.colors?.primaryTextColor : theme?.colors?.trueGray[400]} size={22} />
                                </View>
                              </View>
                            </TouchableOpacity> : null))}
                        </View>

                      )) : null
                    }
                  </React.Fragment>
                )) : <View style={styles.p16}>
                  <Text style={styles.noContent}>{`No company & centre found`}</Text>
                </View>
              }
            </ScrollView>
          </View>
        </ModalView>
      }
    </>
  );
};

export default SelectCompanyorService;


const style = (theme: any) => StyleSheet.create({
  selectView: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme?.isLightTheme ? theme?.colors?.coolGray[300] : theme?.colors?.coolGray[700],
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: theme?.isLightTheme ? theme?.colors?.commonWhite : theme?.colors?.coolGray[800],
  },
  inputStyle: {
    color: theme?.isLightTheme ? theme?.colors?.primary[800] : theme?.colors?.commonWhite,
    fontFamily: AppTypography?.Poppins[600].normal,
    fontSize: AppFontSizes.FONT_SIZE_12,
    width: "90%"
  },
  optionStyle: {
    padding: 12,
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
    paddingLeft: 25
  },
  subText: {
    color: theme?.isLightTheme ? theme?.colors?.primaryTextColor : theme?.colors?.trueGray[50],
    fontFamily: AppTypography?.Poppins[400].normal,
    fontSize: AppFontSizes.FONT_SIZE_12,
    paddingRight: 2
  },
  contentHeight: {
    maxHeight: Dimensions.get('screen').height * 0.5,
  },
  noContent: {
    color: theme?.colors?.primaryTextColor,
    fontFamily: AppTypography?.Poppins[400].normal,
    fontSize: AppFontSizes.FONT_SIZE_12
  },
  p16: {
    padding: 16
  },
  noBorder: {
    borderTopWidth: 0,
  },
  forwardIcon: {
    position: 'absolute',
    right: 0,
  },
  downIcon: {
    position: 'absolute',
    left: 0,
  },
  contentContainer: {
    flexGrow: 1,
  },
})