import { memo } from "react";
import { View } from "react-native";

const WidgetBaseGroup = memo(({ children, style = {} }) => {
  return <View style={[{ gap: 16 }, style]}>{children}</View>;
});

export default WidgetBaseGroup;
