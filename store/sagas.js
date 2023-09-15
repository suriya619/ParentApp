import * as authSagas from "./auth/sagas";
import * as dailyCareSagas from "./dailycare/sagas";
import * as centerSagas from "./center/sagas";
import * as learningSagas from "./learning/sagas";
import * as profileSagas from "./profile/sagas";

const sagas = {
  ...authSagas,
  ...dailyCareSagas,
  ...centerSagas,
  ...learningSagas,
  ...profileSagas
};

export default sagas;
