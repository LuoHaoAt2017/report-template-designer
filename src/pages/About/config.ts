import { range } from "lodash";
export const ROWS = 10;
export const COLS = 9;
export const CELL = 128; // 行列的间距
export const LINE = 1; // 网格线的宽度
export const CHESS_SIZE = 90;

export interface DragCollectProps {
  isDragging: boolean;
}

export interface DropCollectProps {
  canDrop: boolean;
  isOver: boolean;
}

export enum ItemTypes {
  CHESS = "CHESS",
}

export enum ChessRole {
  King = "King", // 帅
  Advisor = "Advisor", // 士
  Elephant = "Elephant", // 象
  Knight = "Knight", // 马
  Chariot = "Chariot", // 车
  Cannon = "Cannon", // 炮
  Soldier = "Soldier", // 兵
}

export enum ChessType {
  CHU = "CHU",
  HAN = "HAN",
}

export enum ChessStatus {
  ALIVE = "ALIVE",
  DEAD = "DEAD",
}

export enum ChessColor {
  CHU = "red",
  HAN = "black",
}

export enum ChessAction {
  MOVE = "MOVE",
}
export interface ChessPosition {
  row: number;
  col: number;
}

export interface ChessItem {
  label: string;
  role: string;
  code: string;
  type: ChessType;
  status: ChessStatus;
  position: ChessPosition;
  color: ChessColor;
}

/**
 * 楚方所有棋子
 */
export const CHU_PIECES = [
  {
    label: "将",
    role: ChessRole.King,
    code: "A1",
    position: { row: 0, col: 4 },
  },
  {
    label: "士",
    code: "B1",
    role: ChessRole.Advisor,
    position: { row: 0, col: 3 },
  },
  {
    label: "士",
    code: "B2",
    role: ChessRole.Advisor,
    position: { row: 0, col: 5 },
  },
  {
    label: "象",
    code: "C1",
    role: ChessRole.Elephant,
    position: { row: 0, col: 2 },
  },
  {
    label: "象",
    code: "C2",
    role: ChessRole.Elephant,
    position: { row: 0, col: 6 },
  },
  {
    label: "马",
    code: "D1",
    role: ChessRole.Knight,
    position: { row: 0, col: 1 },
  },
  {
    label: "马",
    code: "D2",
    role: ChessRole.Knight,
    position: { row: 0, col: 7 },
  },
  {
    label: "车",
    code: "E1",
    role: ChessRole.Chariot,
    position: { row: 0, col: 0 },
  },
  {
    label: "车",
    code: "E2",
    role: ChessRole.Chariot,
    position: { row: 0, col: 8 },
  },
  {
    label: "炮",
    code: "F1",
    role: ChessRole.Cannon,
    position: { row: 2, col: 1 },
  },
  {
    label: "炮",
    code: "F2",
    role: ChessRole.Cannon,
    position: { row: 2, col: 7 },
  },
  {
    label: "卒",
    code: "G1",
    role: ChessRole.Soldier,
    position: { row: 3, col: 0 },
  },
  {
    label: "卒",
    code: "G2",
    role: ChessRole.Soldier,
    position: { row: 3, col: 2 },
  },
  {
    label: "卒",
    code: "G3",
    role: ChessRole.Soldier,
    position: { row: 3, col: 4 },
  },
  {
    label: "卒",
    code: "G4",
    role: ChessRole.Soldier,
    position: { row: 3, col: 6 },
  },
  {
    label: "卒",
    code: "G5",
    role: ChessRole.Soldier,
    position: { row: 3, col: 8 },
  },
].map((item) => ({
  ...item,
  type: ChessType.CHU,
  status: ChessStatus.ALIVE,
  color: ChessColor.CHU,
}));

/**
 * 汉方所有棋子
 */
