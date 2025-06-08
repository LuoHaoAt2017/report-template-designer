import { useMemo, useContext, createContext, useReducer } from "react";
import { useDrag, DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { cloneDeep } from "lodash";
import {
  CHU_PIECES,
  HAN_PIECES,
  ROWS,
  COLS,
  CELL,
  LINE,
  ItemTypes,
  CHESS_SIZE,
  ChessStatus,
  ChessAction,
  ChessColor,
  ChessItem,
  DragCollectProps,
  DropCollectProps,
  canMove,
  matchPos,
  ChessPosition,
} from "./config";

const ChessListContext = createContext<ChessItem[]>([]);
const DispatchContext = createContext(null);

type IChessState = {
  chessList: ChessItem[];
};

type IChessAction = {
  type: ChessAction.MOVE;
  payload: { dragItem: ChessItem; position: ChessPosition };
};

const initState: IChessState = {
  chessList: [].concat(...CHU_PIECES, ...HAN_PIECES),
};

function chessReducer(state: IChessState, action: IChessAction) {
  const chessList = cloneDeep(state.chessList);
  const { dragItem, position } = action.payload;
  switch (action.type) {
    case ChessAction.MOVE: {
      const dragIndex = chessList.findIndex(
        (item) => item.code === dragItem.code
      );
      if (dragIndex === -1) {
        return {
          ...state,
        };
      }
      const dropIndex = chessList.findIndex((item) => matchPos(item, position));
      if (dropIndex === -1) {
        chessList[dragIndex].position = position;
      } else {
        chessList[dragIndex].position = position;
        chessList[dropIndex].status = ChessStatus.DEAD;
      }
      return {
        ...state,
        chessList,
      };
    }
    default:
      return state;
  }
}

export default function About() {
  const [state, dispatch] = useReducer(chessReducer, initState);
  const chessList = state.chessList;
  console.table(
    chessList.map((item) => ({
      ...item,
      position: [item.position.row, item.position.col].join(","),
    }))
  );
  const chessPieceList = useMemo(() => {
    return chessList
      .filter((item) => item.status === ChessStatus.ALIVE)
      .map((item) => <ChessPiece key={item.code} item={item} />);
  }, [chessList]);

  return (
    <div className="container flex justify-center py-24">
      <DispatchContext.Provider value={dispatch}>
        <ChessListContext.Provider value={chessList}>
          <DndProvider backend={HTML5Backend}>
            <ChessBoard>{chessPieceList}</ChessBoard>
          </DndProvider>
        </ChessListContext.Provider>
      </DispatchContext.Provider>
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
    return points.map((point, index) => (
      <span
        key={index}
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
        crossPoints.push(<CrossPoint key={`${i}-${j}`} row={i} col={j} />);
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
    return points.map((point, index) => {
      const radius = 18;
      const borderColor = "#000";
      const borderWidth = 1;
      return (
        <div
          key={index}
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
          top: 4 * CELL + 1,
          left: 1,
          width: W - 1,
          height: CELL - 1,
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

  const [collected, drag] = useDrag<ChessItem, unknown, DragCollectProps>(
    () => ({
      type: ItemTypes.CHESS,
      item: item,
      collect(monitor) {
        return {
          isDragging: monitor.isDragging(),
        };
      },
    }),
    [item]
  );
  return (
    <div
      ref={drag}
      className="flex justify-center align-middle bg-white cursor-move"
      style={{
        position: "absolute",
        width: CHESS_SIZE,
        height: CHESS_SIZE,
        borderRadius: CELL,
        top: row * CELL - CHESS_SIZE / 2,
        left: col * CELL - CHESS_SIZE / 2,
        zIndex: 2,
        border: `2px solid ${item.color}`,
        opacity: collected.isDragging ? 0.5 : 1.0,
        cursor: collected.isDragging ? "grab" : "initial",
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
  const chessList = useContext(ChessListContext);
  const dispatch = useContext(DispatchContext);
  const [collected, drop] = useDrop<ChessItem, unknown, DropCollectProps>(
    () => ({
      accept: ItemTypes.CHESS,
      canDrop(dragItem) {
        return canMove(dragItem, { row, col }, chessList);
      },
      hover(item, monitor) {
        // 默认hover的判定逻辑是被拖拽元素的中心点坐标是否在目标区域之内
        return monitor.isOver()
      },
      collect(monitor) {
        return {
          canDrop: monitor.canDrop(),
          isOver: monitor.isOver(),
        };
      },
      drop(dragItem) {
        dispatch({
          type: ChessAction.MOVE,
          payload: { dragItem, position: { row, col } },
        });
      },
    }),
    [chessList, dispatch, row, col]
  );

  const cellStyle = useMemo(() => {
    if (collected.canDrop && collected.isOver) {
      return {
        backgroundColor: "green",
      };
    } else if (collected.canDrop && !collected.isOver) {
      return {
        backgroundColor: "orange",
      };
    } else {
      return {
        backgroundColor: "",
      };
    }
  }, [collected.canDrop, collected.isOver]);
  return (
    <div
      ref={drop}
      className="rounded"
      style={{
        position: "absolute",
        width: CHESS_SIZE * 1.25,
        height: CHESS_SIZE * 1.25,
        top: row * CELL - (CHESS_SIZE * 1.25) / 2,
        left: col * CELL - (CHESS_SIZE * 1.25) / 2,
        ...cellStyle,
      }}
    ></div>
  );
}
