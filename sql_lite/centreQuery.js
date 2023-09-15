import store from "../store";
import { setCentreSignInOutSettings, setChildAgeLimit } from "../store/center";

export const insertCentreSignInOutSettings = async (element) => {
    try {
        await global.db.transaction(function (tx) {
            tx.executeSql(
                'DELETE * FROM centre_signinout_settings',
                [],
            );
            tx.executeSql(
                'INSERT INTO centre_signinout_settings(CentreID, InBabyFeed, InBabyWakeTime, InCollectedBy, InCollectedTime, InImportantInfo, InMedication, InMood, InSignature, InSleepWell, InTime, OutSignature, OutTime, UpdatedBy, UserRoleID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                [
                    element.CentreID,
                    element.InBabyFeed,
                    element.InBabyWakeTime,
                    element.InCollectedBy,
                    element.InCollectedTime,
                    element.InImportantInfo,
                    element.InMedication,
                    element.InMood,
                    element.InSignature,
                    element.InSleepWell,
                    element.InTime,
                    element.OutSignature,
                    element.OutTime,
                    element.UpdatedBy,
                    element.UserRoleID,
                ],
                (tx, results) => {},
            );
        });

    } catch (err) {
        console.log("databaseCheck error - Insert centre_signinout_settings >>>", err);
    }
}

export const getCentreSignInOutSettingsFromDB = (date) => {
    try {
        global.db.transaction(function (txn) {
            txn.executeSql(`SELECT * FROM centre_signinout_settings`, [], function (tx, res) {
                if (res.rows.length > 0) {
                    var temp = [];
                    for (let i = 0; i < res.rows.length; ++i) {
                        temp.push(res.rows.item(i));
                    }
                    store.dispatch(setCentreSignInOutSettings({
                        getCenterSigninOutSettings: temp.length > 0 ? temp[0] : {}
                    }))
                } else {
                    store.dispatch(setCentreSignInOutSettings({
                        getCenterSigninOutSettings: []
                    }))
                }
            });
        });
    } catch (err) {
        console.log("databaseCheck error - centre_signinout_settings >>>", err);
    }
}

export const insertCentreAgeLimit = async (element) => {
    try {
        await global.db.transaction(function (tx) {
            tx.executeSql(
                'DELETE * FROM centre_age_limit',
                [],
            );
            tx.executeSql(
                'INSERT INTO centre_age_limit(Id, BabyAgeLimit, Description, SysCodeDefnition, SyscodeLevel) VALUES (?,?,?,?,?)',
                [
                    element.Id,
                    element.BabyAgeLimit,
                    element.Description,
                    element.SysCodeDefnition,
                    element.SyscodeLevel
                ],
                (tx, results) => {},
            );
        });

    } catch (err) {
        console.log("databaseCheck error - Insert centre_age_limit >>>", err);
    }
}

export const getCentreAgeLimit = () => {
    try {
        global.db.transaction(function (txn) {
            txn.executeSql(`SELECT * FROM centre_age_limit`, [], function (tx, res) {
                if (res.rows.length > 0) {
                    console.log("check child tables");
                    var temp = [];
                    for (let i = 0; i < res.rows.length; ++i) {
                        temp.push(res.rows.item(i));
                    }
                    store.dispatch(setChildAgeLimit({
                        getChildAgeLimit: temp.length > 0 ? temp[0] : {}
                    }))
                } else {
                    store.dispatch(setChildAgeLimit({
                        getChildAgeLimit: {}
                    }))
                }
            });
        });
    } catch (err) {
        console.log("databaseCheck error - Get All Child >>>", err);
    }
}