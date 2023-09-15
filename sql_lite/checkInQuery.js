import store from "../store";
import { setChildSigninStatusList } from "../store/auth";

export const insertChildSignInStatus = async (element, checkInDate) => {
  try {
    await global.db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO child_signin_status(ChildID, FirstName, LastName, ImagePath, LastAttendenceDate, ParentID, IsAbsent, SignInStatus, CheckInDate,BirthDate, IsBookedToday, IsFri, IsMon, IsOlderChild, IsPickup, IsThu, IsToday, IsTue, IsWed, NextBookingDate, SortIndex) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          element.ChildID,
          element.FirstName,
          element.LastName,
          element.ImagePath,
          element.LastAttendenceDate,
          element.ParentID,
          element.IsAbsent,
          element.SignInStatus,
          checkInDate,
          element.BirthDate,
          element.IsBookedToday,
          element.IsFri,
          element.IsMon,
          element.IsOlderChild,
          element.IsPickup,
          element.IsThu,
          element.IsToday,
          element.IsTue,
          element.IsWed,
          element.NextBookingDate,
          element.SortIndex,
        ],
        (tx, results) => {}
      );
    });
  } catch (err) {
    console.log("databaseCheck error - Insert child_signin_status >>>", err);
  }
};

export const deleteChildSignInStatus = (checkInDate) => {
  try {
    // To delete child_signin_status list with date
    global.db.transaction(function (tx) {
      tx.executeSql(
        `DELETE FROM child_signin_status WHERE CheckInDate='${checkInDate}'`,
        [],
        function (tx, res) {
          return res;
        },
        function (tx, error) {
          console.log(
            `error delete query execute >>>> child_activity deleted WHERE Date=${responseItem.Date} from DB >>>`,
            error
          );
          return error;
        }
      );
    });
  } catch (err) {
    console.log("databaseCheck error >>>", err);
  }
};

export const getAllChildSignInStatus = async (date, callback) => {
  try {
    await global.db.transaction(function (txn) {
      txn.executeSql(
        `SELECT * FROM child_signin_status where date(CheckInDate)='${date}'`,
        [],
        function (tx, res) {
          if (res.rows.length > 0) {
            var temp = [];
            for (let i = 0; i < res.rows.length; ++i) {
              temp.push(res.rows.item(i));
            }
            store.dispatch(
              setChildSigninStatusList({
                childSigninStatusList: temp,
              })
            );
            callback && callback(temp);
          } else {
            store.dispatch(
              setChildSigninStatusList({
                childSigninStatusList: [],
              })
            );
            callback && callback([]);
          }
        }
      );
    });
  } catch (err) {
    console.log("databaseCheck error - getAllChildSignInStatus>>>", err);
  }
};
