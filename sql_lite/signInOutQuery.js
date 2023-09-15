import store from "../store";
import { setParent, setChildData } from "../store/auth";

export const createAllTables = () => {
  try {
    global.db.transaction(
      function (txn) {
        txn.executeSql(
          "CREATE TABLE IF NOT EXISTS parent(UserId	TEXT,FirstName	TEXT,LastName	TEXT,CompanyId	TEXT,ChildCareCentreId	TEXT,MobileNumber	TEXT,Email	TEXT,DateOfBirth	TEXT,CRNNumber TEXT,ParentId INTEGER,CompanyName	TEXT,CentreName	TEXT,UserRole	TEXT,UserStatus	TEXT,UserRequestStatusId	TEXT,UserImage	TEXT)",
          []
        );
        txn.executeSql(
          "CREATE TABLE IF NOT EXISTS child(ChildID	INTEGER ,CRNNumber	TEXT,FirstName	TEXT,LastName	TEXT,Gender	TEXT,BirthDate	TEXT,DateRegistered	TEXT,Notes	TEXT,Allergy	TEXT,ImagePath	TEXT,ParentId INTEGER)",
          []
        );
        txn.executeSql(
          "CREATE TABLE IF NOT EXISTS child_activity(ChildID INTEGER, ChildName TEXT, RoomID	TEXT,RoomName	TEXT, StaffName	TEXT, DailyTaskTypeID	TEXT,TaskTypeDescription TEXT,Date TEXT,TaskDateTimeStamp	TEXT, ChildDailyTaskID TEXT, TaskTime TEXT, ChildTaskDescription	TEXT,TimelineDescription TEXT)",
          []
        );
        txn.executeSql(
          "CREATE TABLE IF NOT EXISTS child_signin_status(ChildID INTEGER, FirstName TEXT, LastName	TEXT,ImagePath	TEXT, LastAttendenceDate	TEXT, ParentID	INTEGER, IsAbsent INTEGER, SignInStatus TEXT, CheckInDate TEXT, BirthDate TEXT, IsBookedToday NUMERIC, IsFri NUMERIC, IsMon NUMERIC, IsOlderChild NUMERIC, IsPickup NUMERIC, IsThu NUMERIC, IsToday NUMERIC, IsTue NUMERIC, IsWed NUMERIC, NextBookingDate TEXT, SortIndex INTEGER)",
          []
        );
        txn.executeSql(
          "CREATE TABLE IF NOT EXISTS centre_signinout_settings(CentreID INTEGER, InBabyFeed INTEGER, InBabyWakeTime	INTEGER, InCollectedBy	INTEGER, InCollectedTime	INTEGER, InImportantInfo	INTEGER, InMedication INTEGER, InMood INTEGER, InSignature INTEGER, InSleepWell INTEGER, InTime INTEGER, OutSignature INTEGER, OutTime INTEGER, UpdatedBy TEXT, UserRoleID INTEGER)",
          []
        );
        txn.executeSql(
          "CREATE TABLE IF NOT EXISTS centre_age_limit(Id INTEGER, BabyAgeLimit INTEGER, Description TEXT, SysCodeDefnition	TEXT,SyscodeLevel	TEXT)",
          []
        );
        txn.executeSql(
          "CREATE TABLE IF NOT EXISTS learning(ExperienceID INTEGER, ParentID INTEGER, InitiatorDate TEXT,InitiatorTitle TEXT, Title TEXT, TypeID INTEGER, RoomID INTEGER, StaffID INTEGER, StatusID INTEGER, Status TEXT, Description TEXT,AimDirect TEXT, AimIndirect TEXT, AssociatedVocobulary TEXT,PlanBy TEXT, PlanByUserName TEXT, PlanDate TEXT, PlanResourcesRequired TEXT, PlanPurpose TEXT, PlanMethod TEXT, Evaluation TEXT,InternalNote TEXT,IsDraft TEXT, ShareWithParents INTEGER,IsDeleted INTEGER,ImplementedBy TEXT, ImplementedByUserName TEXT,ImplementedDate TEXT, SharedBy TEXT, SharedByUserName TEXT, SharedDate TEXT, ApprovedBy TEXT, ApprovedByUserName TEXT, ApprovedDate TEXT, UpdatedBy TEXT,ExperienceType TEXT, IsChild INTEGER, LEImageActivityDashboard TEXT, LEGoalActivityDashboard TEXT, LEActivityExperienceDashboard TEXT, LEMontessoriReadninessActivityDashboard TEXT, LEFollowUpExperiencesActivityDashboard TEXT, ParentExperience TEXT)",
          []
        );
        // txn.executeSql(
        //   "CREATE TABLE IF NOT EXISTS synctable(ID INTEGER, SyncDate TEXT)",
        //   []
        // );
        // txn.executeSql(
        //   "CREATE TABLE IF NOT EXISTS learning(ExperienceID INTEGER, ParentID INTEGER, InitiatorDate TEXT, Title TEXT, TypeID INTEGER, RoomID INTEGER, StaffID INTEGER, StatusID INTEGER, Status TEXT, Description TEXT,AimDirect TEXT, AimIndirect TEXT, AssociatedVocobulary TEXT,PlanBy TEXT, PlanByUserName TEXT, PlanDate TEXT, PlanResourcesRequired TEXT, PlanPurpose TEXT, PlanMethod TEXT, Evaluation TEXT,InternalNote TEXT,IsDraft TEXT, ShareWithParents INTEGER,IsDeleted INTEGER,ImplementedBy TEXT, ImplementedByUserName TEXT,ImplementedDate TEXT, SharedBy TEXT, SharedByUserName TEXT, SharedDate TEXT, ApprovedBy TEXT, ApprovedByUserName TEXT, ApprovedDate TEXT, UpdatedBy TEXT,ExperienceType TEXT, IsChild INTEGER)",
        //   []
        // );
        // txn.executeSql(
        //   "CREATE TABLE IF NOT EXISTS learningimages(ExperienceID INTEGER, ImageID INTEGER, ImagePath TEXT, IsDeleted INTEGER, Sequence INTEGER, Remark TEXT, UpdatedBy TEXT) ",
        //   []
        // );
        // txn.executeSql(
        //   "CREATE TABLE IF NOT EXISTS insertChild(ActExID INTEGER, ActivityID INTEGER, ExperienceID INTEGER, ChildID INTEGER, ChildName TEXT,LevelID INTEGER,IsDeleted INTEGER) ",
        //   []
        // );

        // txn.executeSql(
        //   "CREATE TABLE IF NOT EXISTS insertGoal(GoalID INTEGER, ExperienceID INTEGER,ReferenceTable TEXT, ReferenceID INTEGER,IsDeleted INTEGER) ",
        //   []
        // );
      },

      (err) => {
        console.log("Error in creating all tables ", err);
      }
    );
    console.log(
      "databaseCheck success - Login >>> Created All Tables if not exists "
    );
  } catch (err) {
    console.log(
      "databaseCheck error - Login - Create All Tables if not exists >>>",
      err
    );
  }
};