export const HAN_PIECES = [
  {
    label: "帅",
    code: "a1",
    role: ChessRole.King,
    position: { row: 9, col: 4 },
  },
  {
    label: "仕",
    code: "b1",
    role: ChessRole.Advisor,
    position: { row: 9, col: 3 },
  },
  {
    label: "仕",
    code: "b2",
    role: ChessRole.Advisor,
    position: { row: 9, col: 5 },
  },
  {
    label: "相",
    code: "c1",
    role: ChessRole.Elephant,
    position: { row: 9, col: 2 },
  },
  {
    label: "相",
    code: "c2",
    role: ChessRole.Elephant,
    position: { row: 9, col: 6 },
  },
  {
    label: "馬",
    code: "d1",
    role: ChessRole.Knight,
    position: { row: 9, col: 1 },
  },
  {
    label: "馬",
    code: "d2",
    role: ChessRole.Knight,
    position: { row: 9, col: 7 },
  },
  {
    label: "車",
    code: "e1",
    role: ChessRole.Chariot,
    position: { row: 9, col: 0 },
  },
  {
    label: "車",
    code: "e2",
    role: ChessRole.Chariot,
    position: { row: 9, col: 8 },
  },
  {
    label: "砲",
    code: "f1",
    role: ChessRole.Cannon,
    position: { row: 7, col: 1 },
  },
  {
    label: "砲",
    code: "f2",
    role: ChessRole.Cannon,
    position: { row: 7, col: 7 },
  },
  {
    label: "兵",
    code: "g1",
    role: ChessRole.Soldier,
    position: { row: 6, col: 0 },
  },
  {
    label: "兵",
    code: "g2",
    role: ChessRole.Soldier,
    position: { row: 6, col: 2 },
  },
  {
    label: "兵",
    code: "g3",
    role: ChessRole.Soldier,
    position: { row: 6, col: 4 },
  },
  {
    label: "兵",
    code: "g4",
    role: ChessRole.Soldier,
    position: { row: 6, col: 6 },
  },
  {
    label: "兵",
    code: "g5",
    role: ChessRole.Soldier,
    position: { row: 6, col: 8 },
  },
].map((item) => ({
  ...item,
  type: ChessType.HAN,
  status: ChessStatus.ALIVE,
  color: ChessColor.HAN,
}));

/**
 * 检测位置是否相等
 */
export const matchPos = (item: ChessItem, pos: ChessPosition) => {
  return item.position.row === pos.row && item.position.col === pos.col;
};

/**
 * 检测落子点是否在九宫格中
 */
export const isInPalace = (position: ChessPosition, chessType: ChessType) => {
  const { row, col } = position;
  if (chessType === ChessType.CHU) {
    return col >= 3 && col <= 5 && row >= 0 && row <= 2;
  } else if (chessType === ChessType.HAN) {
    return col >= 3 && col <= 5 && row >= 7 && row <= 9;
  }
  throw new Error("不支持的棋子类型");
};

/**
 * 检测落子点和起子点之间是否有障碍物
 */
export const isExistObstacle = (
  position: ChessPosition,
  dragItem: ChessItem,
  chessList: ChessItem[]
) => {
  const { row: startRow, col: startCol } = dragItem.position;
  const { row: endRow, col: endCol } = position;
  if (startRow === endRow) {
    // 横向行走
    const minCol = Math.min(startCol, endCol);
    const maxCol = Math.max(startCol, endCol);
    for (let col = minCol + 1; col < maxCol; col++) {
      if (chessList.some((item) => matchPos(item, { row: startRow, col }))) {
        return true;
      }
    }
    return false;
  }
  if (startCol === endCol) {
    // 纵向行走
    const minRow = Math.min(startRow, endRow);
    const maxRow = Math.max(startRow, endRow);
    for (let row = minRow + 1; row < maxRow; row++) {
      if (chessList.some((item) => matchPos(item, { row, col: startCol }))) {
        return true;
      }
    }
    return false;
  }
  throw new Error("参数错误");
};

/**
 * 检测落子点是否已经在河对岸
 */
export const isCrossRiver = (position: ChessPosition, chessType: ChessType) => {
  const { row } = position;
  if (chessType === ChessType.CHU) {
    return row > 4;
  } else if (chessType === ChessType.HAN) {
    return row < 5;
  }
  throw new Error("不支持的棋子类型");
};

/**
 * 检测移动步数是否符合规则
 */
export const isValidStep = (pos: ChessPosition, dragItem: ChessItem) => {
  const { row, col } = dragItem.position;
  switch (dragItem.role) {
    case ChessRole.King: {
      // 仅允许1步横/竖移动
      const dx = Math.abs(pos.col - col);
      const dy = Math.abs(pos.row - row);
      return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
    }
    case ChessRole.Advisor: {
      // 必须同时横向和纵向移动1步
      const dx = Math.abs(pos.col - col);
      const dy = Math.abs(pos.row - row);
      return dx === 1 && dy === 1;
    }
    case ChessRole.Elephant: {
      // 步长检查：必须走田字（2×2）
      const dx = Math.abs(pos.col - col);
      const dy = Math.abs(pos.row - row);
      return dx === 2 && dy === 2;
    }
    case ChessRole.Knight: {
      // 步长检查：必须走日字（2×1，1×2）
      const dx = Math.abs(pos.col - col);
      const dy = Math.abs(pos.row - row);
      return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
    }
    case ChessRole.Chariot: {
      // 步长检查：必须走直线，横向或者纵向
      const dx = Math.abs(pos.col - col);
      const dy = Math.abs(pos.row - row);
      return dx === 0 || dy === 0;
    }
    case ChessRole.Soldier: {
      const dragPosition = dragItem.position;
      const dRow = pos.row - dragPosition.row;
      const dCol = pos.col - dragPosition.col;
      // 没有过河，卒只能往前，过河的卒可以往前，往左，往右
      if (isCrossRiver(pos, dragItem.type)) {
        if (Math.abs(dRow) + Math.abs(dCol) !== 1) {
          return false;
        }
        return dragItem.type === ChessType.CHU ? dRow !== -1 : dRow !== 1;
      } else {
        if (Math.abs(dCol) !== 0 || Math.abs(dRow) !== 1) {
          return false;
        }
        return dragItem.type === ChessType.CHU ? dRow === 1 : dRow === -1;
      }
    }
  }
};

