import moment, { isMoment } from "moment";
import { HStack, Text, VStack } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import Carousel from "../commoncomponents/Carousel";
import MoreLessText from "./MoreLessText";
import StaffAvatars from "../commoncomponents/StaffAvatar";

const LearningItem = ({ length, item, index }: any) => {
  // const isNotSnapItem = item?.ExperienceType?.toLowerCase()?.indexOf('snap') === -1 ;
  const isNotSnapItem = item?.LEActivityExperienceDashboard?.[0]?.Title !== "" && item?.LEActivityExperienceDashboard?.[0]?.Title !== null || item?.LEActivityExperienceDashboard?.[0]?.ParentActivities !== "" && item?.LEActivityExperienceDashboard?.[0]?.ParentActivities != null || item?.LEActivityExperienceDashboard?.[0]?.Level !== "" && item?.LEActivityExperienceDashboard?.[0]?.Level !== null || item.Description !== "" && item.Description !== null
  const isMAE = item.ExperienceType?.toUpperCase() == "MAE";
  const isPLE = item.ExperienceType?.toUpperCase() == "PLE";
  const isRELE = item.ExperienceType?.toUpperCase() == "RELE";
  const isMOMENT = item.ExperienceType?.toUpperCase() == "MO";

  const  getUserNameSplit = (type: string) => {
    if (item?.ImplementedByUserName !== "" || item?.ApprovedByUserName !== "") {
      const userName = item?.ImplementedByUserName !== ""? item?.ImplementedByUserName : item?.ApprovedByUserName;
      if (userName != ""){
        const splitUserName = userName.split(" ");
        if (type?.toLowerCase() === "firstname"){
          return splitUserName[0]? splitUserName[0] : "";
        } else if (type?.toLowerCase() === "lastname") {
          return splitUserName[1]? splitUserName[1] : "";
        }
      }
    }
    return "";
  }

  return (
    <>
      <React.Fragment key={index}>
        <VStack
          key={index}
          mb={index === length - 1 ? "180" : "3"}
          borderColor="coolGray.200"
          borderRadius={1}
          borderWidth={1}
          space={0}
          width="full"
          _light={{
            borderColor: "coolGray.200",
            bg: { base: "#fff" },
          }}
          _dark={{
            borderColor: "coolGray.700",
            bg: { md: "coolGray.900", base: "coolGray.800" },
          }}
        >
          <Text
            px={5}
            // py={2}
            paddingTop={item?.LEImageActivityDashboard.length > 0 ? 0 : 2}
            paddingBottom="2"
            fontSize="10"
            lineHeight="16"
            fontWeight="bold"
            _light={{ color: "black" }}
            _dark={{ color: "secondary.50" }}
            style={styles.dateFormat}
          >
            {item?.ImplementedDate != null
              ? moment(item?.ImplementedDate).format("dddd, DD MMMM, YYYY").toUpperCase()
              : item?.ApprovedDate != null
                ? moment(item?.ApprovedDate).format("dddd, DD MMMM, YYYY").toUpperCase()
                : ""}
          </Text>

          {item?.LEImageActivityDashboard.length > 0 ? (
            <HStack>
              <Carousel
                images={item.LEImageActivityDashboard.map((v) => v.ImagePath)}
                height="72"
                item={item}
              />
            </HStack>
          ) : null}

          <VStack
            borderWidth={{ md: "1" }}
            borderBottomWidth={{ base: isNotSnapItem ? "1" : "0" }}
            space={0}
            _light={{
              borderColor: "coolGray.200",
            }}
            _dark={{
              borderColor: "coolGray.700",
            }}
          >
            <Text
              px={5}
              pt={item.LEImageActivityDashboard.map((v) => v.ImagePath).length > 1 ? 5 : 0 }
              paddingBottom={"1"}
              fontSize="14"
              fontWeight="bold"
              letterSpacing="-.16"
              lineHeight="16"
              _light={{ color: "primary.500" }}
              _dark={{ color: "secondary.50" }}
            >
              {item.Title}
            </Text>
            <HStack space={3} justifyContent="flex-start" px={4} mb={3}>
              {item?.ImplementedByUserName !== "" ||
                item?.ApprovedByUserName !== "" ? (<StaffAvatars item={{
                  ImagePath: item.ImagePath || "",
                  FirstName: getUserNameSplit("FirstName"),
                  LastName:  getUserNameSplit("LastName")
              }} />) : null}
              <VStack space={1} flex={1}>
                {item?.ImplementedByUserName !== "" ||
                  item?.ApprovedByUserName !== "" ? (
                  <Text
                    fontSize="11"
                    fontWeight="semibold"
                    letterSpacing=".15"
                    _light={{ color: "#302841" }}
                    _dark={{ color: "secondary.50" }}
                  >
                    {item?.ImplementedByUserName != ""
                      ? item?.ImplementedByUserName.toUpperCase()
                      : item?.ApprovedByUserName != ""
                        ? item?.ApprovedByUserName.toUpperCase()
                        : ""}{" "}
                  </Text>
                ) : null}
                {item?.Evaluation !== "" ? (
                  <Text
                    fontSize="13"
                    fontWeight="light"
                    letterSpacing="-.15"
                    lineHeight="18"
                    _light={{ color: "#302841" }}
                    _dark={{ color: "secondary.50" }}
                  >
                    {item?.Evaluation}{" "}
                  </Text>
                ) : null}
              </VStack>
            </HStack>
          </VStack>

          {isNotSnapItem && !isPLE && !isMOMENT &&
            <VStack px={5} pt={4} pb={2}>
              <HStack>
                <Text
                  fontWeight="regular"
                  _light={{ color: "#302841" }}
                  _dark={{ color: "secondary.50" }}
                  letterSpacing=".15"
                  style={styles.activityText}
                >
                  ACTIVITY :{" "}
                </Text>
                <Text
                  _light={{ color: "#302841" }}
                  _dark={{ color: "secondary.50" }}
                  fontWeight="semibold"
                  letterSpacing=".15"
                  style={styles.activityTextValues}
                >
                  {item?.LEActivityExperienceDashboard?.[0]?.Title != null
                    ? item?.LEActivityExperienceDashboard?.[0]?.Title.toUpperCase()
                    : "-"}
                </Text>
              </HStack>
              <HStack>
                <Text
                  fontWeight="regular"
                  _light={{ color: "#302841" }}
                  _dark={{ color: "secondary.50" }}
                  style={styles.activityText}
                  letterSpacing=".15"
                >
                  CURRICULUM :{" "}
                </Text>
                <Text
                  _light={{ color: "#302841" }}
                  _dark={{ color: "secondary.50" }}
                  fontWeight="semibold"
                  letterSpacing=".15"
                  style={styles.activityTextValues}
                >
                  {item?.LEActivityExperienceDashboard?.[0]?.ParentActivities !=
                    null
                    ? item?.LEActivityExperienceDashboard?.[0]?.ParentActivities.toUpperCase()
                    : "-"}
                </Text>
              </HStack>
              {isMAE ? <HStack>
                <Text
                  _light={{ color: "#302841" }}
                  _dark={{ color: "secondary.50" }}
                  fontWeight="regular"
                  style={styles.activityText}
                  letterSpacing=".15"
                >
                  PROGRESS :{" "}
                </Text>
                <Text
                  _light={{ color: "#302841" }}
                  _dark={{ color: "secondary.50" }}
                  fontWeight="semibold"
                  style={styles.activityTextValues}
                  letterSpacing=".15"
                >
                  {item?.LEActivityExperienceDashboard?.[0]?.Level !== null
                    ? item?.LEActivityExperienceDashboard?.[0]?.Level.toUpperCase()
                    : "-"}
                </Text>
              </HStack> : null}
            </VStack>}

          {isNotSnapItem && !isMOMENT && <MoreLessText item={item.Description} paddingTop={isNotSnapItem && !isPLE && !isMOMENT ? 0 : 4} />}
        </VStack>
      </React.Fragment>
    </>
  );
};

export default React.memo(LearningItem);

const styles = StyleSheet.create({
  activityText: {
    flex: 1.3,
    fontSize: 10,
    lineHeight: 14,
    marginBottom: 3,
  },
  activityTextValues: {
    flex: 3,
    fontSize: 10,
    lineHeight: 14,
    marginBottom: 3,
  },
  dateFormat: {
    marginTop: 20
  }
});
