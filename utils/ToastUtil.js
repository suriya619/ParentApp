import { Toast } from "native-base";


const displayNetNotReachableToast = (titleText, statusText, descriptionText)=>{
    Toast.show({
      title: "Network error",
      status: "error",
      description:"It seems your internet is connected but not reachable, Kindly check and try again",
      duration: 3000,
      placement: "bottom",
    });
  }

  const displayNoNetworkToast
   = (titleText, statusText, descriptionText)=>{
    Toast.show({
      title: "No internet",
      status: "error",
      description:"Your internet connection is not available, Kindly check and try again",
      duration: 3000,
      placement: "bottom",
    });
  }

  export {displayNetNotReachableToast ,displayNoNetworkToast};

