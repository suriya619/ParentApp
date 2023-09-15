import { combineReducers } from "redux";

import { reducer as activeUserReducer } from "./auth";
import { reducer as dailyCareReducer } from "./dailycare";
import { reducer as centerReducer } from "./center";
import { reducer as globalReducer } from "./global";
import { reducer as learningReducer } from "./learning";
import { reducer as profileReducer } from "./profile";

import { RESET_STATE } from "./shared";

const reducer = combineReducers({
  activeUser: activeUserReducer,
  dailyCare: dailyCareReducer,
  center: centerReducer,
  learning: learningReducer,
  global: globalReducer,
  profile: profileReducer
});

 export default function (state, action) {
  if (action.type === RESET_STATE) {
    state = undefined;
  }
  return reducer(state, action);
}
