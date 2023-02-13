import { GET_EID, CREATE_ROW, GET_LIST, DEL_ROW } from "./ActionTypes";

export const createEntityAction = (
  payload: any
): { type: string; payload: any } => ({ type: GET_EID, payload })

export const createRowInEntityAction = (
  payload: any
): { type: string; payload: any } => ({ type: CREATE_ROW, payload })

export const getTreeRowsAction = (
  payload: any
): { type: string; payload: any } => ({ type: GET_LIST, payload })

export const deleteRowAction = (
  payload: any
): { type: string; payload: any } => ({ type: DEL_ROW, payload })
