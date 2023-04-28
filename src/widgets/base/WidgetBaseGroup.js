import { memo } from "react";
import { View } from "react-native";

const WidgetBaseGroup = ({ children }) => {
  return <View style={{ gap: 16 }}>{children}</View>;
};

export default memo(WidgetBaseGroup);
