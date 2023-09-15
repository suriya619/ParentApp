import {
    CENTER_LOADING,
    GET_CHILD_AGE_LIMIT,
    SET_CHILD_AGE_LIMIT,
    GET_CENTRE_SIGN_IN_OUT_SETTINGS,
    SET_CENTRE_SIGN_IN_OUT_SETTINGS,
    CENTRE_LOGOUT,
} from "./actionTypes";


export function setLoading(isLoading) {
    return {
        type: CENTER_LOADING,
        payload: isLoading
    }
}

export function getChildAgeLimit() {
    return {
        type: GET_CHILD_AGE_LIMIT,
    };
}

export function  setChildAgeLimit(data) {
    return {
        type: SET_CHILD_AGE_LIMIT,
        payload: data,
    }
}

export function getCentreSignInOutSettings() {
    return {
        type: GET_CENTRE_SIGN_IN_OUT_SETTINGS,
    };
}

export function setCentreSignInOutSettings(data) {
    return {
        type: SET_CENTRE_SIGN_IN_OUT_SETTINGS,
        payload: data,
    }
}

export function centreLogout() {
    return {
        type: CENTRE_LOGOUT,
    }
}


