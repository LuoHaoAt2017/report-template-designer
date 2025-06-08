import { InputNumber } from "antd";
import { cloneDeep, isNil } from "lodash";
import {
  useCallback,
  useState,
  useRef,
  createContext,
  useContext,
  useEffect,
} from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "CARD";
const BoardContext = createContext({ rows: 3, cols: 3 });
const IconList = [
  "土拨鼠",
  "奶牛",
  "小熊",
  "小蓝鸟",
  "海豚",
  "猩猩",
  "草莓",
  "蜗牛",
];

interface CollectedProps {
  isDragging?: boolean;
  isOver?: boolean;
}

interface DragItem {
  id: string;
  url: string;
  pos: number;
}

interface DropItem {
  id: string;
}

export default function Home() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(
      IconList.map((name, index) => ({
        id: name,
        url: `${name}.svg`,
        pos: index,
      }))
    );
  }, []);

  const CardList = useCallback(() => {
    const handleMove = (item, pos) => {
      const cloneData = cloneDeep(dataSource);
      const origin = cloneData.find((elem) => elem.id === item.id);
      const target = cloneData.find((elem) => elem.pos === pos);
      if (isNil(target)) {
        // 放置的位置没有卡片，直接放置。
        origin.pos = pos;
      } else {
        // 放置的位置已有卡片，交换位置。
        const tempIndex = origin.pos;
        origin.pos = target.pos;
        target.pos = tempIndex;
      }
      setDataSource(cloneData);
    };

    return Array.from({ length: rows * cols }).map((_, index) => (
      <GridSquare key={index} index={index} onMove={handleMove}>
        <CardItem item={dataSource.find((item) => item.pos === index)} />
      </GridSquare>
    ));
  }, [rows, cols, dataSource]);

  const HeadList = useCallback(() => {
    return (
      <div className="hidden align-middle self-center gap-1 w-full">
        <InputNumber
          size="small"
          value={rows}
          onChange={(value) => setRows(value)}
          prefix={<span>Rows: </span>}
        />
        <InputNumber
          size="small"
          value={cols}
          onChange={(value) => setCols(value)}
          prefix={<span>Cols: </span>}
        />
      </div>
    );
  }, [rows, cols]);

  return (
    <>
      <HeadList />
      <BoardContext.Provider value={{ rows, cols }}>
        <GridLayout>
          <CardList />
        </GridLayout>
      </BoardContext.Provider>
    </>
  );
}

function CardItem({ item }) {
  const previewRef = useRef(null);
  const [collected, drag, dragPreview] = useDrag<
    DragItem,
    unknown,
    CollectedProps
  >(() => ({
    type: ItemType,
    item: item,
    collect(monitor) {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  }));

  useEffect(() => {
    dragPreview(previewRef, {
      offsetX: 10,
      offsetY: 10,
      captureDraggingState: true
    });
  }, [dragPreview]);

  if (isNil(item)) {
    return <></>;
  }
  return (
    <>
      <div
        ref={previewRef}
        style={{
          position: "fixed",
          top: -1000,
          left: -1000,
          width: "240px",
          height: "160px",
          backgroundImage: `url(${item.url})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          border: '2px solid #ccc',
          borderRadius: '8px',
        }}
      ></div>
      <div
        ref={drag}
        className="bg-slate-300 rounded overflow-hidden"
        style={{
          opacity: collected.isDragging ? 0.5 : 1.0,
        }}
      >
        <img src={item.url} className="object-contain" />
      </div>
    </>
  );
}

function GridSquare({ index, onMove, children }) {
  const [collected, drop] = useDrop<DropItem, unknown, CollectedProps>(
    () => ({
      accept: ItemType,
      drop: (item: DragItem) => {
        onMove(item, index);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [index]
  );
  return (
    <div
      ref={drop}
      className="bg-slate-300 rounded overflow-hidden"
      style={{
        opacity: collected.isOver ? 0.5 : 1.0
      }}
    >
      {children}
    </div>
  );
}

function GridLayout({ children }) {
  const { rows, cols } = useContext(BoardContext);

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="grid gap-2 h-full w-full"
        style={{
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
      >
        {children}
      </div>
    </DndProvider>
  );
}
