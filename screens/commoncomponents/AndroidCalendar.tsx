import { AntDesign, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import "intl";
import "intl/locale-data/jsonp/en";
import moment from "moment";
import {
  Box,
  Button,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { Platform } from "react-native";

const AndroidCalendar = ({ date, setDate, setCacheClear, setIsToday }) => {
  const today = new Date();
  const platform = Platform.OS;
  const [show, setShow] = useState(false);
  const cacheClear = Date.now().toString();
  const dateOptions = {
    weekday: "short",
    month: "short",
    day: "2-digit",
  };

  //const day = new Intl.DateTimeFormat("en-AU", dateOptions).format(date);
  const day = moment(date).format("ddd, MMM DD");

  const isToday = () => {
    // checks if the date is today, and calls setIsToday;
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const isYear = () => {
    return date.getFullYear() !== today.getFullYear()
      ? " " + date.getFullYear()
      : "";
  };

  const prevDay = () => {
    setIsToday(isToday());
    const dayBefore = new Date(date.getTime());
    dayBefore.setDate(date.getDate() - 1); //setDate here is the JS Date object method, not to be confused with the setDate hook
    setDate(dayBefore); // this is the setDate hook
  };

  const nextDay = () => {
    setIsToday(isToday());
    if (!isToday()) {
      const dayAfter = new Date(date.getTime());
      dayAfter.setDate(date.getDate() + 1); //setDate here is the JS Date object method, not to be confused with the setDate hook
      setDate(dayAfter); // this is the setDate hook
    }
  };

  const onChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setIsToday(isToday());
    setDate(currentDate);
    setCacheClear(cacheClear);
  };

  return (
    <>
      <Box
        borderBottomWidth="1"
        _light={{
          bg: "#FFF",
          borderColor: "#D8DCE6",
        }}
        _dark={{
          bg: "coolGray.800",
          borderColor: "coolGray.600",
        }}
        p="1"
      >
        <HStack alignItems="center" justifyContent="space-between">
          <Button
            variant="ghost"
            leftIcon={<Icon as={AntDesign} name="left" size="sm" />}
            onPress={prevDay}
          />
          <Pressable onPress={() => setShow(true)}>
            <VStack alignItems="center">
              <HStack space="2" alignItems="center">
                <Text color="primary.500" fontWeight="semibold">
                  {day + isYear()}
                </Text>
                <Icon
                  as={Ionicons}
                  name="calendar-sharp"
                  size="sm"
                  color="primary.500"
                />
              </HStack>
              {
                // Checks if the selected date is 2 or more days behind the current day and renders a go back to today button .  Uses date && to render
                date && date.getTime() < today.getTime() - 172800000 && (
                  <Pressable
                    onPress={() => {
                      setDate(today);
                      setIsToday(true);
                    }}
                  >
                    <Text fontSize="xs" color="primary.500">
                      Go to Today{" "}
                    </Text>
                  </Pressable>
                )
              }
            </VStack>
          </Pressable>
          <Button
            variant="ghost"
            rightIcon={<Icon as={AntDesign} name="right" size="sm" />}
            onPress={nextDay}
          />
        </HStack>
      </Box>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          onChange={onChange}
          textColor="#2D5662"
          mode="date"
          display="spinner"
          maximumDate={today}
        />
      )}
    </>
  );
};

export default React.memo(AndroidCalendar, (prevProps, nextProps) => {
  if (prevProps.date !== nextProps.date) {
    return false;
  }
  return true;
});
