import produce from 'immer';

import {
  LOGIN_LOADING,
  SET_ACTIVE_USER,
  SET_UPDATED_USER,
  SET_CHILD_SIGNIN_STATUS_LIST,
  SET_PARENT,
  SET_CHILD_DATA,
  REFRESH,
  LOGOUT,
  UPDATE_ACTIVE_CHILD,
  SET_COMPANYORSERVICE_LIST,
  SET_COMPANYORSERVICE_ITEM,
  SET_APP_VERSION_DETAILS,
  SET_SHOW_APP_UPDATE_MODAL,
  SET_MEDICAL_OR_GENERAL_NOTES,
  SET_USER_ROLES,
  SET_LOGIN_DATA,
  LOGOUT_USER
} from './actionTypes';

const initialState = {
  user: {},
  parent: {},
  childData: [],
  AccessToken: "",
  childSigninStatusList: [],
  isLoading: false,
  activeChild: {},
  companyList: [],
  CompanyorService: null,
  appUpdateDetails: {
    isforceUpdated: false,
    url: ''
  },
  showAppUpdateModal: false,
  getMedicalorGeneralNotesList: null,
  userRoles: [],
  loggedUser: {}
};

function reducer(state = initialState, { type, payload }) {

  return produce(state, draft => {
    /*eslint-disable indent */
    switch (type) {
      case SET_ACTIVE_USER:
        draft.user = payload.Data;
        draft.AccessToken = payload.AccessToken;
        break;
      case SET_PARENT:
        draft.parent = payload;
        break;
      case SET_CHILD_DATA:
        draft.childData = payload;
        break;
      case SET_UPDATED_USER:
        draft.user = { ...draft.user, ...payload };
        break;
      case SET_CHILD_SIGNIN_STATUS_LIST:
        draft.childSigninStatusList = payload.childSigninStatusList;
        break;
      case SET_COMPANYORSERVICE_LIST:
        draft.companyList = payload;
        break;
      case SET_COMPANYORSERVICE_ITEM:
        draft.CompanyorService = payload;
        break;
      case LOGIN_LOADING:
        draft.isLoading = payload;
        break;
      case UPDATE_ACTIVE_CHILD:
        draft.activeChild = payload;
        break;
      case SET_APP_VERSION_DETAILS:
        draft.appUpdateDetails = payload;
        break;
      case SET_SHOW_APP_UPDATE_MODAL:
        draft.showAppUpdateModal = payload;
        break;
      case SET_MEDICAL_OR_GENERAL_NOTES:
        draft.getMedicalorGeneralNotesList = payload
        break;
      case SET_USER_ROLES:
        draft.userRoles = payload
        break;
      case SET_LOGIN_DATA:
        draft.loggedUser = payload
        break;
      case LOGOUT_USER:
        draft.userRoles = []
        break;
      case LOGOUT:
        draft.user = {}
        draft.parent = {}
        draft.childData = []
        draft.AccessToken = ""
        draft.childSigninStatusList = []
        draft.activeChild = {}
        draft.userRoles = []
        break;
    }
  });
}

export default reducer;