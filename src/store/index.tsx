import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { eIDReduser } from "./reducer/eIDReduser";
import { tableReducer } from "./reducer/tableReducer";

interface RootState {
  eID: any;
  table: any;
}

const rootReducer = combineReducers<RootState>({
  eID: eIDReduser,
  table: tableReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
