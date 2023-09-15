// import { TextArea } from "native-base";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Modal, TouchableOpacity, View, Text, Dimensions, TouchableHighlight, ScrollView, SafeAreaView } from "react-native";
import useTheme from "../../../context/useTheme";
import useThemedStyles from "../../../context/useThemedStyles";
import { AppFontSizes, AppTypography } from "../../../assets/styles/themes";

export default function SelectOptionModal({ showModal, setShowModal, selected, onSelected, timearray, minutesarray, fullArray, activeNode }: any) {
  const styles = useThemedStyles(style);
  
  const handleSelectedValue = (value: any) => {
    onSelected(value);
    setShowModal(false);
  }
  const theme = useTheme();
  const myScroll = useRef(null);
  
  return (
    <Modal
      animationType="fade"
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
      transparent={true}
    >
      <SafeAreaView style={{ flex: 1, marginBottom: 20 }}>
        <TouchableOpacity activeOpacity={1} style={styles.modalView} onPress={() => setShowModal(false)}>
          <View style={styles.modalContent}>
            <View style={styles.contentView}>
              <TouchableOpacity activeOpacity={1} onPress={() => setShowModal(false)} style={styles.horizontaView}>
                <View style={styles.horizontalIndicator} />
              </TouchableOpacity>
              <ScrollView bounces={false} ref={myScroll}>
                <View>
                  {
                    fullArray ? (fullArray || []).map((hrs: any, idx: any) => (
                      <TouchableHighlight underlayColor={theme?.colors?.secondary[100]} activeOpacity={0.5} key={hrs + idx} onPress={() => handleSelectedValue(hrs)} style={[styles.itemView, selected == hrs ? styles.selectedBg : styles.bg]}>
                        <Text style={styles.itemText}>{hrs}</Text>
                      </TouchableHighlight>
                    )) : (
                      (timearray || []).map((hour: any, hourIndex: any) => {
                        return minutesarray.map((min: any, minIndex: any) => {
                          if (hour + min === "12:00 am") return false
                          return (
                            <TouchableHighlight onLayout={(event: any) => {
                              const layout = event.nativeEvent.layout;
                              if (hour + min === "6:00 am") {
                                if (activeNode) myScroll.current?.scrollTo({ x: 0, y: layout.y, animated: true });
                              }
                            }} underlayColor={theme?.colors?.secondary[100]} activeOpacity={0.5} key={hourIndex * 10 + minIndex} onPress={() => handleSelectedValue(hour + min)} style={[styles.itemView, selected == (hour + min) ? styles.selectedBg : styles.bg]}>
                              <Text style={styles.itemText}>{hour + min}</Text>
                            </TouchableHighlight>
                          );
                        });
                      })
                    )
                  }
                </View>
              </ScrollView>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
}

const style = (theme: any) => StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(71, 85, 105, 0.4)",
  },
  modalContent: {
    width: "100%",
    height: Dimensions.get('screen').height * 0.5,
    backgroundColor: theme?.colors?.trueGray[50],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  horizontalIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme?.colors?.muted[500],
  },
  horizontaView: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 12,
    width: "100%"
  },
  itemView: {
    width: "100%",
    justifyContent: 'center',
    padding: 16
  },
  selectedBg: {
    backgroundColor: theme?.colors?.secondary[300]
  },
  bg: {
    backgroundColor: theme?.colors?.trueGray[50]
  },
  itemText: {
    lineHeight: 24,
    color: theme?.colors?.muted[900],
    fontSize: AppFontSizes.FONT_SIZE_14,
    fontFamily: AppTypography.Poppins[400].normal
  }
})
