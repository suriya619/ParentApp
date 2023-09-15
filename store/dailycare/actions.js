import {
  DAILY_CARE_LOADING,
  GET_ACTIVITY_BY_LAST_MODIFIED_DATE,
  SET_ACTIVITY_BY_LAST_MODIFIED_DATE,
  GET_ACTIVITY_BY_RANGE_DATE,
  SET_ACTIVITY_BY_RANGE_DATE,
  GET_CHILDREN_TIMELINE,
  SET_CHILDREN_TIMELINE,
  GET_LOOKUP,
  SET_LOOKUP,
} from "./actionTypes";

export function setLoading(isLoading) {
  return {
    type: DAILY_CARE_LOADING,
    payload: isLoading,
  };
}

export function getActivityByLastModifiedDate(authInfo, callback) {
  return {
    type: GET_ACTIVITY_BY_LAST_MODIFIED_DATE,
    payload: authInfo,
    callback: callback,
  };
}

export function setActivityByLastModifiedDate(data) {
  return {
    type: SET_ACTIVITY_BY_LAST_MODIFIED_DATE,
    payload: data,
  };
}

export function getActivityByRangeDate(authInfo, callback) {
  return {
    type: GET_ACTIVITY_BY_RANGE_DATE,
    payload: authInfo,
    callback: callback,
  };
}

export function setActivityByRangeDate(data) {
  return {
    type: SET_ACTIVITY_BY_RANGE_DATE,
    payload: data,
  };
}

export function getChildrenTimeline(authInfo, callback) {
  return {
    type: GET_CHILDREN_TIMELINE,
    payload: authInfo,
    callback: callback,
  };
}

export function setChildrenTimeline(data) {
  return {
    type: SET_CHILDREN_TIMELINE,
    payload: data,
  };
}

export function getLookup(authInfo, callback) {
  return {
    type: GET_LOOKUP,
    payload: authInfo,
    callback: callback,
  };
}

export function setLookup(data) {
  return {
    type: SET_LOOKUP,
    payload: data,
  };
}

export function dailycarelogout() {
  return {
    type: "DAILYCARELOGOUT",
  };
}
