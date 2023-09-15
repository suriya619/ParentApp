import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { isEmpty, orderBy } from "lodash";
import ModalView from "./ModalView";
import useTheme from "../../context/useTheme";
import useThemedStyles from "../../context/useThemedStyles";
import { AppFontSizes, AppTypography } from "../../assets/styles/themes";
import Icons from "../../assets/icons/icons";
import { convertDateTimetoString } from "../../utils/date";


const SelectMedicalorGeneralNotes = (props: any) => {

    const { placeholderText, type, setState, state, data, activeModal, setActiveModal, callback, onSelectedItems } = props;
    const theme = useTheme();
    const styles = useThemedStyles(style);
    const [datasource, setDatasource] = useState(data);

    useEffect(() => {
        if (!isEmpty(data)) {
            setDatasource(data);
        }
    }, [data]);

    return (
        <>
            <ModalView
                showModal={activeModal}
                setShowModal={setActiveModal}
                heading={`Recent ${placeholderText} Notes`}
                type={placeholderText}
                showClose={true}
                showBackDrop={true}
                customStyle={{
                    iconColor: theme?.colors?.primary[675],
                    title: {
                        color: theme?.colors?.primary[675]
                    }
                }}
            >
                <View style={styles.contentHeight}>
                    <ScrollView bounces={false}>
                        {
                            !isEmpty(datasource) ? (orderBy(datasource, "id", "desc") || []).map((item: any, index: any) => (
                                <TouchableOpacity key={index} onPress={() => onSelectedItems(type, item)} style={[styles.optionStyle, (index + 1) === (datasource || []).length ? styles.noBorder : null]}>
                                    <View style={styles.optionView}>
                                        <Text style={styles.optionViewText}>{convertDateTimetoString(item?.date)}</Text>
                                        <Icons type="Ionicons" name={"chevron-forward"} color={theme?.isLightTheme ? theme?.colors?.primaryTextColor : theme?.colors?.trueGray[400]} size={16} />
                                    </View>
                                    <Text key={index} style={styles.subText}>{item.notes}</Text>
                                </TouchableOpacity>
                            )) : <View style={styles.p16}>
                                <Text style={styles.noContent}>{`No recent ${placeholderText.toLowerCase()} notes found for this child`}</Text>
                            </View>
                        }
                    </ScrollView>
                </View>
            </ModalView>
        </>
    );
};

export default SelectMedicalorGeneralNotes;


const style = (theme: any) => {
    return StyleSheet.create({
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
            padding: 16, 
            borderBottomWidth: 1,
            borderBottomColor: theme?.colors?.gray[200],
        },
        optionView: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: "100%",
            paddingRight:3
        },
        divider: {
            height: 0.5,
            backgroundColor: "#d3d3d3",
            width: Dimensions.get('screen').width,
        },
        optionViewText: {
            color: theme?.isLightTheme ? theme?.colors?.primary[675] : theme?.colors?.trueGray[50],
            fontFamily: AppTypography?.Poppins[700].normal,
            fontSize: AppFontSizes.FONT_SIZE_11,
        },
        subText: {
            color: theme?.isLightTheme ? theme?.colors?.primary[675] : theme?.colors?.trueGray[50],
            fontFamily: AppTypography?.Poppins[400].normal,
            fontSize: AppFontSizes.FONT_SIZE_11,
            paddingRight: 16
        },
        contentHeight: {
            maxHeight: Dimensions.get('screen').height * 0.5,
        },
        noContent: {
            color: theme?.colors?.primary[675],
            fontFamily: AppTypography?.Poppins[400].normal,
            fontSize: AppFontSizes.FONT_SIZE_12
        },
        p16: {
            padding: 16
        },
        noBorder: {
            borderBottomWidth: 0,
        }
    })
}