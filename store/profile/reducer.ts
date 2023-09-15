import produce from "immer";
import { CHANGE_PASSWORD_COMPLETED, CHANGE_PASSWORD_REQUEST } from "./actionTypes";

const initialState = {
  isLoading: false,
};

const reducer = (state = initialState, { type, payload }:any) => {
  return produce(state, (draft) => {
    switch (type) {
      case CHANGE_PASSWORD_REQUEST:
        draft.isLoading = true;
        break;
      case CHANGE_PASSWORD_COMPLETED:
        draft.isLoading = false;
        break;
      default:
        break;
    }
  })
}

export default reducer;