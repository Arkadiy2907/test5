import ListItem from "./ListItem";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTreeRows } from "../../../../api";
import { DefaultMyState, eIdObj } from "../../../../types";
import "./ListTable.scss";
import { LegacyRef, RefObject } from "react";

const ListTable = ({ eID }: { eID: eIdObj }) => {
  const dispatch = useDispatch();
  const table = useSelector((state: DefaultMyState) => state.table.table);

  const elementRef: LegacyRef<HTMLDivElement> | RefObject<HTMLDivElement> =
    React.createRef();
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    if (elementRef.current !== null) {
      setHeight(() => elementRef.current!.offsetHeight);
    }
  }, [elementRef]);

  React.useEffect(() => {
    eID.id && dispatch(getTreeRows(eID.id));
  }, [dispatch, eID]);

  return (
    <div className="table__wrap" ref={elementRef}>
      {!!table &&
        table.map((table) => {
          return (
            <ListItem table={table} key={table.id} eID={eID} height={height} />
          );
        })}
    </div>
  );
};

export default ListTable;
