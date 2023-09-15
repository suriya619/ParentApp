import { orderBy } from "lodash";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { setChildrenLearning } from ".";
import authService from "../../services/AuthService";
import { deleteLearnings, insertLearnings } from "../../sql_lite/learningQuery";
import { deleteChildListSQL, insertAllChild } from "../../sql_lite/signInOutQuery";
import { setChildData } from "../auth";
import { setActiveChild } from "../auth/actions";
import { setLearningLoading } from "./actions";
import { GET_CHILDREN_LEARNING } from "./actionTypes";

function* logoutLearningRefresh() {
  yield put({ type: "LEARNINGREFRESH" });
}

function* getChildrenLearning({ payload, callback }) {
  // console.log("getchildrenTime Payload " ,payload)

  try {
    yield put(setLearningLoading(true));
    const response = yield call(
      authService.getChildrenLearning,
      payload,
      callback
    );
    console.log(response, 'response');
    const { activeChild, childData } = yield select(state => state.activeUser);
    const newChildList = (response?.ChildList || []).map(child => child.ChildID);
    const oldChildList = (childData || []).map(child => child.ChildID);
    if(JSON.stringify(newChildList || []) !== JSON.stringify(oldChildList)){
      deleteChildListSQL();
      yield put(setChildData(response?.ChildList || []));
      const childIDs = response?.ChildList.map(el => el.ChildID);
      const { activeChild } = yield select(state => state.activeUser);
      if(childIDs.indexOf(activeChild.ChildID) === -1){
        yield put(setActiveChild(response?.ChildList[0] || {}));
      }
      if(response?.ChildList?.length > 0){
        response?.ChildList.forEach(function (element) {
          insertAllChild(element, payload.ParentId);
        });
      }
    }
    

    if (response?.Data.length > 0) {
      const dataTemp = response?.Data || [];
      deleteLearnings();

      dataTemp.forEach(function (element) {
        insertLearnings(element, "");
      });
    }

    if (response?.Data.length > 0) {

      const result = response?.Data.map((row) => ({
        ...row,
        orderedDate:
          row.ImplementedDate != null ? row.ImplementedDate : row.ApprovedDate,
          childsArray: row?.LEActivityExperienceDashboard?.map(el => el.ChildID)
      }));

      yield put(
        setChildrenLearning({
          activityChildrenLearningList: orderBy(result, "orderedDate", "desc"),
        })
      );
      callback();
    } else {
      yield put(
        setChildrenLearning({
          activityChildrenLearningList: [],
        })
      );
      callback();
    }
  } catch (error) {
    console.log("getChildrenLearning Error" + JSON.stringify(error, null, 2));
    callback();
  } finally {
    yield put(setLearningLoading(false));
  }
}

export function* watchGetChildrenLearning() {
  yield takeLatest(GET_CHILDREN_LEARNING, getChildrenLearning);
}

export function* watchLogoutSuccess() {
  yield takeLatest("LEARNINGLOGOUT", logoutLearningRefresh);
}
