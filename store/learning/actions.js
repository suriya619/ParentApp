import {
  LEARNING_LOADING,
  GET_CHILDREN_LEARNING,
  SET_CHILDREN_LEARNING,
  CHILDREN_LEARNINGIMAGE_BS64,
} from "./actionTypes";

export function setLearningLoading(isLoading) {
  return {
    type: LEARNING_LOADING,
    payload: isLoading,
  };
}

export function getChildrenLearning(authInfo, callback) {
  return {
    type: GET_CHILDREN_LEARNING,
    payload: authInfo,
    callback: callback,
  };
}

export function setChildrenLearning(data) {
  return {
    type: SET_CHILDREN_LEARNING,
    payload: data,
  };
}

export function setimagetoBase64(url) {
  return {
    type: CHILDREN_LEARNINGIMAGE_BS64,
    payload: url,
  };
}

export function learningLogout() {
  return {
    type: "LEARNINGLOGOUT",
  };
}
