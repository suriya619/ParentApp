import produce from "immer";
import {
  DAILY_CARE_LOADING,
  SET_ACTIVITY_BY_LAST_MODIFIED_DATE,
  SET_ACTIVITY_BY_RANGE_DATE,
  SET_CHILDREN_TIMELINE,
  SET_LOOKUP,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  activityListByDate: [],
  activityChildrenTimeline: [],
  getLookUpList: [],
};

function reducer(state = initialState, { type, payload }) {
  return produce(state, (draft) => {
    switch (type) {
      case SET_ACTIVITY_BY_LAST_MODIFIED_DATE:
        draft.activityListByDate = payload.activityListByDate;
        break;
      case SET_ACTIVITY_BY_RANGE_DATE:
        draft.activityListByDate = payload.activityListByDate;
        break;
      case SET_CHILDREN_TIMELINE:
        draft.activityChildrenTimeline = payload.activityChildrenTimeline;
        break;
      case SET_LOOKUP:
        draft.getLookUpList = payload.getLookUpList;
        break;
      case DAILY_CARE_LOADING:
        draft.isLoading = payload;
        break;
      case "DAILYCARELOGOUT":
        (draft.activityListByDate = []), (draft.activityChildrenTimeline = []);
        break;
    }
  });
}

export default reducer;
