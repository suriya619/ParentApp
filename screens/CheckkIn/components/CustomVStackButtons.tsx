import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native"
import useThemedStyles from "../../../context/useThemedStyles";
import { AppFontSizes, AppTypography } from "../../../assets/styles/themes";
import useTheme from "../../../context/useTheme";

export default function CustomVStackButtons(props: any) {
    const { state, onPress, data } = props;
    const theme = useTheme();
    const styles = useThemedStyles(style);

    return (
        <>
            {
                (data || []).map((ele: any, index: number) => (
                    <TouchableOpacity key={index} style={[styles.collectioncontent, {
                        borderColor: state === ele?.value ? theme?.colors?.primary[675] : theme?.colors?.borderColor,
                        borderWidth: state === ele?.value ? 2 : 1,
                        borderTopWidth: state === ele?.value ? 2 : (data.findIndex((item: any) => item?.value === state) > -1 && index == data.findIndex((item: any) => item?.value === state) + 1 ? 0 : 1),
                        borderBottomWidth: state === ele?.value ? 2 : (index + 1 === data?.length? 1 : 0),
                        borderTopLeftRadius: index === 0 ? 4 : 0,
                        borderTopRightRadius: index === 0 ? 4 : 0,
                        borderBottomLeftRadius: index + 1 === data?.length ? 4 : 0,
                        borderBottomRightRadius: index + 1 === data?.length ? 4 : 0,
                        ...(state === ele?.value && { backgroundColor: theme?.colors?.primary[50] }),
                    }]} onPress={() => onPress(8, ele?.value)}>
                        <Text style={styles.collections}>{ele?.label}</Text>
                    </TouchableOpacity>
                ))}
        </>
    );
}

const style = (theme: any) => StyleSheet.create({
    collectioncontent: {
        display: 'flex',
        flexDirection: 'row',
        height: 44,
        width: "100%",
        paddingTop: 4,
        justifyContent: 'space-between',
    },
    collections: {
        flex: 1,
        alignSelf: "center",
        textAlign: "center",
        color: theme?.colors?.primary[675],
        fontFamily: AppTypography.Poppins[500].normal,
        fontSize: AppFontSizes.FONT_SIZE_13,
    },
    
})