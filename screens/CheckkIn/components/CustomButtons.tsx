import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native"
import useThemedStyles from "../../../context/useThemedStyles";
import { AppFontSizes, AppTypography } from "../../../assets/styles/themes";

export default function CustomButton(props: any) {
    const { onPress, state, options } = props;
    const styles = useThemedStyles(style);
    return (
        <View style={styles.sleepcontainer}>
            {
                (options || []).map((item: any, index: number) => (
                    <TouchableOpacity
                        style={[styles.buttoncontent, state === item?.value ? styles.activeButton : styles.inactiveButton]}
                        onPress={() => onPress(item?.value)}
                        key={index.toString()}
                    >
                        <Text
                            style={[styles.buttontext, state === item?.value && { fontFamily: AppTypography.Poppins[600].normal }]}>
                            {item?.label}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
}

const style = (theme: any) => StyleSheet.create({
    sleepcontainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttoncontent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "48%",
        height: 44,
        borderRadius: 4,
        shadowColor: "rgba(22,29,37, 0.05)",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
    },
    buttontext: {
        color: theme?.colors?.primary[675],
        fontFamily: AppTypography.Poppins[500].normal,
        fontSize: AppFontSizes.FONT_SIZE_12,
    },
    activeButton: {
        borderColor: theme?.colors?.primary[650],
        backgroundColor: theme?.colors?.primary[50],
        borderWidth: 2
    },
    inactiveButton: {
        borderColor: theme?.colors?.borderColor,
        borderWidth: 1
    }
})