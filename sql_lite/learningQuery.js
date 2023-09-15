import store from "../store";
import { setChildrenLearning } from "../store/learning";

export const insertLearnings = async (element, orderedDate) => {
  try {
    await global.db.transaction(
      function (tx) {
        tx.executeSql(
          "INSERT INTO learning(ExperienceID, ParentID, InitiatorDate,InitiatorTitle, Title, TypeID, RoomID, StaffID, StatusID, Status, Description, AimDirect, AimIndirect, AssociatedVocobulary,PlanBy, PlanByUserName, PlanDate, PlanResourcesRequired, PlanPurpose, PlanMethod, Evaluation, InternalNote, IsDraft, ShareWithParents, IsDeleted, ImplementedBy,ImplementedByUserName, ImplementedDate, SharedBy, SharedByUserName, SharedDate, ApprovedBy, ApprovedByUserName, ApprovedDate, UpdatedBy, ExperienceType, IsChild,LEImageActivityDashboard,LEGoalActivityDashboard,LEActivityExperienceDashboard,LEMontessoriReadninessActivityDashboard,LEFollowUpExperiencesActivityDashboard,ParentExperience) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            element.ExperienceID,
            element.ParentID,
            element.InitiatorDate,
            element.InitiatorTitle,
            element.Title,
            element.TypeID,
            element.RoomID,
            element.StaffID,
            element.StatusID,
            element.Status,
            element.Description,
            element.AimDirect,
            element.AimIndirect,
            element.AssociatedVocobulary,
            element.PlanBy,
            element.PlanByUserName,
            element.PlanDate,
            element.PlanResourcesRequired,
            element.PlanPurpose,
            element.PlanMethod,
            element.Evaluation,
            element.InternalNote,
            element.IsDraft,
            element.ShareWithParents,
            element.IsDeleted,
            element.ImplementedBy,
            element.ImplementedByUserName,
            element.ImplementedDate,
            element.SharedBy,
            element.SharedByUserName,
            element.SharedDate,
            element.ApprovedBy,
            element.ApprovedByUserName,
            element.ApprovedDate,
            element.UpdatedBy,
            element.ExperienceType,
            element.IsChild,
            JSON.stringify(element.LEImageActivityDashboard),
            JSON.stringify(element.LEGoalActivityDashboard),
            JSON.stringify(element.LEActivityExperienceDashboard),
            JSON.stringify(element.LEMontessoriReadninessActivityDashboard),
            JSON.stringify(element.LEFollowUpExperiencesActivityDashboard),
            element.ParentExperience,
          ],
          (tx, results) => {
            // console.log("Results insertLearnings ", results.rowsAffected);
            if (results.rowsAffected > 0) {
              // console.log("insertLearnings data inserted successfully >> ");
            } else {
              // console.log("insertLearnings data insert Failed")
            }
          }
        );
      },
      (err) => {
        console.log("Error in inserting learnings ", err);
      }
    );
  } catch (err) {
    console.log("databaseCheck error - InserLearnings >>>", err);
  }
};

export const deleteLearnings = async (element) => {
  try {
    // To delete child_signin_status list with date
    global.db.transaction(function (tx) {
      tx.executeSql(
        `DELETE FROM learning `,
        [],
        function (tx, res) {
          return res;
        },
        function (tx, error) {
          console.log(
            `error delete query execute >>>> deleteLearnings deleted WHERE ExperienceI from DB >>>`,
            error
          );
          return error;
        }
      );

      (err) => {
        console.log("Error in deleteLearnings ", err);
      };
    });
  } catch (err) {
    console.log("deleteLearnings error >>>", err);
  }
};

export const getAllLearnings = async () => {

  return new Promise((resolve) => {
    global.db.transaction(function (txn) {
      txn.executeSql(
        `SELECT * from learning`,
        [],
        function (tx, res) {
          // console.log("first query executed", res);
          if (res.rows.length > 0) {
            // console.log("getAllLearnings item count >>> " + res.rows.length);
            var temp = [];
            for (let i = 0; i < res.rows.length; ++i) {
              temp.push(res.rows.item(i));
            }

            // console.log(
            //   "Getall Learnings --------------------------------------- ",
            //   temp
            // );

            const da = temp.map(function (element) {
              return {
                ...element,
                LEImageActivityDashboard: JSON.parse(
                  element.LEImageActivityDashboard
                ),
                LEActivityExperienceDashboard: JSON.parse(
                  element.LEActivityExperienceDashboard
                ),
                LEFollowUpExperiencesActivityDashboard: JSON.parse(
                  element.LEFollowUpExperiencesActivityDashboard
                ),
                LEGoalActivityDashboard: JSON.parse(
                  element.LEGoalActivityDashboard
                ),
                LEMontessoriReadninessActivityDashboard: JSON.parse(
                  element.LEMontessoriReadninessActivityDashboard
                ),
              };
            });

            const result = response?.Data.map((row) => ({
              ...row,
              orderedDate:
                row.ImplementedDate != null
                  ? row.ImplementedDate
                  : row.ApprovedDate,
            }));

            store.dispatch(
              setChildrenLearning({
                activityChildrenLearningList: orderBy(
                  result,
                  ["orderedDate"],
                  ["desc"]
                ),
              })
            );
          } else {
            store.dispatch(
              setChildrenLearning({
                activityChildrenLearningList: [],
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