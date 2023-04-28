import { View } from "react-native";

const WidgetBaseCenter = ({ children, spaceHorizontal = 0 }) => {
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        marginHorizontal: spaceHorizontal,
        gap: 16,
      }}>
      {children}
    </View>
  );
};

export default WidgetBaseCenter;
