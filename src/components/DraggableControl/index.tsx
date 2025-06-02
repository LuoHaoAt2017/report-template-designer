import React from "react";
import type { ReactNode } from "react";

const DraggableControl: React.FC<{
  type: string;
  icon?: ReactNode;
  children?: ReactNode;
}> = ({ children }) => {
  return <>{children}</>;
};

export default DraggableControl;