export const dropAllTables = () => {
  try {
    global.db.transaction(function (txn) {
      txn.executeSql("DROP TABLE IF EXISTS parent", []);
      txn.executeSql("DROP TABLE IF EXISTS child", []);
      txn.executeSql("DROP TABLE IF EXISTS child_activity", []);
      txn.executeSql("DROP TABLE IF EXISTS child_signin_status", []);
      txn.executeSql("DROP TABLE IF EXISTS centre_signinout_settings", []);
      txn.executeSql("DROP TABLE IF EXISTS centre_age_limit", []);
      txn.executeSql("DROP TABLE IF EXISTS learning", []);
      // txn.executeSql("DROP TABLE IF EXISTS synctable", []);
      // txn.executeSql("DROP TABLE IF EXISTS learningimages", []);
      // txn.executeSql("DROP TABLE IF EXISTS insertChild", []);
      // txn.executeSql("DROP TABLE IF EXISTS insertGoal", []);
    });
    console.log("databaseCheck  success - Logout >>> Dropped All Tables ");
  } catch (err) {
    console.log("databaseCheck error - Logout - Drop All Tables >>>", err);
  }
};

export const insertParent = (data) => {
  console.log("InsertParent =========== ", data);

  try {
    global.db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO parent (UserId, FirstName, LastName, CompanyId, ChildCareCentreId, MobileNumber, Email, DateOfBirth, CRNNumber, ParentId, CompanyName, CentreName, UserRole, UserStatus) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          data.UserId,
          data.FirstName,
          data.LastName,
          data.CompanyId,
          data.ChildCareCentreId,
          data.MobileNumber,
          data.Email,
          data.DateOfBirth,
          data.CRNNumber,
          data.ParentId,
          data.CompanyName,
          data.CentreName,
          data.UserRole,
          data.UserStatus,
        ],
        (tx, results) => {
          console.log("Insert parent Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log("parent profile data inserted successfully");
          } else console.log("parent profile data insert Failed");
        },

        (err) => {
          console.log("Insert into Parent  ====", err);
        }
      );
    });
  } catch (err) {
    console.log("databaseCheck error - Insert Parent >>>", err);
  }
};

