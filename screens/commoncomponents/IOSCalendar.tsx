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
  Modal,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";

export default function IOSCalendar({ date, setDate, setCacheClear }) {
  const [showModal, setShowModal] = useState(false);
  const [selectDate, setSelectDate] = useState(date);

  const today = new Date();
  const cacheClear = Date.now().toString();

  const dateOptions = {
    weekday: "short",
    month: "short",
    day: "2-digit",
  };

  // const day = new Intl.DateTimeFormat("en-AU", dateOptions).format(date);

  const day = moment(date).format("ddd, MMM DD");

  const isYear = () => {
    return date.getFullYear() !== today.getFullYear()
      ? " " + date.getFullYear()
      : "";
  };

  const isToday = () => {
    // checks if the date is today
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

  const prevDay = () => {
    const dayBefore = new Date(date.getTime());
    dayBefore.setDate(date.getDate() - 1); //setDate here is the JS Date object method, not to be confused with the setDate hook
    setDate(dayBefore); // this is the setDate hook
  };

  const nextDay = () => {
    if (!isToday()) {
      const dayAfter = new Date(date.getTime());
      dayAfter.setDate(date.getDate() + 1); //setDate here is the JS Date object method, not to be confused with the setDate hook
      setDate(dayAfter); // this is the setDate hook
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setSelectDate(currentDate);
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
        <VStack alignItems="center">
          <Pressable
            onPress={() => {
              setShowModal(true);
              console.log("setShowModal date clicked");
            }}
          >
            <HStack space="2" alignItems="center">
              <Text fontWeight="semibold">
                {day + isYear()}
              </Text>
              <Icon
                as={Ionicons}
                name="calendar-sharp"
                size="sm"
              />
            </HStack>
          </Pressable>
          {
            // Checks if the selected date is 2 or more days behind the current day and renders a go back to today button .  Uses date && to render
            date && date.getTime() < today.getTime() - 172800000 && (
              <Pressable
                onPress={() => {
                  setDate(today);
                  console.log("setDate clicked");
                }}
              >
                <Text fontSize="xs">
                  Go to Today{" "}
                </Text>
              </Pressable>
            )
          }
        </VStack>
        <Button
          variant="ghost"
          rightIcon={<Icon as={AntDesign} name="right" size="sm" />}
          onPress={() => {
            nextDay();
            console.log("nextDay clicked");
          }}
        />
      </HStack>
    </Box>
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} >
      <Modal.Content maxWidth="400px" >
        <Modal.CloseButton />
        <Modal.Header _text={{ color: "primary.500"}}>Select a Day</Modal.Header>
        <Modal.Body>
          <DateTimePicker
            testID="dateTimePicker"
            value={selectDate || date}
            onChange={onChange}
            mode="date"
            textColor="#2D5662"
            display="spinner"
            maximumDate={today}
            onPress={() => {
              console.log("onChange clicked");
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="light"
            size="md"
            flex="1"
            onPress={() => {
              setDate(selectDate);
              setSelectDate(selectDate);
              setCacheClear(cacheClear);
              setShowModal(false);
              console.log("selectDate clicked");
            }}
          >
            Select
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  </>
  );
}
