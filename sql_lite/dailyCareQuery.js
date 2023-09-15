import store from "../store";
import { setChildrenTimeline } from "../store/dailycare";
import { convertDateformat } from "../utils/date";

export const insertintoSyncTable = (date) => {
  // console.log("InsertintoSyncTable==========**********--------");

  try {
    global.db.transaction(function (tx) {
      tx.executeSql(
        `insert into synctable (SyncDate) select '${date}' WHERE NOT EXISTS (SELECT 1 FROM synctable WHERE SyncDate = '${date}')`,
        [],
        (tx, results) => {
          // console.log("Results *******", results.rowsAffected);
          if (results.rowsAffected > 0) {
            // console.log("synctable inserted successfully >> ");
          } else {
            console.log("synctable insert Failed");
          }
        },

        (err) => {
          console.log("insertintoSyncTable  ====", err);
        }
      );
    });
  } catch (err) {
    console.log("InsertintoSyncTable======", err);
  }
};

export const insertChildActivityWithTimeline = (responseItem) => {
  try {

    // To insert child_activity list data
    global.db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO child_activity(ChildID, ChildName, RoomID, RoomName, StaffName, DailyTaskTypeID, TaskTypeDescription, Date, TaskDateTimeStamp, ChildDailyTaskID, TaskTime, ChildTaskDescription, TimelineDescription) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          responseItem.ChildID,
          responseItem.ChildName,
          responseItem.RoomID,
          responseItem.RoomName,
          responseItem.StaffName,
          responseItem.DailyTaskTypeID,
          responseItem.TaskTypeDescription,
          responseItem.Date,
          responseItem.TaskDateTimeStamp,
          responseItem.ChildDailyTaskID,
          responseItem.TaskTime,
          responseItem.ChildTaskDescription,
          responseItem.TimelineDescription,
        ],
        (tx, results) => {
          // console.log("insertChildActivityWithTimeline sucesse");

          if (results.rowsAffected > 0) {
            //     console.log("child activities data inserted successfully >> ");
          } else console.log("child activities data insert Failed");
        },
        (tx, error) => {
          console.log(
            "insertChildActivityWithTimeline .. Data insert failed ",
            error
          );
        }
      );
    });
  } catch (err) {
    console.log("databaseCheck error >>>", err);
  }
};

export const deleteChildActivityWithTimeline = (responseItem) => {
  try {
    // console.log("* deleteChildActivityWithTimeline **", convertDateformat(responseItem.Date) )
    // To delete child_activity list with date
    global.db.transaction(function (tx) {
      tx.executeSql(
        "DELETE FROM child_activity WHERE Date = " + responseItem.Date,
        [],
        function (tx, res) {
          //     console.log(`delete query executed >>>> child_activity ---- deleted WHERE Date= ${convertDateformat(responseItem.Date)} from DB >>>`, res);
          return res;
        },
        function (tx, error) {
          //   console.log(`error delete query execute >>>> child_activity ------- deleted WHERE Date=${convertDateformat(responseItem.Date)} from DB >>>`, error);
          return error;
        }
      );
    });
  } catch (err) {
    console.log("databaseCheck error >>>", err);
  }
};

export const getChildActivityWithDate = (childID, date) => {
  return new Promise((resolve) => {
    global.db.transaction(function (txn) {
      txn.executeSql(
        `SELECT * FROM child_activity WHERE ChildID=${childID} AND Date='${date}'`,
        [],
        function (tx, res) {
          //console.log('first query executed', res);
          if (res.rows.length > 0) {
            //console.log("dailyCare db check child_activity list item count >>> " + res.rows.length);
            var temp = [];
            for (let i = 0; i < res.rows.length; ++i) {
              temp.push(res.rows.item(i));
            }
            store.dispatch(
              setChildrenTimeline({
                activityChildrenTimeline: temp,
              })
            );
          } else {
            store.dispatch(
              setChildrenTimeline({
                activityChildrenTimeline: [],
              })
            );
          }
          resolve(res.rows);
        },
        function (error) {
          //    console.log("getChildActivityWithDate errorrr=== " + JSON.stringify(error));
        }
      );
    });
  });
};
