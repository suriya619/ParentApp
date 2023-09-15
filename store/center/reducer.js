import produce from 'immer';
import {
    CENTER_LOADING,
    SET_CHILD_AGE_LIMIT,
    SET_CENTRE_SIGN_IN_OUT_SETTINGS,
    CENTRE_LOGOUT
} from './actionTypes';

const initialState = {
    isLoading: false,
    getChildAgeLimit: [],
    getCenterSigninOutSettings: {}
};

function reducer(state = initialState, { type, payload }) {
    return produce(state, draft => {
        /*eslint-disable indent */
        switch (type) {
            case SET_CHILD_AGE_LIMIT:
                draft.getChildAgeLimit = payload.getChildAgeLimit;
                break;
            case SET_CENTRE_SIGN_IN_OUT_SETTINGS:
                draft.getCenterSigninOutSettings = payload.getCenterSigninOutSettings;
                break;
            case CENTER_LOADING:
                draft.isLoading = payload;
                break;
            case CENTRE_LOGOUT:
                draft.getChildAgeLimit = [];
                draft.getCenterSigninOutSettings = [];
                break;
        }
    });
}

export default reducer;