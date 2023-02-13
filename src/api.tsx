import {
  createEntityAction,
  createRowInEntityAction,
  getTreeRowsAction,
} from "./store/action/Action";
import startObj from "./store/components/AllFakeData/startObj";
import { TableObj } from "./types";
import axios from "axios";

const query = "http://185.244.172.108:8081/v1/outlay-rows/entity/";

export const createEntity = () => {
  // @ts-ignore
  const eID = JSON.parse(localStorage.getItem("localEID"));
  if (eID === null) {
    console.log(
      "появится 1 раз только или при новом запуске или после чистки localStor c eID=",
      eID
    );
    return (dispatch: (arg0: { type: string; payload: any }) => any) => {
      axios
        .post(`${query}create`)
        .then((response) => dispatch(createEntityAction(response.data)))
        .catch((err) => console.log(err));
    };
  }
  return (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch(createEntityAction(eID));
  };
};

export const getTreeRows = (eID: any) => {
  console.log("при загрузки экрана появится 1 раз c eID=", eID);
  return (dispatch: (arg0: { type: string; payload: any }) => any) => {
    axios
      .get(`${query}${eID}/row/list`)
      .then((response) => dispatch(getTreeRowsAction(response.data)))
      .catch((err) => console.log(err));
  };
};

export const createRowInEntity = (eID: string) => {
  return (dispatch: (arg0: { type: string; payload: any }) => any) => {
    axios
      .post(`${query}${eID}/row/create`, startObj)
      .then((response) => dispatch(createRowInEntityAction(response.data)));
  };
};

export const deleteRow = (eID: any, rID: any) => {
  return () => {
    axios.delete(`${query}${eID}/row/${rID}/delete`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
};

export const updateRow = (Obj: TableObj, eID: any, rID: string) => {
  return () => {
    axios.post(`${query}${eID}/row/${rID}/update`, JSON.stringify(Obj), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
};
