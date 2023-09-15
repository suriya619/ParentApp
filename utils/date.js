import moment from "moment";
import momentTimeZone from "moment-timezone";

const tz = momentTimeZone.tz.guess();

const convertLocaleTime = (dateString, timeZone = "Australia/Brisbane") => {
  let stringInput = dateString || "2021-04-22 22:41:00";
  const dateObject = momentTimeZone
    .tz(stringInput, timeZone)
    .tz(tz)
    .format("hh:mm A");
  return dateObject.toString();
};

const convertLocaleDateTime = (dateString, timeZone = "Australia/Brisbane") => {
  let stringInput = dateString || "2021-04-22 22:41:00";
  const splitDate = stringInput.split(" ");
  const splitDate1 = splitDate[0].split("/").reverse();
  const splitDate2 = `${splitDate1[0]}-${splitDate1[2]}-${splitDate1[1]} ${splitDate[1]}` // `${splitDate1[0]}-${splitDate1[2]}-${splitDate1[1]} ${splitDate1[1]}`;
  const dateObject = momentTimeZone
    .tz(splitDate2, timeZone)
    .tz(tz)
    .format("DD/MM/YYYY hh:mm A");
  return dateObject.toString();
};
const convertLocaleDateTimeLong = (dateString, timeZone = "Australia/Brisbane") => {
  let stringInput = dateString || "2021-04-22 22:41:00";
  const splitDate = stringInput.split(" ");
  const splitDate1 = splitDate[0].split("/").reverse();
  const splitDate2 = `${splitDate1[0]}-${splitDate1[2]}-${splitDate1[1]} ${splitDate[1]}` // `${splitDate1[0]}-${splitDate1[2]}-${splitDate1[1]} ${splitDate1[1]}`;
  const dateObject = momentTimeZone
    .tz(splitDate2, timeZone)
    .tz(tz)
    .format("dddd DD MMM YYYY h:mm A");
  return dateObject.toString();
};
const convertLocaleDateTimeLongNew = (dateString, timeZone = "Australia/Brisbane") => {
  let stringInput = dateString || "2021-04-22";
  const splitDate = stringInput.split("T");
  // const splitDate1 = splitDate[0].split("/").reverse();
  const splitDate2 = `${splitDate[0]} 22:41:00` // `${splitDate1[0]}-${splitDate1[2]}-${splitDate1[1]} ${splitDate1[1]}`;
  const dateObject = momentTimeZone
    .tz(splitDate2, timeZone)
    .tz(tz)
    .format("dddd DD MMM YYYY");
  return dateObject.toString();
};
const convertLocaleTimetoServerTime = (
  dateString,
  timeZone = "Australia/Brisbane"
) => {
  const dateObject = momentTimeZone
    .tz(dateString, tz)
    .tz(timeZone)
    .format("HH:mm:ss");
  return dateObject.toString();
};

const convert12to24hrs = (hrsString, timeZone = "Australia/Brisbane") => {
  const dateString = momentTimeZone(hrsString, "h:mm a").format(
    "YYYY-MM-DD HH:mm:ss"
  );
  const dateObject = momentTimeZone
    .tz(dateString, tz)
    .tz(timeZone)
    .format("HH:mm:ss");
  return dateObject;
};

const convertDateformat = (
  date,
  format = "YYYY-MM-DD",
  timeZone = "Australia/Brisbane"
) => {
  if (date) {
    const dateObject = momentTimeZone.tz(date, tz).tz(timeZone).format(format);
    return dateObject.toString();
  }
  return "";
};

const getChildAgeinMonths = (date, timeZone = "Australia/Brisbane") => {
  if (date) {
    var startDateTimeZone = momentTimeZone.tz(date, tz).tz(timeZone).format();
    var startDate = moment(startDateTimeZone);
    var endDateTimeZone = momentTimeZone
      .tz(new Date(), tz)
      .tz(timeZone)
      .format();
    var endDate = moment(endDateTimeZone);
    var monthDiff = endDate.diff(startDate, "months");
    return monthDiff;
  }
  return -1;
};

const getLastWeeksDate = () => {
  const now = new Date();
  return moment(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
  ).format("DD-MM-YYYY");
};

const getCurrentDate = () => {
  const now = new Date();
  return moment(new Date()).format("YYYY-MM-DD");
};

const getPast6monthsDate = () => {
  const now = new Date();
  return moment(now.setMonth(now.getMonth() - 6)).format("YYYY-MM-DD");
};

const getDaysArray = function (start, end) {
  for (
    var arr = [], dt = new Date(start);
    dt < new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(moment(new Date(dt)).format("DD-MM-YYYY"));
  }
  return arr;
};

const getPastTwoWeekDate = () => {
  var pastTwoWeeks = new Date(new Date() - 1209600000);
  pastTwoWeeks = moment(pastTwoWeeks).format("DD-MM-YYYY");
  return pastTwoWeeks;
};

const getPastTwoWeeksInbetweenDates = () => {
  var daylist = getDaysArray(new Date(getPastTwoWeekDate()), new Date());
  return daylist.map((v) => v);
};

const convertDateTimetoString = (datetime) => {
  const date = new Date(datetime);
  var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  var day = date?.getDate();
  var month = date?.getMonth();
  var year = date?.getFullYear();
  var dayOfWeek = date?.getDay();

  var dateString = dayNames[dayOfWeek] + ' ' + day + ' ' + monthNames[month] + ' ' + year;

  return dateString;
}

export {
  convertLocaleTime,
  convertLocaleTimetoServerTime,
  convert12to24hrs,
  convertDateformat,
  getChildAgeinMonths,
  convertLocaleDateTime,
  getLastWeeksDate,
  getCurrentDate,
  getPast6monthsDate,
  getDaysArray,
  getPastTwoWeekDate,
  convertLocaleDateTimeLong,
  convertLocaleDateTimeLongNew,
  convertDateTimetoString
};
