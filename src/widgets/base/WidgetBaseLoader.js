import { memo } from "react";
import { MD3Colors, ProgressBar } from "react-native-paper";

const WidgetBaseLoader = memo(({ complete }) => {
  if (!complete) {
    return (
      <ProgressBar
        style={{ justifyContent: "center", alignItems: "center" }}
        indeterminate={true}
        color={MD3Colors.primary40}
      />
    );
  } else {
    return null;
  }
});

export default WidgetBaseLoader;