export const insertAllChild = async (element, parentID) => {

  try {
    await global.db.transaction(function (tx) {
      try {
        tx.executeSql(
          "SELECT * FROM sqlite_master WHERE name ='child' and type='table'; ",
          [],
          function (tx, res) {}
        );

        tx.executeSql(
          // / 'CREATE TABLE IF NOT EXISTS child(ChildID	INTEGER PRIMARY KEY AUTOINCREMENT,CRNNumber	TEXT,FirstName	TEXT,LastName	TEXT,Gender	TEXT,BirthDate	TEXT,DateRegistered	TEXT,Notes	TEXT,Allergy	TEXT,ImagePath	TEXT,ParentId INTEGER)',
          "CREATE TABLE IF NOT EXISTS child(ChildID TEXT ,CRNNumber	TEXT,FirstName TEXT,LastName	TEXT,Gender	TEXT,BirthDate	TEXT,DateRegistered	TEXT,Notes TEXT,Allergy	TEXT,ImagePath	TEXT,ParentId INTEGER)",
          []
        );
      } catch (err) {
        console.log("child Table creation>>>", err);
      }

      tx.executeSql(
        "INSERT INTO child (ChildID, CRNNumber, FirstName, LastName, Gender, BirthDate, DateRegistered, Notes, Allergy, ImagePath, ParentId) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        [
          element.ChildID,
          element.CRNNumber || "NA",
          element.FirstName,
          element.LastName,
          element.Gender,
          element.BirthDate,
          element.DateRegistered || "NA",
          element.Notes,
          element.Allergy,
          element.ImagePath,
          parentID,
        ],
        (tx, results) => {},
        (err) => {
          console.log("Errorrr Insert all child  ====", err);
        }
      );
    });
  } catch (err) {
    console.log("databaseCheck error - Insert All Child >>>", err);
  }
};

export const getParent = () => {

  try {
    global.db.transaction(function (txn) {
      txn.executeSql(
        "SELECT * FROM parent",
        [],
        function (tx, res) {
          if (res.rows.length > 0) {
            store.dispatch(setParent(res.rows.item(0)));
          } else {
            store.dispatch(setParent({}));
          }
        },

        (err) => {
          console.log("getParent  ====", err);
        }
      );
    });
  } catch (err) {
    console.log("databaseCheck error - Get Parent >>>", err);
  }
};

export const getAllChild = () => {
  try {
    global.db.transaction(function (txn) {
      txn.executeSql("SELECT * FROM child", [], function (tx, res) {
        if (res.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < res.rows.length; ++i) {
            temp.push(res.rows.item(i));
          }
          store.dispatch(setChildData(temp));
          return temp;
        } else {
          store.dispatch(setChildData([]));
        }
      });
    });
  } catch (err) {
    console.log("databaseCheck error - Get All Child >>>", err);
  }
};

export const deleteChildListSQL = async (element) => {

  try {
    // To delete child_signin_status list with date
    global.db.transaction(function (tx) {
      tx.executeSql(
        `DELETE FROM child `,
        [],
        function (tx, res) {
          return res;
        },
        function (tx, error) {
          console.log(
            `error delete query execute >>>> childlist deleted from DB >>>`,
            error
          );
          return error;
        }
      );

      (err) => {
        console.log("Error in delete Childlist ", err);
      };
    });
  } catch (err) {
    console.log("deleteChildlists error >>>", err);
  }
};