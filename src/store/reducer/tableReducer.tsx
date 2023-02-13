import { CREATE_ROW, GET_LIST, DEL_ROW } from "../action/ActionTypes";

interface TableState {
  table: any[];
}

const defaultState: TableState = {
  table: [],
};

export const tableReducer = (
  state: TableState = defaultState,
  action: any
): TableState => {
  switch (action.type) {
    case GET_LIST:
      return {
        table: [...action.payload],
      };
    case CREATE_ROW:
      return {
        table: [...state.table, { ...action.payload.current }],
      };
    case DEL_ROW:
      return {
        ...state,
        table: state.table.filter(
          (table: any) => table.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
