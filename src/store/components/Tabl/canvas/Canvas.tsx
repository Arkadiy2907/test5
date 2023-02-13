import React, { useRef, RefObject, useEffect } from "react";
import { useSelector } from "react-redux";
import { DefaultMyState } from "../../../../types";
import { TableObjId } from "../../../../types";
import "./Canvas.scss";

const startPointX = 53;
const startPointY = 37;
const haightRow = 60;
const halfHaightRowY = haightRow / 2;
const colorLine = "#C6C6C6";
const iconSizeX = 16;
const iconSizeY = 14;

interface Props {
  heightCurrent: number;
  shiftLevelButtonX: number;
}

const clear = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  context.clearRect(0, 0, width, height);
};

const drawTwoLine = (
  context: CanvasRenderingContext2D,
  shiftLevelButtonX: number,
  rows: TableObjId[],
  start: boolean = false
) => {
  let dX = rows.length === 2 ? 0 : shiftLevelButtonX;
  let dY = rows.length === 2 ? 0 : haightRow;
  let i = 1;

  if (start) dX = dY = i = 0;

  for (; i < rows.length - 1; i++) {
    let toCenterIconY = i >= 2 ? halfHaightRowY - iconSizeY / 2 : 0;

    context.beginPath();
    context.moveTo(startPointX + dX, startPointY - toCenterIconY + dY);
    context.lineTo(
      startPointX + dX,
      startPointY + halfHaightRowY + (halfHaightRowY - iconSizeY / 2) + dY
    );
    context.lineTo(
      startPointX + shiftLevelButtonX - iconSizeX / 2 + dX,
      startPointY + halfHaightRowY + (halfHaightRowY - iconSizeY / 2) + dY
    );
    context.strokeStyle = `${colorLine}`;
    context.lineWidth = 1;
    context.stroke();
    context.closePath();

    dY += haightRow;

    if (start) break;
  }
};

const Canvas = ({ heightCurrent, shiftLevelButtonX }: Props) => {
  const rows = useSelector((state: DefaultMyState) => state.table.table);

  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement | null>(null);

  const width = 110;

  useEffect(() => {
    let localRef = null;
    if (canvasRef.current) localRef = canvasRef.current;
    const context: CanvasRenderingContext2D | null = localRef!.getContext("2d");
    if (rows.length === 0 || rows.length === 1) {
      clear(context!, width, heightCurrent);
    }

    if (rows.length >= 2) {
      clear(context!, width, heightCurrent);
      drawTwoLine(context!, shiftLevelButtonX, rows, true);
      drawTwoLine(context!, shiftLevelButtonX, rows);
    }
  }, [heightCurrent, rows, shiftLevelButtonX]);

  return (
    rows && (
      <canvas
        className="canvas"
        ref={canvasRef}
        width={width}
        height={heightCurrent}
      />
    )
  );
};

export default Canvas;
