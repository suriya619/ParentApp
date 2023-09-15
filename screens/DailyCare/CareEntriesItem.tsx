import "intl";
import "intl/locale-data/jsonp/en";
import { isEmpty } from "lodash";
import {
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { convertLocaleTime } from "../../utils/date";
import Icons from "../../utils/icons";

const CareEntriesItem = ({ length, item, index }) => {
  const [showInfo, setShowInfo] = useState();
  const renderIcon = () => {
    let IconString = "BOTTLE";
    switch (true) {
      case (item?.TimelineDescription?.toLowerCase().indexOf("sign in") != -1):
        IconString = "SIGNIN";
        break;
      case (item?.TimelineDescription?.toLowerCase().indexOf("sign out") != -1):
        IconString = "SIGNOUT";
        break;
      case (item?.TimelineDescription?.toLowerCase().indexOf("nappy") != -1):
        IconString = "NAPPY";
        break;
      case (item?.TimelineDescription?.toLowerCase().indexOf("toilet") != -1):
        IconString = "TOILET";
        break;
      case (item?.TimelineDescription?.toLowerCase().indexOf("undies") != -1):
        IconString = "UNDIES";
        break;
      case (item?.ChildTaskDescription?.toLowerCase().indexOf("meal") != -1):
        IconString = "FOOD";
        break;
      case (item?.TimelineDescription?.toLowerCase().indexOf("water") != -1):
        IconString = "WATER";
        break;
      case (item?.TimelineDescription?.toLowerCase().indexOf("milk") != -1):
        IconString = "MILK";
        break;
      case (item?.TimelineDescription?.toLowerCase().indexOf("bottle") != -1):
        IconString = "BOTTLE";
        break;
      default:
        IconString = "SLEEP";
    }
    return IconString
  }
  return (
    <>
      <React.Fragment key={index}>
        <VStack>
          <Pressable
            onPress={() =>
              showInfo ===
                `${item.ChildDailyTaskID}_${item.ChildTaskDescription}`
                ? setShowInfo()
                : setShowInfo(
                  `${item.ChildDailyTaskID}_${item.ChildTaskDescription}`
                )
            }
          >
            <HStack justifyContent="space-between">
              <VStack width="80%">
                <HStack space="3" my="3">
                  <Icons iconName={renderIcon()} />
                  <VStack ml={0.5} flex={1}>
                    {
                      !isEmpty(item.TimelineDescription) && (
                        <Text
                          mr="3"
                          pt='2'
                          fontSize="sm"
                          fontWeight="semibold"
                          _light={{ color: "primary.500" }}
                          _dark={{ color: "coolGray.400" }}
                        >
                          {item.TimelineDescription}
                        </Text>
                      )}
                      {item?.TimelineDescription?.toLowerCase()?.indexOf("sign") > -1 && (!isEmpty(item.Medication) || !isEmpty(item.Notes))&&
                      <VStack space="0" pt={2}>
                        <EntryInfoNew
                        info={{ 
                          MEDICATION: item.Medication, 
                          NOTES: item.Notes
                         }}
                         inner
                      />
                      </VStack>
                      }
                      {
                      !isEmpty(item.Notes) && item?.TimelineDescription?.toLowerCase()?.indexOf("sign") === -1  && (
                        <Text
                          mr="3"
                          pt='1'
                          fontSize="sm"
                          fontWeight="normal"
                          _light={{ color: "primary.500" }}
                          _dark={{ color: "coolGray.400" }}
                        >
                          {item.Notes}
                        </Text>
                      )}
                  </VStack>
                </HStack>
              </VStack>
              <Text
                py="2"
                _light={{ color: "primary.500" }}
                _dark={{ color: "coolGray.400" }}
                fontSize="sm"
                pt='5'
              >
                {convertLocaleTime(item.TaskDateTimeStamp)}
              </Text>
            </HStack>
            {showInfo ===
              `${item.ChildDailyTaskID}_${item.ChildTaskDescription}` && (
                <VStack space="0">
                  <EntryInfo
                    info={{ 
                      StaffName: item.StaffName, 
                      // Notes: item.Notes
                     }}
                  />
                </VStack>
              )}
          </Pressable>
          {index == length - 1 ? null : (
            <Divider
              orientation="horizontal"
              thickness={1}
              _dark={{ bg: "coolGray.500" }}
              _light={{ bg: "coolGray.200" }}
            />
          )}
        </VStack>
      </React.Fragment>
    </>
  );
};

export default React.memo(CareEntriesItem, (prevprops, nextprops) => {
  if (JSON.stringify(prevprops.item) !== JSON.stringify(nextprops.item)) {
    return false;
  }
  return true;
});

const EntryInfo = ({ info, inner }) => {
  return Object.entries(info).map(([k, v], i) => {
    k = k === "StaffName" ? "EDUCATOR" : k;
    return (
      <VStack key={i}>
        <HStack paddingBottom={2} paddingLeft={12} marginLeft={3}>
          {!inner && <Text
            fontWeight='light'
            _light={{ color: "primary.400" }}
            _dark={{ color: "coolGray.400" }}
            fontSize="sm">
            {k + ": "}
          </Text>}
          <Text
            _light={{ color: "primary.400" }}
            _dark={{ color: "coolGray.400" }}
            textTransform={k === 'EDUCATOR' ? 'uppercase' : null}
            fontWeight='medium'
            fontSize="sm">{inner ? `${k} : ${v}` : (isEmpty(v) ? "-" : v) }</Text>
        </HStack>
      </VStack>
    );
  });
};
const EntryInfoNew = ({ info, inner }) => {
  return Object.entries(info).map(([k, v], i) => {
    k = k === "StaffName" ? "EDUCATOR" : k;
    return (
      <VStack key={i} marginRight={'-20%'}>
        <HStack paddingBottom={0.5}>
          <Text
            _light={{ color: "primary.500" }}
            _dark={{ color: "coolGray.400" }}
            textTransform={k === 'EDUCATOR' ? 'uppercase' : null}
            fontWeight='medium'
            fontSize="sm">{`${k}: ${(isEmpty(v) ? "-" : v)}`}</Text>
        </HStack>
      </VStack>
    );
  });
};