export const canKingMove = (
  dragItem: ChessItem,
  dropPosition: ChessPosition
) => {
  if (!isInPalace(dropPosition, dragItem.type)) {
    return false;
  }
  return isValidStep(dropPosition, dragItem);
};

export const canAdvisorMove = (
  dragItem: ChessItem,
  dropPosition: ChessPosition
) => {
  if (!isInPalace(dropPosition, dragItem.type)) {
    return false;
  }
  return isValidStep(dropPosition, dragItem);
};

export const canElephantMove = (
  dragItem: ChessItem,
  dropPosition: ChessPosition,
  chessList: ChessItem[]
) => {
  if (isCrossRiver(dropPosition, dragItem.type)) {
    return false;
  }
  if (!isValidStep(dropPosition, dragItem)) {
    return false;
  }
  // 检测象眼是否被堵
  const dragPosition = dragItem.position;
  const eyePosition = {
    row: (dragPosition.row + dropPosition.row) / 2,
    col: (dragPosition.col + dropPosition.col) / 2,
  };
  return chessList.findIndex((item) => matchPos(item, eyePosition)) === -1;
};

export const canKnightMove = (
  dragItem: ChessItem,
  dropPosition: ChessPosition,
  chessList: ChessItem[]
) => {
  if (!isValidStep(dropPosition, dragItem)) {
    return false;
  }
  // 检测马脚是否被撇
  const dragPosition = dragItem.position;
  const dRow = Math.abs(dropPosition.row - dragPosition.row);
  const dCol = Math.abs(dropPosition.col - dragPosition.col);
  let blockPosition = { row: -1, col: -1 };
  if (dRow === 1 && dCol === 2) {
    blockPosition = {
      row: dragPosition.row,
      col:
        dropPosition.col > dragPosition.col
          ? dragPosition.col + 1
          : dragPosition.col - 1,
    };
  } else if (dRow === 2 && dCol === 1) {
    blockPosition = {
      row:
        dropPosition.row > dragPosition.row
          ? dragPosition.row + 1
          : dragPosition.col - 1,
      col: dragPosition.col,
    };
  } else {
    throw new Error("马的移动位置错误");
  }
  return chessList.findIndex((item) => matchPos(item, blockPosition)) === -1;
};

export const canChariotMove = (
  dragItem: ChessItem,
  dropPosition: ChessPosition,
  chessList: ChessItem[]
) => {
  if (!isValidStep(dropPosition, dragItem)) {
    return false;
  }
  if (isExistObstacle(dropPosition, dragItem, chessList)) {
    return false;
  }
  return true;
};

export const canSoldierMove = (
  dragItem: ChessItem,
  dropPosition: ChessPosition
) => {
  return isValidStep(dropPosition, dragItem);
};

export const canMove = (
  dragItem: ChessItem,
  dropPosition: ChessPosition,
  chessList: ChessItem[]
) => {
  // if (dropPosition.row === 2 && dropPosition.col === 4) {
  // 	console.log('dragItem: ', dragItem);
  // }
  const dropItem = chessList.find((item) => matchPos(item, dropPosition));
  // 起步点的棋子和落地点的棋子不能是同一方
  if (dropItem && dragItem.type === dropItem.type) {
    return false;
  }
  // 落地点没有棋子，或者落地点棋子和起步点棋子不是同一方
  let enable = false;
  switch (dragItem.role) {
    case ChessRole.King:
      enable = canKingMove(dragItem, dropPosition);
      break;
    case ChessRole.Advisor:
      enable = canAdvisorMove(dragItem, dropPosition);
      break;
    case ChessRole.Elephant:
      enable = canElephantMove(dragItem, dropPosition, chessList);
      break;
    case ChessRole.Knight:
      enable = canKnightMove(dragItem, dropPosition, chessList);
      break;
    case ChessRole.Chariot:
      enable = canChariotMove(dragItem, dropPosition, chessList);
      break;
    case ChessRole.Cannon:
      break;
    case ChessRole.Soldier:
      enable = canSoldierMove(dragItem, dropPosition);
      break;
    default:
      enable = false;
      break;
  }
  return enable;
};
