import moment from "moment";

//Data in formFields required: if required is true disabled cannot be true
export const formFieldsRequired = {
  signIn: {
    sleep: {
      required: false,
      disabled: false,
    },
    wokeUp: {
      required: false,
      disabled: false,
    },
    bottle: {
      required: false,
      disabled: false,
    },
    mood: {
      required: false,
      disabled: false,
    },
    medication: {
      required: false,
      disabled: false,
    },
    notes: {
      required: false,
      disabled: false,
    },
    collectionByWho: {
      required: false,
      disabled: false,
    },
    collectionTime: {
      required: false,
      disabled: false,
    },
    signature: {
      required: true,
      disabled: false,
    },
  },
  signOut: {
    signature: {
      required: true,
      disabled: false,
    },
    time: {
      required: true,
      disabled: false,
    },
  },
  markAbsent: {
    isSick: {
      required: true,
      disabled: false,
    },
    illness: {
      required: true,
      disabled: false,
    },
    details: {
      required: true,
      disabled: false,
    },
    estimatedAbsence: {
      required: true,
      disabled: false,
    },
  },
};

export const childListNew = [];

export const collectionByWho = [
    {
      ParentID: "Mum",
      name: "Mum",
    },
    {
      ParentID: "Dad",
      name: "Dad",
    },
    {
      ParentID: "Grandparent",
      name: "Grandparent",
    },
  ];

  export const getCurrentDate = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss'); //format: dd-mm-yyyy;  
  };

  export const collectionstimearray= ["12:", "1:", "2:", "3:", "4:", "5:", "6:"];
  export const collectionsminutesarray= ["00 pm", "15 pm", "30 pm", "45 pm"];

  export const bottletimearray= ["12:", "1:", "2:","3:", "4:", "5:", "6:", "7:", "8:", "9:"];
  export const bottleminutesarray= ["00 am", "15 am", "30 am", "45 am"];


  
