import { FileTextOutlined, NumberOutlined, TableOutlined } from "@ant-design/icons";
import TextControl from "@/components/TextControl";
import NumberControl from "@/components/NumberControl";
import TableControl from "@/components/TableControl";

// 控件注册表
export const controlRegistry = {
  text: { component: TextControl, icon: <FileTextOutlined /> },
  number: { component: NumberControl, icon: <NumberOutlined /> },
  table: { component: TableControl, icon: <TableOutlined /> },
  // ...其他控件
};
