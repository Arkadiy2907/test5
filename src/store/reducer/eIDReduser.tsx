import { GET_EID } from "../action/ActionTypes";

const defaultState = {
  eID: [],
};

export const eIDReduser = (state = defaultState, action: any) => {
  switch (action.type) {
    case GET_EID:
      localStorage.setItem("localEID", JSON.stringify(action.payload));
      return {
        eID: action.payload,
      };
    default:
      return state;
  }
};
