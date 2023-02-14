import React, { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRow } from "../../../../api";
import { deleteRowAction } from "../../../action/Action";
import { createRowInEntity, updateRow } from "../../../../api";
import row from "../../../../assets/row.svg";
import bin from "../../../../assets/bin.svg";
import { useForm } from "react-hook-form";
import { DefaultMyState, TableObjId, eIdObj } from "../../../../types";
import Canvas from "../canvas/Canvas";

let enter = false; //for enter
let remove = false; // key Remove click
const shiftLevelButtonX = 20; //shift colon buttons level

interface Props {
  table: TableObjId;
  eID: eIdObj;
  height: number;
}

const ListItem = ({ table, eID, height }: Props) => {
  const rows = useSelector((state: DefaultMyState) => state.table.table);
  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState(table);
  const [isReadonly, setIsReadonly] = React.useState(true); // no change row
  const [isActiveStyle, setIsActiveStyle] = React.useState(false); //edded style active row
  const [isEnter, setIsEnter] = React.useState(false); // key enter click
  const [isFirstEnter, setIsFirstEnter] = React.useState(false); // is click first row enter

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "all",
  });

  const showInputValue = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //======================================= onSubmit row
  const onSubmit = (data: any) => {
    const eID = data?.eID;
    const rID = data?.id;
    if (data?.id !== undefined) {
      delete data?.id;
    }
    if (data?.eID !== undefined) {
      delete data?.eID;
    }

    if (rID && eID && isEnter && isActiveStyle) {
      dispatch(updateRow(data, eID, rID));
      enter = true;
      setIsReadonly(true);
      setIsEnter(false);
      setIsActiveStyle(false);
    }
  };

  const getKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      setIsEnter(true);
    }
  };

  //======================================= update row
  const changeRow = (formData: TableObjId) => {
    if (isReadonly) {
      setIsActiveStyle(true);
      setIsReadonly(false);
    }
  };

  //======================================= new row
  const newRow = () => {
    if (!!rows.length && isValid && isReadonly && enter) {
      eID.id && dispatch(createRowInEntity(eID.id));
      setIsActiveStyle(false);
    }
    enter = false;
    remove = false;
  };
  //======================================= remove Row;
  const removeRow = (eID: string, rID: string, formData: TableObjId) => {
    dispatch(deleteRow(eID, rID));
    dispatch(deleteRowAction(formData));
    return (remove = true);
  };

  //======================================= update;

  React.useEffect(() => {
    if (rows.length > 1) setIsFirstEnter(true);
    if (rows.length === 0) setIsFirstEnter(false);

    if (rows.length !== 1 && remove) return;
    if (Number(rows.at(-1)!.id) === Number(formData.id) && !isFirstEnter) {
      setIsActiveStyle(true);
      setIsReadonly(false);
    }
  }, [formData, rows, isFirstEnter]);

  return (
    rows && (
      <form
        className="table__form"
        onSubmit={handleSubmit(onSubmit)}
        onDoubleClick={(formData) =>
          changeRow(formData as unknown as TableObjId)
        }
        onKeyDown={(event) => getKeyDown(event as unknown as KeyboardEvent)}
      >
        <ul
          className={
            isActiveStyle ? "table__form__row_active" : "table__form__row"
          }
        >
          <li
            style={{
              paddingLeft:
                Number(rows.at(0)!.id) === Number(formData.id)
                  ? 0
                  : Number(rows.at(1)!.id) === Number(formData.id)
                  ? `${shiftLevelButtonX}px`
                  : `${shiftLevelButtonX * 2}px`,
            }}
          >
            <div className="level__button">
              <button className="level" onClick={() => newRow()}>
                <img src={row} alt="icon_row" className="img-row" />
              </button>
              <button
                className="level-bin"
                onClick={() => removeRow(eID.id, formData.id, formData)}
              >
                <img src={bin} alt="icon_bin" className="img-bin" />
              </button>
            </div>
          </li>
          <li>
            <input
              type="text"
              onInput={showInputValue}
              value={formData.rowName}
              autoComplete="off"
              readOnly={isReadonly}
              {...register(`rowName`, {
                required: "This field is required",
                minLength: {
                  value: 2,
                  message: "min 2 characters",
                },
                maxLength: {
                  value: 70,
                  message: "max 70 characters",
                },
              })}
            />
            <div className="errors">
              {errors.rowName && (
                //@ts-ignore       //this bug react-hook-form
                <small>{errors.rowName.message} as FieldError</small>
              )}
            </div>
          </li>
          <li>
            <input
              type="text"
              onInput={showInputValue}
              value={formData.salary}
              autoComplete="off"
              readOnly={isReadonly}
              {...register(`salary`, {
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a number",
                },
              })}
            />
            <div className="errors">
              {errors.salary && (
                //@ts-ignore //this bug react-hook-form
                <small>{errors.salary.message} as FieldError</small>
              )}
            </div>
          </li>
          <li>
            <input
              type="text"
              onInput={showInputValue}
              value={formData.equipmentCosts}
              autoComplete="off"
              readOnly={isReadonly}
              {...register(`equipmentCosts`, {
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a number",
                },
              })}
            />
            <div className="errors">
              {errors.equipmentCosts && (
                //@ts-ignore //this bug react-hook-form
                <small>{errors.equipmentCosts.message} as FieldError</small>
              )}
            </div>
          </li>
          <li>
            <input
              type="text"
              onInput={showInputValue}
              value={formData.overheads}
              autoComplete="off"
              readOnly={isReadonly}
              {...register(`overheads`, {
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a number",
                },
              })}
            />
            <div className="errors">
              {errors.overheads && (
                //@ts-ignore //this bug react-hook-form
                <small>{errors.overheads.message} as FieldError</small>
              )}
            </div>
          </li>
          <li>
            <input
              type="text"
              onInput={showInputValue}
              value={formData.estimatedProfit}
              autoComplete="off"
              readOnly={isReadonly}
              {...register(`estimatedProfit`, {
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a number",
                },
              })}
            />
            <div className="errors">
              {errors.estimatedProfit && (
                //@ts-ignore //this bug react-hook-form
                <small>{errors.estimatedProfit.message} as FieldError</small>
              )}
            </div>
          </li>
          <li>
            <input type="hidden" {...register(`supportCosts`)} value={"0"} />
            <input type="hidden" {...register(`mimExploitation`)} value={"0"} />
            <input type="hidden" {...register(`materials`)} value={"0"} />
            <input type="hidden" {...register(`mainCosts`)} value={"0"} />
            <input
              type="hidden"
              {...register(`machineOperatorSalary`)}
              value={"0"}
            />
            <input type="hidden" {...register(`eID`)} value={eID.id} />
            <input type="hidden" {...register(`id`)} value={formData.id} />
          </li>
        </ul>
        <input type="submit" hidden disabled={isValid} />
        <Canvas heightCurrent={height} shiftLevelButtonX={shiftLevelButtonX} />
      </form>
    )
  );
};

export default ListItem;
