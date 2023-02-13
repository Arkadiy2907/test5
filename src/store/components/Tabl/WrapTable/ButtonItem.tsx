import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRowInEntity } from "../../../../api";
import { ButtonItemProps, DefaultMyState } from "../../../../types";

const ButtonItem: React.FC<ButtonItemProps> = (props) => {
  const dispatch = useDispatch();
  const eID = useSelector((state: DefaultMyState) => state.eID.eID);
  const table = useSelector((state: DefaultMyState) => state.table.table);

  const newRow = (x: number) => {
    if (x === 0 && !table.length) {
      eID.id && dispatch(createRowInEntity(eID.id));
    }
  };

  return (
    <li>
      <img src={props.src} alt={props.alt} className="img" />
      <p onClick={() => newRow(props.id)} className="button">
        {props.title}
      </p>
    </li>
  );
};

export default ButtonItem;
