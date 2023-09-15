import { isEmpty, uniqBy } from "lodash";
import { call, put, select, takeLatest } from "redux-saga/effects";
import authService from "../../services/AuthService";
import {
  deleteChildActivityWithTimeline,
  insertAllChild,
  insertChildActivityWithTimeline,
} from "../../sql_lite";
import { deleteChildListSQL } from "../../sql_lite/signInOutQuery";
import { setChildData } from "../auth";
import { setActiveChildCall } from "../auth/actions";
import {
  setActivityByLastModifiedDate,
  setChildrenTimeline,
  setLoading as setDailyCareLoading,
  setLookup,
} from "./actions";
import {
  GET_ACTIVITY_BY_LAST_MODIFIED_DATE,
  GET_ACTIVITY_BY_RANGE_DATE,
  GET_CHILDREN_TIMELINE,
  GET_LOOKUP,
} from "./actionTypes";

function* getActivityByLastModifiedDate({ payload, callback }) {
  try {
    yield put(setDailyCareLoading(true));
    const response = yield call(
      authService.getActivityByLastModifiedDate,
      payload,
      callback
    );
    if (response?.Status?.Status) {
      const { activityListByDate } = yield select((state) => ({
        activityListByDate: state.dailyCare.activityListByDate,
      }));
      const concatenedData = [...activityListByDate, ...response?.Data];
      const uniqActivityListByDate = uniqBy(concatenedData, (v) =>
        [v.ActivityID, v.ActivityType].join()
      );
      yield put(
        setActivityByLastModifiedDate({
          activityListByDate: uniqActivityListByDate,
        })
      );
    }
  } catch (error) {
    console.log(
      "getActivityByLastModifiedDate Error" + JSON.stringify(error, null, 2)
    );
  } finally {
    yield put(setDailyCareLoading(false));
  }
}

function* getActivityByRangeDate({ payload, callback }) {
  try {
    yield put(setDailyCareLoading(true));
    const response = yield call(
      authService.getActivityByRangeDate,
      payload,
      callback
    );
    if (response?.Status?.Status) {
      const { activityListByDate } = yield select((state) => ({
        activityListByDate: state.dailyCare.activityListByDate,
      }));
      const concatenedData = [...activityListByDate, ...response?.Data];
      const uniqActivityListByDate = uniqBy(concatenedData, (v) =>
        [v.ActivityID, v.ActivityType].join()
      );
      yield put(
        setActivityByLastModifiedDate({
          activityListByDate: uniqActivityListByDate,
        })
      );
    }
  } catch (error) {
    console.log(
      "getActivityByRangeDate Error" + JSON.stringify(error, null, 2)
    );
  } finally {
    yield put(setDailyCareLoading(false));
  }
}

function* logoutDailyCareRefresh() {
  yield put({ type: "DAILYCAREREFRESH" });
}

function* getChildrenTimeline({ payload, callback }) {
  // console.log("getchildrenTime Payload " ,payload)

  try {
    yield put(setDailyCareLoading(true));
    const response = yield call(
      authService.getChildrenTimeline,
      payload,
      callback
    );
    const { activeChild, childData } = yield select(state => state.activeUser);
    const newChildList = (response?.ChildList || []).map(child => child.ChildID);
    const oldChildList = (childData || []).map(child => child.ChildID);
    if(isEmpty(activeChild) || JSON.stringify(newChildList || []) !== JSON.stringify(oldChildList)){
      deleteChildListSQL();
      yield put(setChildData(response?.ChildList || []));

      const childIDs = response?.ChildList.map(el => el.ChildID);
      if(childIDs.indexOf(activeChild.ChildID) === -1){
        yield put(setActiveChildCall(response?.ChildList[0] || {}));
      }
      
      if(response?.ChildList?.length > 0){
        response?.ChildList.forEach(function (element) {
          insertAllChild(element, payload.ParentId);
        });
      }
    }

    if (response?.Data.length > 0) {
      const dataTemp = response?.Data || [];
      //   console.log("DataTemp ", dataTemp);

      deleteChildActivityWithTimeline(response?.Data[0]);
      dataTemp.forEach(function (element) {
        //   console.log("child data list >> " + element.ChildID);
        insertChildActivityWithTimeline(element);
      });      
    }
    yield put(
      setChildrenTimeline({
        activityChildrenTimeline: response?.Data,
      })
    );
  } catch (error) {
    console.log("getChildrenTimeline Error" + JSON.stringify(error, null, 2));
  } finally {
    yield put(setDailyCareLoading(false));
  }
}

function* getLookup({ payload, callback }) {
  // console.log("getchildrenTime Payload " ,payload)

  try {
    const response = yield call(authService.getLookup, payload, callback);

    //   console.log("getChildrenTimeline response" + JSON.stringify(response, null, 2));

    if (response?.Data.length > 0) {
      const dataTemp = response?.Data || [];
      console.log("getLookup ", dataTemp);
    }
    yield put(
      setLookup({
        getLookUpList: response?.Data,
      })
    );
  } catch (error) {
    console.log("getChildrenTimeline Error" + JSON.stringify(error, null, 2));
  } finally {
  }
}

export function* watchGetLookUp() {
  yield takeLatest(GET_LOOKUP, getLookup);
}

export function* watchGetChildrenTimeline() {
  yield takeLatest(GET_CHILDREN_TIMELINE, getChildrenTimeline);
}

export function* watchGetActivityByRangeDate() {
  yield takeLatest(GET_ACTIVITY_BY_RANGE_DATE, getActivityByRangeDate);
}

export function* watchGetActivityByLastModifiedDate() {
  yield takeLatest(
    GET_ACTIVITY_BY_LAST_MODIFIED_DATE,
    getActivityByLastModifiedDate
  );
}

export function* watchLogoutSuccess() {
  yield takeLatest("DAILYCARELOGOUT", logoutDailyCareRefresh);
}
