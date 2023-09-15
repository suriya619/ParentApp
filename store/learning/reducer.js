import produce from "immer";
import { LEARNING_LOADING, SET_CHILDREN_LEARNING } from "./actionTypes";

const initialState = {
  isLoading: false,
  activityChildrenLearningList: [],
};

function reducer(state = initialState, { type, payload }) {
  return produce(state, (draft) => {
    /*eslint-disable indent */

    // console.log("Payload ", payload, type);
    switch (type) {
      case SET_CHILDREN_LEARNING:
        draft.activityChildrenLearningList =
          payload.activityChildrenLearningList;
        break;
      case LEARNING_LOADING:
        draft.isLoading = payload;
        break;
      case "LEARNINGLOGOUT":
        draft.activityChildrenLearningList = [];
        break;
    }
  });
}

export default reducer;
