export const ROWS = 10;
export const COLS = 9;
export const CELL = 128; // 行列的间距
export const LINE = 1; // 网格线的宽度
export const CHESS_SIZE = 90;

export enum ChessType {
  CHU = "CHU",
  HAN = "HAN",
}

export enum ChessStatus {
  ALIVE = "ALIVE",
  DEAD = "DEAD",
}

export enum ChessColor {
    CHU = 'red',
    HAN = 'black'
}

export interface ChessPosition {
  row: number;
  col: number;
}

export interface ChessItem {
  label: string;
  code: string;
  type: ChessType;
  status: ChessStatus;
  position: ChessPosition;
  color: ChessColor;
}

// export const HAN_PIECES = ["帅", "仕", "相", "馬", "車", "砲", "兵"];

export const CHU_PIECES = [
  {
    label: "将",
    code: "A1",
    type: ChessType.CHU,
    position: { row: 0, col: 4 },
  },
  {
    label: "士",
    code: "B1",
    type: ChessType.CHU,
    position: { row: 0, col: 3 },
  },
  {
    label: "士",
    code: "B2",
    position: { row: 0, col: 5 },
  },
  {
    label: "象",
    code: "C1",
    position: { row: 0, col: 2 },
  },
  {
    label: "象",
    code: "C2",
    position: { row: 0, col: 6 },
  },
  {
    label: "马",
    code: "D1",
    position: { row: 0, col: 1 },
  },
  {
    label: "马",
    code: "D2",
    position: { row: 0, col: 7 },
  },
  {
    label: "车",
    code: "E1",
    position: { row: 0, col: 0 },
  },
  {
    label: "车",
    code: "E2",
    position: { row: 0, col: 8 },
  },
  {
    label: "炮",
    code: "F1",
    position: { row: 2, col: 1 },
  },
  {
    label: "炮",
    code: "F2",
    position: { row: 2, col: 7 },
  },
  {
    label: "卒",
    code: "G1",
    position: { row: 3, col: 0 },
  },
  {
    label: "卒",
    code: "G2",
    position: { row: 3, col: 2 },
  },
  {
    label: "卒",
    code: "G3",
    position: { row: 3, col: 4 },
  },
  {
    label: "卒",
    code: "G4",
    position: { row: 3, col: 6 },
  },
  {
    label: "卒",
    code: "G5",
    position: { row: 3, col: 8 },
  },
].map((item) => ({
  ...item,
  type: ChessType.CHU,
  status: ChessStatus.ALIVE,
  color: ChessColor.CHU,
}));

export const HAN_PIECES = [
  {
    label: "帅",
    code: "a1",
    type: ChessType.CHU,
    position: { row: 9, col: 4 },
  },
  {
    label: "仕",
    code: "b1",
    type: ChessType.CHU,
    position: { row: 9, col: 3 },
  },
  {
    label: "仕",
    code: "b2",
    position: { row: 9, col: 5 },
  },
  {
    label: "相",
    code: "c1",
    position: { row: 9, col: 2 },
  },
  {
    label: "相",
    code: "c2",
    position: { row: 9, col: 6 },
  },
  {
    label: "馬",
    code: "d1",
    position: { row: 9, col: 1 },
  },
  {
    label: "馬",
    code: "d2",
    position: { row: 9, col: 7 },
  },
  {
    label: "車",
    code: "e1",
    position: { row: 9, col: 0 },
  },
  {
    label: "車",
    code: "e2",
    position: { row: 9, col: 8 },
  },
  {
    label: "砲",
    code: "f1",
    position: { row: 7, col: 1 },
  },
  {
    label: "砲",
    code: "f2",
    position: { row: 7, col: 7 },
  },
  {
    label: "兵",
    code: "g1",
    position: { row: 6, col: 0 },
  },
  {
    label: "兵",
    code: "g2",
    position: { row: 6, col: 2 },
  },
  {
    label: "兵",
    code: "g3",
    position: { row: 6, col: 4 },
  },
  {
    label: "兵",
    code: "g4",
    position: { row: 6, col: 6 },
  },
  {
    label: "兵",
    code: "g5",
    position: { row: 6, col: 8 },
  },
].map((item) => ({
  ...item,
  type: ChessType.HAN,
  status: ChessStatus.ALIVE,
  color: ChessColor.HAN,
}));
