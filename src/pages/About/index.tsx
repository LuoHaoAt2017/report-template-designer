import { useMemo, useState } from "react";
import {
  CHU_PIECES,
  HAN_PIECES,
  ROWS,
  COLS,
  CELL,
  LINE,
  CHESS_SIZE,
  ChessStatus,
  ChessColor,
  ChessItem,
} from "./config";

export default function About() {
  const [chuChessList, setChuChessList] = useState<ChessItem[]>(CHU_PIECES);
  const [hanChessList, setHanChessList] = useState<ChessItem[]>(HAN_PIECES);

  const chessPieceList = useMemo(() => {
    return [...chuChessList, ...hanChessList]
      .filter((item) => item.status === ChessStatus.ALIVE)
      .map((item) => <ChessPiece key={item.code} item={item} />);
  }, [chuChessList, hanChessList]);

  return (
    <div className="flex justify-center py-12">
      <ChessBoard>{chessPieceList}</ChessBoard>
    </div>
  );
}

/**
 * 棋盘
 */
function ChessBoard({ children }) {
  const W = (COLS - 1) * CELL;
  const H = (ROWS - 1) * CELL;
  const zIndex = 1;

  const horizontalLines = useMemo(() => {
    return Array.from({ length: ROWS }).map((_, index) => (
      <span
        className="absolute"
        key={index}
        style={{
          background: "#000",
          top: index * CELL,
          width: W,
          height: LINE,
          zIndex,
        }}
      ></span>
    ));
  }, [W]);

  const verticalLines = useMemo(() => {
    return Array.from({ length: COLS }).map((_, index) => (
      <span
        className="absolute"
        key={index}
        style={{
          background: "#000",
          left: index * CELL,
          width: LINE,
          height: H,
          zIndex,
        }}
      ></span>
    ));
  }, [H]);

  const crossLines = useMemo(() => {
    const points = [
      { row: 0, col: 3, rotate: 45 },
      { row: 0, col: 5, rotate: 135 },
      { row: 7, col: 3, rotate: 45 },
      { row: 7, col: 5, rotate: 135 },
    ];
    return points.map((point) => (
      <span
        className="absolute"
        style={{
          background: "#000",
          top: point.row * CELL + 1,
          left: point.col * CELL + 1,
          width: 2 * CELL * Math.sqrt(2),
          height: 1,
          rotate: `${point.rotate}deg`,
          transformOrigin: "left top",
          imageRendering: "pixelated",
          backfaceVisibility: "hidden",
          zIndex,
        }}
      />
    ));
  }, []);

  const crossPoints = useMemo(() => {
    const crossPoints = [];
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        crossPoints.push(<CrossPoint row={i} col={j} />);
      }
    }
    return crossPoints;
  }, []);

  const promptPoints = useMemo(() => {
    const points = [
      { row: 2, col: 1 },
      { row: 2, col: 7 },
      { row: 3, col: 0 },
      { row: 3, col: 2 },
      { row: 3, col: 4 },
      { row: 3, col: 6 },
      { row: 3, col: 8 },
      { row: 6, col: 0 },
      { row: 6, col: 2 },
      { row: 6, col: 4 },
      { row: 6, col: 6 },
      { row: 6, col: 8 },
      { row: 7, col: 1 },
      { row: 7, col: 7 },
    ];
    return points.map((point) => {
      const radius = 18;
      const borderColor = "#000";
      const borderWidth = 1;
      return (
        <div
          className="absolute"
          style={{
            top: point.row * CELL - radius / 2,
            left: point.col * CELL - radius / 2,
            zIndex,
          }}
        >
          {point.col !== 0 && (
            <span
              className="absolute inline-block"
              style={{
                width: radius,
                height: radius,
                top: -radius,
                left: -radius,
                borderColor,
                borderWidth,
                borderLeft: "none",
                borderTop: "none",
              }}
            />
          )}
          {point.col !== 8 && (
            <span
              className="absolute inline-block"
              style={{
                width: radius,
                height: radius,
                top: -radius,
                left: radius,
                borderColor,
                borderWidth,
                borderRight: "none",
                borderTop: "none",
              }}
            />
          )}
          {point.col !== 0 && (
            <span
              className="absolute inline-block"
              style={{
                width: radius,
                height: radius,
                top: radius,
                left: -radius,
                borderColor,
                borderWidth,
                borderLeft: "none",
                borderBottom: "none",
              }}
            />
          )}
          {point.col !== 8 && (
            <span
              className="absolute inline-block"
              style={{
                width: radius,
                height: radius,
                top: radius,
                left: radius,
                borderColor,
                borderWidth,
                borderRight: "none",
                borderBottom: "none",
              }}
            />
          )}
        </div>
      );
    });
  }, []);

  const chuHanArea = useMemo(() => {
    return (
      <div
        className="absolute"
        style={{
          top: 4 * CELL + 0.5,
          left: 1,
          width: W - 0.5,
          height: CELL - 0.5,
          zIndex,
          opacity: 1,
          background: "#fff",
        }}
      >
        <div className=" flex justify-around align-middle h-full">
          <span
            className="text-6xl self-center -rotate-90"
            style={{ color: ChessColor.CHU }}
          >
            楚
          </span>
          <span
            className="text-6xl self-center -rotate-90"
            style={{ color: ChessColor.CHU }}
          >
            河
          </span>
          <span
            className="text-6xl self-center -rotate-90"
            style={{ color: ChessColor.HAN }}
          >
            汉
          </span>
          <span
            className="text-6xl self-center -rotate-90"
            style={{ color: ChessColor.HAN }}
          >
            界
          </span>
        </div>
      </div>
    );
  }, [W]);

  return (
    <div style={{ width: W, height: H }} className="relative">
      {horizontalLines}
      {verticalLines}
      {crossLines}
      {crossPoints}
      {promptPoints}
      {chuHanArea}
      {children}
    </div>
  );
}

/**
 * 棋子
 */
function ChessPiece({ item }: { item: ChessItem }) {
  const { row, col } = item.position;
  return (
    <div
      className="flex justify-center align-middle bg-white cursor-move"
      style={{
        position: "absolute",
        width: CHESS_SIZE,
        height: CHESS_SIZE,
        borderRadius: CELL,
        top: row * CELL - CHESS_SIZE / 2,
        left: col * CELL - CHESS_SIZE / 2,
        zIndex: 2,
        opacity: 1,
        border: `2px solid ${item.color}`,
      }}
    >
      <span className="self-center" style={{ color: item.color, fontSize: 48 }}>
        {item.label}
      </span>
    </div>
  );
}

/**
 * 落子点
 */
function CrossPoint({ row, col }) {
  return (
    <div
      className="rounded"
      style={{
        position: "absolute",
        top: row * CELL - CHESS_SIZE / 2,
        left: col * CELL - CHESS_SIZE / 2,
        width: CHESS_SIZE,
        height: CHESS_SIZE,
        borderRadius: CHESS_SIZE,
      }}
    ></div>
  );
}
