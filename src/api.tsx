import {
  createEntityAction,
  createRowInEntityAction,
  getTreeRowsAction,
} from "./store/action/Action";
import startObj from "./store/components/AllFakeData/startObj";
import { TableObj } from "./types";

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
      fetch(`${query}create`, {
        method: "POST",
      })
        .then((response) => response.json())
        .then((json) => dispatch(createEntityAction(json)));
    };
  }
  return (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch(createEntityAction(eID));
  };
};

export const getTreeRows = (eID: any) => {
  console.log("при загрузки экрана появится 1 раз c eID=", eID);
  return (dispatch: (arg0: { type: string; payload: any }) => any) => {
    fetch(`${query}${eID}/row/list`)
      .then((response) => response.json())
      .then((json) => dispatch(getTreeRowsAction(json)));
  };
};

export const createRowInEntity = (eID: string) => {
  //parentID = null
  return (dispatch: (arg0: { type: string; payload: any }) => any) => {
    fetch(`${query}${eID}/row/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(startObj),
    })
      .then((response) => response.json())
      .then((json) => dispatch(createRowInEntityAction(json)));
  };
};

export const deleteRow = (eID: any, rID: any) => {
  return () => {
    fetch(`${query}${eID}/row/${rID}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
};

export const updateRow = (Obj: TableObj, eID: any, rID: string) => {
  return () => {
    fetch(`${query}${eID}/row/${rID}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Obj),
    });
  };
};
