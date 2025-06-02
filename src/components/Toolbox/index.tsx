import { controlRegistry } from "@/utils/controlRegistry";
import DraggableControl from "@/components/DraggableControl";

// 在工具箱中渲染可用控件
export const Toolbox = () => (
  <div className="toolbox">
    {Object.entries(controlRegistry).map(([type, { icon }]) => (
      <DraggableControl key={type} type={type} icon={icon}>
      </DraggableControl>
    ))}
  </div>
);
