import { CHANGE_PASSWORD, CHANGE_PASSWORD_COMPLETED, CHANGE_PASSWORD_REQUEST } from "./actionTypes";

export const changePasswordRequestAction = () => {
  return {
    type: CHANGE_PASSWORD_REQUEST,
  };
}

export const changePasswordAction = (reqBody:any, callback:any) => {
  return {
    type: CHANGE_PASSWORD,
    payload: reqBody,
    callback: callback,
  };
}

export const changePasswordCompleteAction = () => {
  return {
    type: CHANGE_PASSWORD_COMPLETED,
  };
}