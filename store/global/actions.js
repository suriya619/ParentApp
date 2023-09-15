import {
    SET_NET_INFO,
    SET_SHOW_INTERNET_CONNECTION_MODAL,
    SET_FAILED_API_REQUEST
} from "./actionTypes";

export function  setNetInfo(data) {
    return {
        type: SET_NET_INFO,
        payload: data,
    }
}

export function  setInternetMessageModal(data, type) {
    return {
        type: SET_SHOW_INTERNET_CONNECTION_MODAL,
        payload: {
            status: data,
            type: type,
        },
    }
}

export function  setFailedAPIRequest(data) {
    return {
        type: SET_FAILED_API_REQUEST,
        payload: data,
    }
}