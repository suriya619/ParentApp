import produce from 'immer';
import {
    SET_NET_INFO,
    SET_SHOW_INTERNET_CONNECTION_MODAL,
    SET_FAILED_API_REQUEST
} from './actionTypes';

const initialState = {
    netInfo: {},
    showInternetMessageModal: {
        status: false,
        type: ''
    },
    failedApiRequest: null,
};

function reducer(state = initialState, { type, payload }) {
    return produce(state, draft => {
        /*eslint-disable indent */
        switch (type) {
            case SET_NET_INFO:
                draft.netInfo = payload;
                break;
            case SET_SHOW_INTERNET_CONNECTION_MODAL:
                draft.showInternetMessageModal = payload;
                break;
            case SET_FAILED_API_REQUEST:
                draft.failedApiRequest = [payload];
                break;
            
        }
    });
}

export default reducer;